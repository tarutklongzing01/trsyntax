import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

const APP_ID = 'tr-syntax-dl';
const MAX_BODY_BYTES = 16_384;

type LicenseAction = 'activate' | 'verify';

type ApiResult = {
  valid: boolean;
  ok: boolean;
  status: string;
  message: string;
  licenseType?: 'TRIAL' | 'FULL';
  user?: string;
  plan?: string;
  expires_at?: string;
  expiresAt?: string;
  days_remaining?: number | null;
};

function json(body: ApiResult | Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

function readServiceAccount() {
  const inline = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    const decoded = inline.startsWith('{')
      ? inline
      : Buffer.from(inline, 'base64').toString('utf8');
    const account = JSON.parse(decoded) as {
      project_id?: string;
      client_email?: string;
      private_key?: string;
    };
    if (!account.project_id || !account.client_email || !account.private_key) {
      throw new Error('Firebase service account is incomplete');
    }
    return {
      projectId: account.project_id,
      clientEmail: account.client_email,
      privateKey: account.private_key.replace(/\\n/g, '\n'),
    };
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin environment variables are missing');
  }
  return { projectId, clientEmail, privateKey };
}

function db() {
  if (!getApps().length) {
    const account = readServiceAccount();
    initializeApp({ credential: cert(account), projectId: account.projectId });
  }
  return getFirestore();
}

function asDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Timestamp) return value.toDate();
  if (value instanceof Date) return value;
  if (typeof value === 'object' && value !== null && 'toDate' in value) {
    const candidate = value as { toDate?: () => Date };
    if (typeof candidate.toDate === 'function') return candidate.toDate();
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

function failure(status: string, message: string, httpStatus: number, extra: Partial<ApiResult> = {}) {
  return { httpStatus, body: { valid: false, ok: false, status, message, ...extra } satisfies ApiResult };
}

function scalarString(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' ? String(value) : '';
}

function normalizeHwid(value: unknown) {
  return scalarString(value).trim().toUpperCase();
}

function normalizeKey(value: unknown) {
  return scalarString(value).trim().toUpperCase();
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ valid: false, ok: false, status: 'invalid_request', message: 'Request is too large' }, 413);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ valid: false, ok: false, status: 'invalid_request', message: 'Invalid JSON request' }, 400);
  }

  const requestedAction = (scalarString(payload.action) || 'verify').trim().toLowerCase();
  if (requestedAction === 'trial') {
    return json({
      valid: false,
      ok: false,
      status: 'license_key_required',
      message: 'Please enter a Trial Key issued by the administrator',
    }, 400);
  }
  if (requestedAction !== 'activate' && requestedAction !== 'verify') {
    return json({ valid: false, ok: false, status: 'invalid_action', message: 'Unsupported license action' }, 400);
  }

  const action = requestedAction as LicenseAction;
  const licenseKey = normalizeKey(payload.license_key ?? payload.licenseKey);
  const hwid = normalizeHwid(payload.hwid ?? payload.machineId);
  const appId = scalarString(payload.app_id ?? payload.appId).trim().toLowerCase();

  if (!licenseKey || licenseKey.length > 96 || !hwid || hwid.length > 160) {
    return json({ valid: false, ok: false, status: 'invalid_request', message: 'License Key and HWID are required' }, 400);
  }
  if (appId && appId !== APP_ID) {
    return json({ valid: false, ok: false, status: 'wrong_app', message: 'License is not valid for this app' }, 403);
  }

  try {
    const result = await db().runTransaction(async (transaction) => {
      const reference = db().collection('hwidLicenses').doc(licenseKey);
      const snapshot = await transaction.get(reference);
      if (!snapshot.exists) return failure('not_found', 'License key not found', 404);

      const data = snapshot.data() ?? {};
      const licenseType = data.licenseType === 'trial' ? 'TRIAL' : 'FULL';
      const documentAppId = String(data.programId || data.productId || '').trim().toLowerCase();
      const expiresAt = asDate(data.expiresAt ?? data.expiryDate);
      const expiryIso = expiresAt?.toISOString() ?? '';
      const daysRemaining = expiresAt
        ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / 86_400_000))
        : null;
      const extra: Partial<ApiResult> = {
        licenseType,
        expires_at: expiryIso,
        expiresAt: expiryIso,
        days_remaining: daysRemaining,
      };

      if (data.status === 'disabled' || data.active === false) {
        return failure('disabled', 'License is not active', 403, extra);
      }
      if (documentAppId && documentAppId !== APP_ID) {
        return failure('wrong_app', 'License is not valid for this app', 403, extra);
      }
      if (licenseType === 'TRIAL' && !expiresAt) {
        return failure('trial_invalid', 'Trial license is missing an expiry date', 403, extra);
      }
      if (expiresAt && expiresAt.getTime() <= Date.now()) {
        return failure(
          licenseType === 'TRIAL' ? 'trial_expired' : 'expired',
          licenseType === 'TRIAL' ? 'Trial has expired' : 'License has expired',
          403,
          extra,
        );
      }

      const boundHwid = normalizeHwid(data.hwid || data.machineId || data.deviceId);
      if (boundHwid && boundHwid !== hwid) {
        return failure('hwid_mismatch', 'This license is locked to another machine', 403, extra);
      }
      if (!boundHwid && action === 'verify') {
        return failure('not_activated', 'Activate this license on this machine first', 409, extra);
      }
      if (!boundHwid) {
        transaction.update(reference, {
          hwid,
          machineId: hwid,
          deviceId: hwid,
          activatedAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
      }

      return {
        httpStatus: 200,
        body: {
          valid: true,
          ok: true,
          status: licenseType === 'TRIAL' ? 'trial' : 'active',
          message: boundHwid
            ? licenseType === 'TRIAL' ? 'Trial is active' : 'License valid'
            : 'License activated on this machine',
          licenseType,
          user: String(data.customerName || data.email || ''),
          plan: String(data.programName || data.productName || 'TR-SYNTAX DL'),
          expires_at: expiryIso,
          expiresAt: expiryIso,
          days_remaining: daysRemaining,
        } satisfies ApiResult,
      };
    });

    return json(result.body, result.httpStatus);
  } catch (error) {
    console.error('License API error', error instanceof Error ? error.message : 'Unknown error');
    return json({
      valid: false,
      ok: false,
      status: 'server_error',
      message: 'License service is temporarily unavailable',
    }, 503);
  }
}

export function GET() {
  return json({ ok: true, service: 'TR-SYNTAX License API', status: 'ready' });
}

import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc, type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore';
import { getFirebase } from './client';

export type HwidLicenseStatus = 'active' | 'disabled';

export interface HwidLicense {
  id: string;
  licenseKey: string;
  customerName: string;
  email: string;
  programId: string;
  programName: string;
  hwid: string;
  status: HwidLicenseStatus;
  expiresAt: string;
  createdAt: Date | null;
}

export interface NewHwidLicense {
  licenseKey: string;
  customerName: string;
  email: string;
  programId: string;
  programName: string;
  expiresAt: string;
}

function requireFirebase() {
  const firebase = getFirebase();
  if (!firebase) throw new Error('ยังไม่ได้ตั้งค่า Firebase');
  return firebase;
}

function asDate(value: unknown): Date | null {
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate();
  if (typeof value === 'string' || typeof value === 'number') {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

function mapLicense(snapshot: QueryDocumentSnapshot<DocumentData>): HwidLicense {
  const data = snapshot.data();
  const active = data.status ? data.status === 'active' : data.active !== false;
  const expiry = asDate(data.expiresAt || data.expiryDate);
  return {
    id: snapshot.id,
    licenseKey: data.licenseKey || data.key || snapshot.id,
    customerName: data.customerName || data.customer || data.name || 'ไม่ระบุชื่อ',
    email: data.email || data.customerEmail || '',
    programId: data.programId || data.productId || '',
    programName: data.programName || data.productName || data.softwareName || 'ไม่ระบุโปรแกรม',
    hwid: data.hwid || data.machineId || data.deviceId || '',
    status: active ? 'active' : 'disabled',
    expiresAt: expiry ? expiry.toISOString() : '',
    createdAt: asDate(data.createdAt),
  };
}

export function subscribeHwidLicenses(onData: (licenses: HwidLicense[]) => void, onError: (error: Error) => void) {
  const { db } = requireFirebase();
  return onSnapshot(collection(db, 'hwidLicenses'), (snapshot) => {
    const licenses = snapshot.docs.map(mapLicense).sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    onData(licenses);
  }, onError);
}

export async function createHwidLicense(input: NewHwidLicense) {
  const { db } = requireFirebase();
  await setDoc(doc(db, 'hwidLicenses', input.licenseKey), {
    licenseKey: input.licenseKey, key: input.licenseKey,
    customerName: input.customerName, email: input.email, customerEmail: input.email,
    programId: input.programId, productId: input.programId,
    programName: input.programName, productName: input.programName,
    hwid: '', machineId: '', status: 'active', active: true,
    expiresAt: input.expiresAt ? new Date(`${input.expiresAt}T23:59:59`) : null,
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export async function setHwidLicenseStatus(id: string, status: HwidLicenseStatus) {
  const { db } = requireFirebase();
  await updateDoc(doc(db, 'hwidLicenses', id), { status, active: status === 'active', updatedAt: serverTimestamp() });
}

export async function resetHwidLicense(id: string) {
  const { db } = requireFirebase();
  await updateDoc(doc(db, 'hwidLicenses', id), { hwid: '', machineId: '', deviceId: '', activatedAt: null, updatedAt: serverTimestamp() });
}

export async function removeHwidLicense(id: string) {
  const { db } = requireFirebase();
  await deleteDoc(doc(db, 'hwidLicenses', id));
}

# TR-SYNTAX Software Store

Software Store + Showcase + Guide/Documentation สำหรับโปรแกรมของ TR-SYNTAX สร้างด้วย Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Lucide และเตรียม Firebase integration ไว้แล้ว

โปรเจกต์เปิดได้ทันทีด้วย Mock Data โดยไม่ต้องมี Firebase credentials

## เริ่มต้นใช้งาน

ต้องมี Node.js 20.9 ขึ้นไป จากนั้นรัน:

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

คำสั่งตรวจสอบ:

```bash
npm run lint
npm run typecheck
npm run build
```

## หน้าที่มีในรอบแรก

- `/` หน้าแรก, หมวดหมู่ และโปรแกรมแนะนำ
- `/software` รายการโปรแกรม พร้อมค้นหาและกรอง
- `/software/[slug]` รายละเอียด, Screenshot Lightbox, Requirement และ Changelog
- `/guides` ศูนย์รวมคู่มือ
- `/updates` Release notes
- `/login` และ `/register` UI สำหรับ Email/Password และ Google
- `/account` และ `/account/software` Profile, License และ My Software
- `/admin` Dashboard, Stats, Programs และ Activity

## ตั้งค่า Firebase

1. สร้าง Firebase project และเพิ่ม Web App
2. เปิด Authentication providers: Email/Password และ Google
3. สร้าง Firestore Database และ Storage bucket
4. คัดลอก `.env.example` เป็น `.env.local` แล้วใส่ค่าจาก Firebase Console
5. Deploy `firestore.rules` และ `storage.rules` ด้วย Firebase CLI

ตัวแปรที่ต้องตั้ง:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_SITE_URL`

Firebase Web config ไม่ใช่ secret แต่ห้ามใส่ Firebase Admin private key ใน Client Bundle หรือใช้ชื่อตัวแปรที่ขึ้นต้นด้วย `NEXT_PUBLIC_`

## Firestore Collections

- `users`: `displayName`, `email`, `photoURL`, `role`, `createdAt`
- `programs`: `name`, `slug`, `description`, `longDescription`, `categoryId`, `currentVersion`, `price`, `type`, `thumbnail`, `screenshots`, `platform`, `published`, `createdAt`, `updatedAt`
- `programVersions`: `programId`, `version`, `releaseDate`, `changelog`, `storagePath`, `fileSize`, `published`, `latest`
- `categories`: `name`, `slug`, `description`, `sortOrder`
- `guides`: `title`, `slug`, `category`, `thumbnail`, `content`, `views`, `published`, `createdAt`, `updatedAt`
- `licenses`: `userId`, `programId`, `licenseKey`, `status`, `purchasedAt`, `expiresAt`
- `downloads`: `userId`, `softwareId`, `version`, `downloadDate`
- `settings`: การตั้งค่าสาธารณะของร้าน

## สร้าง Admin

1. สร้างผู้ใช้ใน Firebase Authentication
2. สร้างเอกสาร `users/{uid}` โดยกำหนด `role: "admin"`
3. ฝั่ง backend ใช้ Firebase Admin SDK ตั้ง Custom Claim `admin: true` สำหรับ Storage Rules
4. บังคับให้ผู้ใช้ sign out/sign in ใหม่เพื่อรับ token ล่าสุด

Firestore rules ตรวจ `users/{uid}.role` ส่วน Storage rules ตรวจ Custom Claim เพื่อเลี่ยงการเปิดไฟล์จาก URL โดยตรง

## Paid Download Flow ที่แนะนำ

ไม่ควรคืน URL ของไฟล์ Paid จาก Storage ให้ client โดยตรง ให้สร้าง Vercel Function หรือ Firebase Cloud Function ที่:

1. ตรวจ Firebase ID token
2. ตรวจ `licenses` ว่าผู้ใช้มีสิทธิ์และ License ยัง active
3. หา `storagePath` จาก `programVersions`
4. สร้าง signed URL อายุสั้น
5. บันทึก `downloads` พร้อม `userId`, `softwareId`, `version`, `downloadDate`

โครงในรอบนี้ยังใช้ Mock Data เพื่อให้ดู UI ได้ทันที และจุดอ่านข้อมูลจริงเริ่มไว้ที่ `lib/firebase/`

## Deploy บน Vercel

1. Push โปรเจกต์ขึ้น GitHub
2. Import repository ใน Vercel
3. ตั้ง Environment Variables ตาม `.env.example`
4. Build command: `npm run build`
5. Deploy

โปรเจกต์ตั้ง `output: "export"` จึงสร้าง Static Export ในโฟลเดอร์ `out/` และนำขึ้น Vercel ได้ทันที เมื่อเพิ่ม API สำหรับ paid downloads ภายหลัง ให้เอา `output: "export"` ออกจาก `next.config.ts` เพื่อเปิดใช้ Vercel Functions

## หมายเหตุด้านความปลอดภัย

- Program และ Guide ที่ผู้ใช้ทั่วไปอ่านได้ต้องมี `published: true`
- การแก้ไขข้อมูลสงวนให้ Admin
- Paid files เก็บใต้ `paid-software/` และไม่อนุญาตให้ client อ่านตรง ๆ
- อย่า commit `.env.local`, service-account JSON หรือ private keys

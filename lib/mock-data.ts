import type { SoftwareProgram } from '@/types';

export const programs: SoftwareProgram[] = [
  {
    id: 'tr-syntax-dl', name: 'TR-SYNTAX DL', slug: 'tr-syntax-dl', version: 'v1.5.6', image: '/images/tr-syntax-dl/download.png',
    screenshots: [
      { src: '/images/tr-syntax-dl/download.png', alt: 'หน้าดาวน์โหลดวิดีโอและเพลงของ TR-SYNTAX DL', label: 'ดาวน์โหลดวิดีโอและเพลง' },
      { src: '/images/tr-syntax-dl/audio-separation.png', alt: 'หน้าแยกเสียงของ TR-SYNTAX DL', label: 'แยกเสียงออกจากเพลง' },
      { src: '/images/tr-syntax-dl/history.png', alt: 'หน้าประวัติการดาวน์โหลดของ TR-SYNTAX DL', label: 'ประวัติการดาวน์โหลด' },
    ],
    downloadUrl: 'https://drive.google.com/file/d/1YdxJsbGQ_Lq7jSEElg4agPvWKgAapjWr/view?usp=drive_link',
    description: 'ดาวน์โหลดวิดีโอและเพลงจาก YouTube เป็น MP3 / MP4',
    longDescription: 'โปรแกรมดาวน์โหลดวิดีโอและเพลงจาก YouTube ที่ใช้งานง่าย รองรับ MP3 และ MP4 พร้อมเลือกคุณภาพวิดีโอ คุณภาพเสียง และโฟลเดอร์ปลายทางได้ตามต้องการ',
    category: 'Downloader', platform: 'Windows 10 / 11', price: 0, type: 'FREE', status: 'UPDATED',
    fileSize: '24.8 MB', releaseDate: '8 ก.ย. 2026', updatedAt: '8 ก.ย. 2026', developer: 'TR-SYNTAX',
    features: ['ดาวน์โหลดวิดีโอ MP4', 'แยกเสียงเป็น MP3', 'เลือกคุณภาพวิดีโอและเสียง', 'ดูประวัติการดาวน์โหลดและรายการอัปเดต'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'เชื่อมต่ออินเทอร์เน็ต'],
    changelog: ['เพิ่มหน้ารวมประวัติการเปลี่ยนแปลงของแต่ละเวอร์ชัน', 'นำปุ่มเปิด UVR Online ออกจากหน้าแยกเสียง', 'ปรับการจัดวางหน้าแยกเสียงให้ใช้พื้นที่เต็มความกว้าง'], accent: '#ef4444',
  },
  {
    id: 'pdf-merger', name: 'PDF Merger', slug: 'pdf-merger', version: 'v1.0.0', image: '/images/pdf-merger.png',
    description: 'รวมไฟล์ PDF จากเครื่องและ URL ให้เป็นไฟล์เดียว',
    longDescription: 'เครื่องมือรวมไฟล์ PDF ที่ใช้งานง่าย รองรับการเพิ่มไฟล์จากเครื่องและวาง URL จัดลำดับเอกสาร ลบรายการ และรวมเป็น PDF เดียวได้ในไม่กี่ขั้นตอน',
    category: 'PDF Tools', platform: 'Windows 10 / 11', price: 0, type: 'FREE', status: 'NEW',
    fileSize: '18.6 MB', releaseDate: '5 ก.ย. 2026', updatedAt: '5 ก.ย. 2026', developer: 'TR-SYNTAX',
    features: ['เพิ่มไฟล์ PDF จากเครื่อง', 'เพิ่มไฟล์ผ่าน URL', 'จัดลำดับเอกสารก่อนรวม', 'ลบรายการที่เลือกหรือล้างทั้งหมด'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'เชื่อมต่ออินเทอร์เน็ตเมื่อใช้ URL'],
    changelog: ['เปิดตัว PDF Merger รุ่นแรก', 'รองรับไฟล์ PDF จาก URL', 'เพิ่มระบบจัดลำดับเอกสาร'], accent: '#ef233c',
  },
  {
    id: 'tr-yt-downloader', name: 'TR-YT Downloader', slug: 'tr-yt-downloader', version: 'v1.0.3',
    description: 'ดาวน์โหลด YouTube เป็น MP3 / MP4 คุณภาพสูง',
    longDescription: 'ตัวช่วยดาวน์โหลดสื่อสำหรับใช้งานส่วนตัว รองรับการเลือกคุณภาพและแปลงไฟล์ในหน้าต่างเดียว',
    category: 'Downloader', platform: 'Windows 10 / 11', price: 0, type: 'FREE', status: 'UPDATED',
    fileSize: '31.5 MB', releaseDate: '28 ส.ค. 2026', updatedAt: '28 ส.ค. 2026', developer: 'TR-SYNTAX',
    features: ['MP3 / MP4', 'เลือกคุณภาพวิดีโอ', 'รองรับ YouTube Shorts', 'ดาวน์โหลดหลายรายการ'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'อินเทอร์เน็ต'],
    changelog: ['รองรับ YouTube Shorts', 'เลือกคุณภาพวิดีโอ', 'แก้ปัญหาการดาวน์โหลด'], accent: '#dc2626',
  },
  {
    id: 'tr-audio-tools', name: 'TR Audio Tools', slug: 'tr-audio-tools', version: 'v1.1.0',
    description: 'เครื่องมือสำหรับงานเสียง Normalize / Convert / Tag',
    longDescription: 'ชุดเครื่องมือจัดการไฟล์เสียงที่รวมงานประจำไว้ในแอปเดียว ตั้งแต่ปรับระดับเสียง แปลงไฟล์ ไปจนถึงจัดการ Metadata',
    category: 'Music Tools', platform: 'Windows 10 / 11', price: 590, type: 'PAID', status: 'PAID',
    fileSize: '38.2 MB', releaseDate: '11 ส.ค. 2026', updatedAt: '11 ส.ค. 2026', developer: 'TR-SYNTAX',
    features: ['Batch Normalize', 'แปลงไฟล์ยอดนิยม', 'Tag Editor', 'Loudness Meter'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'พื้นที่ว่าง 150 MB'],
    changelog: ['เพิ่ม Batch Normalize', 'รองรับ FLAC', 'ปรับ Tag Editor'], accent: '#e11d48',
  },
];

export const visibleProgramSlugs = new Set(['tr-syntax-dl', 'pdf-merger']);
export const visiblePrograms = programs.filter((program) => visibleProgramSlugs.has(program.slug));

export const categories = [
  ['File Tools', 'จัดระเบียบและจัดการไฟล์'], ['PDF Tools', 'รวมและจัดการเอกสาร PDF'],
  ['Downloader', 'ดาวน์โหลดสื่อออนไลน์'], ['Music Tools', 'โปรแกรมเกี่ยวกับเสียง / Mastering'],
  ['Utilities', 'เครื่องมือทั่วไป'], ['All Programs', 'ดูโปรแกรมทั้งหมด'],
] as const;

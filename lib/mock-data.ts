import type { SoftwareProgram } from '@/types';

export const programs: SoftwareProgram[] = [
  {
    id: 'hondaflash', name: 'HondaFlash', slug: 'hondaflash', version: 'v1.2.0',
    description: 'อ่าน / เขียนกล่อง Honda ผ่าน K-Line',
    longDescription: 'เครื่องมือสื่อสารกับ ECU Honda สำหรับช่างและนักจูน รองรับการตรวจจับกล่อง อ่าน และเขียนข้อมูลผ่าน K-Line พร้อมระบบตรวจสอบความถูกต้องก่อนทำงาน',
    category: 'ECU Tools', platform: 'Windows 10 / 11', price: 0, type: 'FREE', status: 'UPDATED',
    fileSize: '24.8 MB', releaseDate: '18 ส.ค. 2026', updatedAt: '18 ส.ค. 2026', developer: 'TR-SYNTAX',
    features: ['ECU Detection อัตโนมัติ', 'อ่านและเขียนผ่าน K-Line', 'ตรวจสอบไฟล์ก่อนเขียน', 'บันทึก Log ทุกขั้นตอน'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'USB K-Line Adapter'],
    changelog: ['เพิ่ม ECU Detection', 'ปรับปรุง K-Line Communication', 'แก้ Bug การเชื่อมต่อ', 'ปรับ UI'], accent: '#ef4444',
  },
  {
    id: 'tr-ecu-editor', name: 'TR ECU Editor', slug: 'tr-ecu-editor', version: 'v0.9.1',
    description: 'แก้ไข Map คำนวณค่า และแสดงกราฟ ECU',
    longDescription: 'พื้นที่ทำงานสำหรับวิเคราะห์และแก้ไขแผนที่ ECU พร้อมตาราง กราฟ และเครื่องมือคำนวณที่ช่วยลดขั้นตอนงานจูนซ้ำ ๆ',
    category: 'Tuning Tools', platform: 'Windows 10 / 11', price: 890, type: 'PAID', status: 'NEW',
    fileSize: '42.1 MB', releaseDate: '2 ก.ย. 2026', updatedAt: '2 ก.ย. 2026', developer: 'TR-SYNTAX',
    features: ['2D / 3D Map View', 'Checksum Calculator', 'Compare Files', 'Preset Manager'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 8 GB ขึ้นไป', 'พื้นที่ว่าง 200 MB'],
    changelog: ['เพิ่ม 3D Map View', 'เพิ่มระบบ Compare', 'ปรับปรุงความเร็วการเปิดไฟล์'], accent: '#f97316',
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

export const categories = [
  ['ECU Tools', 'จูน / แก้ไข / ปลดล็อก'], ['Tuning Tools', 'ช่วยจูน วิเคราะห์ข้อมูล'],
  ['Downloader', 'ดาวน์โหลดสื่อออนไลน์'], ['Music Tools', 'โปรแกรมเกี่ยวกับเสียง / Mastering'],
  ['Utilities', 'เครื่องมือทั่วไป'], ['All Programs', 'ดูโปรแกรมทั้งหมด'],
] as const;

import type { SoftwareProgram } from '@/types';

export const programs: SoftwareProgram[] = [
  {
    id: 'tr-syntax-dl', name: 'TR-SYNTAX DL', slug: 'tr-syntax-dl', version: 'v1.4.0',
    description: 'ดาวน์โหลดวิดีโอและเพลงจาก YouTube เป็น MP3 / MP4',
    longDescription: 'โปรแกรมดาวน์โหลดวิดีโอและเพลงจาก YouTube ที่ใช้งานง่าย รองรับ MP3 และ MP4 พร้อมเลือกคุณภาพวิดีโอ คุณภาพเสียง และโฟลเดอร์ปลายทางได้ตามต้องการ',
    category: 'Downloader', platform: 'Windows 10 / 11', price: 0, type: 'FREE', status: 'UPDATED',
    fileSize: '24.8 MB', releaseDate: '18 ส.ค. 2026', updatedAt: '18 ส.ค. 2026', developer: 'TR-SYNTAX',
    features: ['ดาวน์โหลดวิดีโอ MP4', 'แยกเสียงเป็น MP3', 'เลือกคุณภาพวิดีโอและเสียง', 'ดูประวัติการดาวน์โหลด'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 4 GB ขึ้นไป', 'เชื่อมต่ออินเทอร์เน็ต'],
    changelog: ['ปรับระบบดึงข้อมูลวิดีโอ', 'เพิ่มตัวเลือกคุณภาพเสียง', 'ปรับปรุงความเสถียร', 'ปรับ UI'], accent: '#ef4444',
  },
  {
    id: 'tr-image-tools', name: 'TR Image Tools', slug: 'tr-image-tools', version: 'v0.9.1',
    description: 'ย่อขนาด แปลงไฟล์ และใส่ลายน้ำให้รูปภาพ',
    longDescription: 'พื้นที่ทำงานสำหรับจัดการรูปภาพหลายไฟล์พร้อมกัน รองรับการย่อขนาด แปลงรูปแบบ ปรับคุณภาพ และใส่ลายน้ำโดยไม่ต้องเปิดแก้ทีละรูป',
    category: 'Productivity', platform: 'Windows 10 / 11', price: 890, type: 'PAID', status: 'NEW',
    fileSize: '42.1 MB', releaseDate: '2 ก.ย. 2026', updatedAt: '2 ก.ย. 2026', developer: 'TR-SYNTAX',
    features: ['Batch Resize', 'แปลง JPG / PNG / WebP', 'ใส่ลายน้ำอัตโนมัติ', 'บันทึก Preset'],
    requirements: ['Windows 10 / 11 (64-bit)', 'RAM 8 GB ขึ้นไป', 'พื้นที่ว่าง 200 MB'],
    changelog: ['เพิ่ม WebP', 'เพิ่มระบบ Watermark', 'ปรับปรุงความเร็วการประมวลผล'], accent: '#f97316',
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
  ['File Tools', 'จัดระเบียบและจัดการไฟล์'], ['Productivity', 'ช่วยให้งานประจำวันเร็วขึ้น'],
  ['Downloader', 'ดาวน์โหลดสื่อออนไลน์'], ['Music Tools', 'โปรแกรมเกี่ยวกับเสียง / Mastering'],
  ['Utilities', 'เครื่องมือทั่วไป'], ['All Programs', 'ดูโปรแกรมทั้งหมด'],
] as const;

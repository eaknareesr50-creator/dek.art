import type { Faq } from '../types';

export const faqs: Faq[] = [
  {
    id: 'what-is-hub',
    category: 'general',
    question: 'Creative Art Hub คืออะไร',
    answer:
      'เป็นพื้นที่สำหรับเรียนรู้การใช้โปรแกรมสายอาร์ต 5 ตัว ได้แก่ Photoshop, Illustrator, After Effects, Premiere Pro และ Procreate ผ่านบทเรียนทีละขั้นตอน พร้อมบริการขอคำปรึกษาเมื่อติดปัญหา',
  },
  {
    id: 'free',
    category: 'general',
    question: 'บทเรียนบนเว็บไซต์ใช้งานฟรีหรือไม่',
    answer: 'ทุกบทเรียนบนเว็บไซต์เปิดอ่านได้ฟรีโดยไม่ต้องสมัครสมาชิก ความคืบหน้าและบทเรียนที่บันทึกไว้จะถูกเก็บในเบราว์เซอร์ของคุณ',
  },
  {
    id: 'start-where',
    category: 'learning',
    question: 'ควรเริ่มเรียนจากโปรแกรมไหนก่อน',
    answer:
      'ถ้าสนใจงานภาพถ่ายและกราฟิกให้เริ่มจาก Photoshop ถ้าอยากทำโลโก้เริ่มจาก Illustrator ถ้าสนใจวิดีโอเริ่มจาก Premiere Pro แล้วต่อด้วย After Effects และถ้ามี iPad อยากวาดภาพประกอบให้เริ่มที่ Procreate',
  },
  {
    id: 'levels',
    category: 'learning',
    question: 'ระดับ เริ่มต้น / ปานกลาง / ขั้นสูง ต่างกันอย่างไร',
    answer:
      'เริ่มต้นคือไม่ต้องมีพื้นฐานมาก่อน ปานกลางคือเคยใช้เครื่องมือหลักแล้วและอยากต่อยอดเทคนิค ขั้นสูงคือเทคนิคเฉพาะทางที่ต้องใช้ความละเอียดหรือมีแนวคิดหลายขั้นตอน',
  },
  {
    id: 'progress',
    category: 'learning',
    question: 'ความคืบหน้าและบทเรียนที่บันทึกไว้ถูกเก็บที่ไหน',
    answer: 'เก็บไว้ใน localStorage ของเบราว์เซอร์ที่คุณใช้ หากล้างข้อมูลเบราว์เซอร์หรือเปลี่ยนเครื่องข้อมูลจะไม่ติดตามไปด้วย',
  },
  {
    id: 'consult-how',
    category: 'consult',
    question: 'ขอคำปรึกษาได้อย่างไร',
    answer: 'ไปที่หน้า ปรึกษา กรอกชื่อ อีเมล โปรแกรมที่ใช้ และอธิบายปัญหาของคุณ แล้วกดส่ง ทีมงานจะติดต่อกลับทางอีเมล',
  },
  {
    id: 'consult-prepare',
    category: 'consult',
    question: 'ควรเตรียมอะไรก่อนส่งคำขอปรึกษา',
    answer: 'บอกเวอร์ชันโปรแกรม ระบบปฏิบัติการ สิ่งที่พยายามทำ และสิ่งที่เกิดขึ้นจริง หากมีข้อความแจ้ง Error ให้ใส่ไปด้วย จะช่วยให้ตอบได้เร็วขึ้น',
  },
  {
    id: 'consult-types',
    category: 'consult',
    question: 'ปรึกษาเรื่องอะไรได้บ้าง',
    answer: 'ปรึกษาเรื่องเทคนิคการใช้โปรแกรม การวางแผนเรียน เวิร์กโฟลว์ รีวิวผลงาน และการเลือกอุปกรณ์หรือโปรแกรมให้เหมาะกับงาน',
  },
  {
    id: 'sw-ps',
    category: 'software',
    program: 'photoshop',
    question: 'Photoshop ช้าและกระตุก ควรทำอย่างไร',
    answer:
      'ลองเพิ่มหน่วยความจำที่ Preferences > Performance, เปิดใช้ GPU, ลดจำนวน History States และ Merge เลเยอร์ที่ไม่ต้องแก้ไขแล้ว การเคลียร์ Scratch Disk ก็ช่วยได้',
  },
  {
    id: 'sw-ai',
    category: 'software',
    program: 'illustrator',
    question: 'ส่งไฟล์ Illustrator ให้โรงพิมพ์ต้องเตรียมอย่างไร',
    answer:
      'แปลงฟอนต์เป็น Outline (Type > Create Outlines) ตั้งโหมดสีเป็น CMYK ใส่ Bleed ตามที่โรงพิมพ์กำหนด และบันทึกเป็น PDF ตามมาตรฐานของโรงพิมพ์',
  },
  {
    id: 'sw-ae',
    category: 'software',
    program: 'after-effects',
    question: 'After Effects ต้องใช้คอมพิวเตอร์สเปคระดับไหน',
    answer:
      'ควรมี RAM อย่างน้อย 16 GB และการ์ดจอที่รองรับ แนะนำ 32 GB ขึ้นไปถ้าทำงานหนัก ใช้ SSD สำหรับ Cache เพื่อให้พรีวิวลื่นขึ้น และเปิด Proxy เมื่อไฟล์ใหญ่',
  },
  {
    id: 'sw-pr',
    category: 'software',
    program: 'premiere-pro',
    question: 'ไฟล์วิดีโอหนักจนตัดต่อสะดุด แก้อย่างไร',
    answer: 'ใช้ Proxy Workflow โดยคลิกขวาที่คลิกแล้วเลือก Proxy > Create Proxies จะตัดต่อด้วยไฟล์เบา แล้ว Export ด้วยไฟล์ต้นฉบับ',
  },
  {
    id: 'sw-pc',
    category: 'software',
    program: 'procreate',
    question: 'Procreate ใช้ได้กับอุปกรณ์อะไรบ้าง',
    answer: 'Procreate ใช้งานบน iPad ที่รองรับ Apple Pencil ได้ดีที่สุด ส่วนบนไอโฟนมีเวอร์ชัน Procreate Pocket แยกต่างหาก ตรวจสอบรุ่นที่รองรับใน App Store',
  },
];

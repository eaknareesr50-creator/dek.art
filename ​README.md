# Creative Art Hub

เว็บไซต์เรียนรู้และขอคำปรึกษาโปรแกรมสายอาร์ต (Photoshop, Illustrator, After Effects, Premiere Pro, Procreate)
สร้างด้วย Vite + React + TypeScript + React Router

## รันในเครื่อง
    npm install
    npm run dev        # http://localhost:5173
    npm run typecheck  # ตรวจ TypeScript
    npm run build      # build production -> dist/
    npm run preview    # ทดลองเปิดไฟล์ build

> ตอนรัน `npm run dev` ไม่มี /api (เป็นของ Vercel) ฟอร์มจะบันทึกลง localStorage แบบโหมดสาธิต
> ถ้าต้องการทดสอบ API จริงในเครื่อง ให้ใช้ `npx vercel dev`

## Deploy บน Vercel
Import repo -> Framework: Vite (ตรวจเจออัตโนมัติ) -> Deploy
ตั้ง Environment Variable `CONTACT_WEBHOOK_URL` (ไม่บังคับ) เพื่อส่งข้อมูลฟอร์มไปยัง Slack/Discord/Zapier/Make

## แก้ไขเนื้อหา
- โปรแกรม: src/data/programs.ts
- บทเรียน: src/data/tutorials.ts
- FAQ: src/data/faqs.ts

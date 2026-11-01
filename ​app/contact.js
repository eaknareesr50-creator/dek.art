const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max) {
  return String(value ?? '').trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  // Honeypot: บอทมักกรอกช่องที่ซ่อนไว้ -> ตอบสำเร็จแต่ไม่ทำอะไร
  if (clean(body.website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const type = body.type === 'newsletter' ? 'newsletter' : 'consult';
  const email = clean(body.email, 200);

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'รูปแบบอีเมลไม่ถูกต้อง' });
  }

  const record = {
    type,
    email,
    name: clean(body.name, 120),
    program: clean(body.program, 60),
    level: clean(body.level, 40),
    message: clean(body.message, 3000),
    receivedAt: new Date().toISOString(),
  };

  if (type === 'consult' && (!record.name || record.message.length < 10)) {
    return res.status(400).json({ error: 'กรุณากรอกชื่อและรายละเอียดอย่างน้อย 10 ตัวอักษร' });
  }

  // ดูข้อมูลได้ที่ Vercel Dashboard > Logs
  console.log('[creative-art-hub] submission', JSON.stringify(record));

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // "text" รองรับ Slack; ช่องอื่นเก็บข้อมูลครบสำหรับ Zapier/Make/n8n
          text: `[${type}] ${record.name || '-'} <${record.email}> ${record.program} ${record.level}\n${record.message}`,
          ...record,
        }),
      });
      if (!response.ok) {
        return res.status(502).json({ error: 'ส่งข้อมูลต่อไปยังระบบปลายทางไม่สำเร็จ' });
      }
    } catch {
      return res.status(502).json({ error: 'เชื่อมต่อระบบปลายทางไม่ได้' });
    }
  }

  return res.status(200).json({ ok: true });
}

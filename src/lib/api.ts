export type SubmitResult =
  | { ok: true; mode: 'server' | 'local' }
  | { ok: false; error: string };

const LOCAL_KEY = 'cah:submissions';

function saveLocal(entry: Record<string, string>) {
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    const list = raw ? (JSON.parse(raw) as unknown[]) : [];
    list.push({ ...entry, savedAt: new Date().toISOString() });
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(list));
  } catch {
    /* ignore storage errors */
  }
}

/**
 * ส่งข้อมูลฟอร์มไปที่ /api/contact (Vercel Serverless Function)
 * ถ้าไม่มี API (เช่น รัน npm run dev) จะเก็บลง localStorage เป็นโหมดสาธิต
 */
export async function submitForm(
  type: 'consult' | 'newsletter',
  payload: Record<string, string>,
): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, ...payload }),
    });

    if (response.ok) {
      return { ok: true, mode: 'server' };
    }

    if (response.status === 404 || response.status === 405) {
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      saveLocal({ type, ...payload });
      return { ok: true, mode: 'local' };
    }

    let message = 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
    try {
      const data = (await response.json()) as { error?: string };
      if (data.error) message = data.error;
    } catch {
      /* response ไม่ใช่ JSON */
    }
    return { ok: false, error: message };
  } catch {
    return { ok: false, error: 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่' };
  }
}

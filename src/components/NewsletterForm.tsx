import { useState } from 'react';
import type { FormEvent } from 'react';
import { useToast } from '../context/ToastContext';
import { submitForm } from '../lib/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const toast = useToast();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      setMessage('กรุณากรอกอีเมลให้ถูกต้อง');
      return;
    }
    setStatus('loading');
    setMessage('');
    const result = await submitForm('newsletter', { email: email.trim() });
    if (result.ok) {
      setStatus('success');
      setMessage('ขอบคุณที่สมัครรับข่าวสาร!');
      setEmail('');
      toast('success', 'สมัครรับข่าวสารเรียบร้อยแล้ว');
    } else {
      setStatus('error');
      setMessage(result.error);
    }
  };

  return (
    <form className="newsletter" onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        อีเมล
      </label>
      <div className="newsletter-row">
        <input
          id="newsletter-email"
          type="email"
          className="input"
          placeholder="อีเมลของคุณ"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          disabled={status === 'loading'}
        />
        <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
          {status === 'loading' ? 'กำลังส่ง...' : 'สมัคร'}
        </button>
      </div>
      {message && (
        <p className={status === 'success' ? 'form-note ok' : 'form-note bad'} role="status">
          {message}
        </p>
      )}
    </form>
  );
}

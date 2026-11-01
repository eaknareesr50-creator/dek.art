import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import { useToast } from '../context/ToastContext';
import { LEVELS, LEVEL_LABEL } from '../data/meta';
import { isProgramSlug, programs } from '../data/programs';
import { submitForm } from '../lib/api';
import { usePageTitle } from '../lib/usePageTitle';
import type { Level } from '../types';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface FormValues {
  name: string;
  email: string;
  program: string;
  level: Level;
  message: string;
  agree: boolean;
  website: string; // honeypot
}

type Errors = Partial<Record<'name' | 'email' | 'program' | 'message' | 'agree', string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
  if (!values.program) errors.program = 'กรุณาเลือกโปรแกรม';
  if (values.message.trim().length < 10) errors.message = 'กรุณาอธิบายปัญหาอย่างน้อย 10 ตัวอักษร';
  if (!values.agree) errors.agree = 'กรุณายอมรับเงื่อนไขก่อนส่ง';
  return errors;
}

const services = [
  { title: 'แก้ปัญหาการใช้งาน', text: 'ติดปัญหาเครื่องมือ เอฟเฟกต์ หรือเวิร์กโฟลว์ เราช่วยหาทางออกให้' },
  { title: 'รีวิวผลงาน', text: 'ส่งผลงานมาให้ดู เพื่อรับคำแนะนำเรื่ององค์ประกอบ สี และเทคนิค' },
  { title: 'วางแผนการเรียน', text: 'ช่วยเลือกโปรแกรมและเส้นทางเรียนที่เหมาะกับเป้าหมายของคุณ' },
];

export default function Consult() {
  usePageTitle('ขอคำปรึกษา');
  const [params] = useSearchParams();
  const toast = useToast();

  const programParam = params.get('program');
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    program: isProgramSlug(programParam) ? programParam : '',
    level: 'beginner',
    message: params.get('topic') ?? '',
    agree: false,
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState('');
  const [mode, setMode] = useState<'server' | 'local'>('server');

  const set = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const send = async () => {
    setStatus('loading');
    setServerError('');
    const result = await submitForm('consult', {
      name: values.name.trim(),
      email: values.email.trim(),
      program: values.program,
      level: values.level,
      message: values.message.trim(),
      website: values.website,
    });
    if (result.ok) {
      setMode(result.mode);
      setStatus('success');
      toast('success', 'ส่งคำขอปรึกษาเรียบร้อยแล้ว');
    } else {
      setServerError(result.error);
      setStatus('error');
      toast('error', 'ส่งข้อมูลไม่สำเร็จ');
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      return;
    }
    void send();
  };

  const reset = () => {
    setValues({ name: '', email: '', program: '', level: 'beginner', message: '', agree: false, website: '' });
    setErrors({});
    setStatus('idle');
  };

  const loading = status === 'loading';

  return (
    <div className="container page">
      <header className="page-head">
        <h1>ขอคำปรึกษา</h1>
        <p>เล่าปัญหาหรือสิ่งที่อยากทำให้เราฟัง แล้วเราจะติดต่อกลับทางอีเมล</p>
      </header>

      <div className="consult-layout">
        <div className="form-card">
          {status === 'success' ? (
            <div className="success-panel" role="status">
              <span className="success-icon">
                <Icon name="check" size={32} />
              </span>
              <h2>ส่งคำขอเรียบร้อยแล้ว!</h2>
              <p>ขอบคุณ {values.name || 'คุณ'} เราจะติดต่อกลับที่ {values.email || 'อีเมลของคุณ'}</p>
              {mode === 'local' && (
                <p className="form-note bad">
                  โหมดสาธิต: ไม่พบ API ฝั่งเซิร์ฟเวอร์ ข้อมูลถูกบันทึกในเบราว์เซอร์เท่านั้น (จะส่งจริงเมื่อ Deploy บน Vercel)
                </p>
              )}
              <div className="hero-actions center-actions">
                <button type="button" className="btn btn-primary" onClick={reset}>
                  ส่งคำขออีกครั้ง
                </button>
                <Link to="/tutorials" className="btn btn-ghost">
                  ดูบทเรียน
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-busy={loading}>
              {status === 'error' && (
                <div className="alert alert-error" role="alert">
                  <strong>เกิดข้อผิดพลาด:</strong> {serverError}
                </div>
              )}

              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">ชื่อ</label>
                  <input
                    id="name"
                    className={`input${errors.name ? ' invalid' : ''}`}
                    value={values.name}
                    onChange={(e) => set('name', e.target.value)}
                    autoComplete="name"
                    disabled={loading}
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">อีเมล</label>
                  <input
                    id="email"
                    type="email"
                    className={`input${errors.email ? ' invalid' : ''}`}
                    value={values.email}
                    onChange={(e) => set('email', e.target.value)}
                    autoComplete="email"
                    disabled={loading}
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label htmlFor="program">โปรแกรม</label>
                  <select
                    id="program"
                    className={`select${errors.program ? ' invalid' : ''}`}
                    value={values.program}
                    onChange={(e) => set('program', e.target.value)}
                    disabled={loading}
                    aria-invalid={Boolean(errors.program)}
                  >
                    <option value="">เลือกโปรแกรม</option>
                    {programs.map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  {errors.program && <span className="field-error">{errors.program}</span>}
                </div>
                <div className="field">
                  <label htmlFor="level">ระดับประสบการณ์</label>
                  <select
                    id="level"
                    className="select"
                    value={values.level}
                    onChange={(e) => set('level', e.target.value as Level)}
                    disabled={loading}
                  >
                    {LEVELS.map((l) => (
                      <option key={l} value={l}>
                        {LEVEL_LABEL[l]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">รายละเอียดที่ต้องการปรึกษา</label>
                <textarea
                  id="message"
                  rows={6}
                  className={`input${errors.message ? ' invalid' : ''}`}
                  value={values.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="เช่น ใช้ Photoshop เวอร์ชันอะไร กำลังทำอะไรอยู่ และเกิดปัญหาอย่างไร"
                  disabled={loading}
                  aria-invalid={Boolean(errors.message)}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              {/* Honeypot: ซ่อนจากผู้ใช้ทั่วไป */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">เว็บไซต์</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(e) => set('website', e.target.value)}
                />
              </div>

              <div className="field">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={values.agree}
                    onChange={(e) => set('agree', e.target.checked)}
                    disabled={loading}
                  />
                  <span>ฉันยินยอมให้ติดต่อกลับทางอีเมลเพื่อการให้คำปรึกษา</span>
                </label>
                {errors.agree && <span className="field-error">{errors.agree}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner small" aria-hidden="true" /> กำลังส่ง...
                  </>
                ) : status === 'error' ? (
                  'ลองส่งอีกครั้ง'
                ) : (
                  'ส่งคำขอปรึกษา'
                )}
              </button>
            </form>
          )}
        </div>

        <aside className="consult-side">
          {services.map((s) => (
            <div key={s.title} className="info-card">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
          <div className="info-card accent">
            <h3>ลองดูคำตอบด่วนก่อน</h3>
            <p>คำถามทั่วไปอาจมีคำตอบอยู่แล้ว</p>
            <Link to="/faq" className="btn btn-ghost btn-block">
              ไปที่ FAQ
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle';

export default function NotFound({ message = 'ไม่พบหน้าที่คุณต้องการ' }: { message?: string }) {
  usePageTitle('ไม่พบหน้า');
  return (
    <div className="container empty page">
      <p className="big-404">404</p>
      <h1>{message}</h1>
      <p>ลิงก์อาจผิดหรือหน้านี้ถูกย้ายไปแล้ว</p>
      <div className="hero-actions center-actions">
        <Link to="/" className="btn btn-primary">
          กลับหน้าแรก
        </Link>
        <Link to="/tutorials" className="btn btn-ghost">
          ดูบทเรียนทั้งหมด
        </Link>
      </div>
    </div>
  );
}

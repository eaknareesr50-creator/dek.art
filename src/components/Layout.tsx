import { Suspense, useCallback, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Icon from './Icon';
import NewsletterForm from './NewsletterForm';
import SearchDialog from './SearchDialog';
import Spinner from './Spinner';
import { programs } from '../data/programs';

const navLinks = [
  { to: '/', label: 'หน้าแรก', end: true },
  { to: '/programs', label: 'โปรแกรม', end: false },
  { to: '/tutorials', label: 'บทเรียน', end: false },
  { to: '/consult', label: 'ปรึกษา', end: false },
  { to: '/faq', label: 'คำถามที่พบบ่อย', end: false },
];

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Creative Art Hub หน้าแรก">
      <span className="brand-mark" aria-hidden="true">
        <Icon name="sparkle" size={18} />
      </span>
      <span>
        Creative<b>Art</b>Hub
      </span>
    </Link>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
     <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="เมนูหลัก">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="ค้นหา"
          >
            <Icon name="search" />
          </button>
          <Link to="/consult" className="btn btn-primary btn-sm hide-mobile">
            ขอคำปรึกษา
          </Link>
          <button
            type="button"
            className="icon-btn menu-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="เมนูมือถือ">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/consult" className="btn btn-primary btn-block">
            ขอคำปรึกษา
          </Link>
        </nav>
      )}
      <SearchDialog open={searchOpen} onClose={closeSearch} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Brand />
          <p className="footer-about">
            พื้นที่เรียนรู้และขอคำปรึกษาสำหรับคนทำงานสร้างสรรค์ ตั้งแต่ภาพ กราฟิก โมชั่น วิดีโอ ไปจนถึงงานวาด
          </p>
        </div>
        <div>
          <h4>โปรแกรม</h4>
          <ul>
            {programs.map((p) => (
              <li key={p.slug}>
                <Link to={`/programs/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>เมนู</h4>
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>รับข่าวสารบทเรียนใหม่</h4>
          <NewsletterForm />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Creative Art Hub</span>
        <span className="disclaimer">
          ชื่อโปรแกรมเป็นเครื่องหมายการค้าของเจ้าของที่เกี่ยวข้อง เว็บไซต์นี้ไม่ได้เกี่ยวข้องกับ Adobe หรือ Procreate
        </span>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="skip-link">
        ข้ามไปยังเนื้อหา
      </a>
      <Header />
      <main id="main">
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<Spinner label="กำลังโหลดหน้า..." />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}

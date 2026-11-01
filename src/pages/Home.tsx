import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Icon from '../components/Icon';
import ProgramBadge, { programStyle } from '../components/ProgramBadge';
import ProgramCard from '../components/ProgramCard';
import TutorialCard from '../components/TutorialCard';
import { faqs } from '../data/faqs';
import { programs } from '../data/programs';
import { tutorials } from '../data/tutorials';
import { usePageTitle } from '../lib/usePageTitle';

const popularTopics = ['ลบพื้นหลัง', 'Pen Tool', 'Keyframe', 'Lumetri', 'แปรง'];

export default function Home() {
  usePageTitle('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    navigate(q ? `/tutorials?q=${encodeURIComponent(q)}` : '/tutorials');
  };

  const featured = programs
    .map((p) => tutorials.find((t) => t.program === p.slug))
    .filter((t): t is (typeof tutorials)[number] => Boolean(t));

  return (
    <>
      <section className="hero">
        <span className="hero-blob b1" aria-hidden="true" />
        <span className="hero-blob b2" aria-hidden="true" />
        <span className="hero-blob b3" aria-hidden="true" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <Icon name="sparkle" size={16} /> เรียนรู้ · ลงมือทำ · ขอคำปรึกษา
            </span>
            <h1>
              ปลดล็อกพลัง<span className="grad-text">ความคิดสร้างสรรค์</span>ของคุณ
            </h1>
            <p className="lead">
              บทเรียนทีละขั้นตอนสำหรับ Photoshop, Illustrator, After Effects, Premiere Pro และ Procreate
              พร้อมบริการให้คำปรึกษาเมื่อคุณติดปัญหา
            </p>
            <form className="hero-search" onSubmit={onSearch} role="search">
              <Icon name="search" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="อยากเรียนอะไรวันนี้? เช่น ลบพื้นหลัง"
                aria-label="ค้นหาบทเรียน"
              />
              <button type="submit" className="btn btn-primary">
                ค้นหา
              </button>
            </form>
            <div className="hero-chips">
              <span>ยอดนิยม:</span>
              {popularTopics.map((topic) => (
                <Link key={topic} to={`/tutorials?q=${encodeURIComponent(topic)}`} className="chip">
                  {topic}
                </Link>
              ))}
            </div>
            <div className="stats">
              <div>
                <strong>{programs.length}</strong>
                <span>โปรแกรม</span>
              </div>
              <div>
                <strong>{tutorials.length}</strong>
                <span>บทเรียน</span>
              </div>
              <div>
                <strong>1:1</strong>
                <span>ให้คำปรึกษา</span>
              </div>
            </div>
          </div>

          <div className="art-tiles" aria-label="เลือกโปรแกรม">
            {programs.map((p) => (
              <Link
                key={p.slug}
                to={`/programs/${p.slug}`}
                className="art-tile"
                style={programStyle(p)}
                aria-label={p.name}
              >
                <ProgramBadge program={p} size="lg" />
                <span>{p.name.replace('Adobe ', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>เลือกโปรแกรมที่คุณสนใจ</h2>
            <Link to="/programs" className="link-arrow">
              ดูทั้งหมด <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="grid grid-programs">
            {programs.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>บทเรียนแนะนำ</h2>
            <Link to="/tutorials" className="link-arrow">
              บทเรียนทั้งหมด <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="grid grid-3">
            {featured.map((t) => (
              <TutorialCard key={t.id} tutorial={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <h2>เรียนอย่างไรกับ Creative Art Hub</h2>
          </div>
          <div className="grid grid-3 how">
            <div className="how-card">
              <span className="how-num">1</span>
              <h3>เลือกบทเรียน</h3>
              <p>ค้นหาหรือกรองตามโปรแกรมและระดับ เลือกบทที่ตรงกับเป้าหมายของคุณ</p>
            </div>
            <div className="how-card">
              <span className="how-num">2</span>
              <h3>ทำตามทีละขั้น</h3>
              <p>ติ๊กขั้นตอนที่ทำเสร็จ ระบบจะจำความคืบหน้าและบทเรียนที่บันทึกไว้ให้</p>
            </div>
            <div className="how-card">
              <span className="how-num">3</span>
              <h3>ติดปัญหา? ปรึกษาเลย</h3>
              <p>ส่งคำถามหรือผลงานของคุณ เพื่อรับคำแนะนำเฉพาะตัว</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <div className="section-head center">
            <h2>คำถามที่พบบ่อย</h2>
          </div>
          <Accordion items={faqs.filter((f) => f.category === 'general' || f.category === 'learning').slice(0, 4)} />
          <p className="center-text">
            <Link to="/faq" className="link-arrow">
              ดูคำถามทั้งหมด <Icon name="arrow" size={16} />
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>ติดปัญหาอยู่ใช่ไหม?</h2>
              <p>บอกเราว่าคุณกำลังทำอะไรอยู่ เราจะช่วยหาทางออกให้</p>
            </div>
            <Link to="/consult" className="btn btn-light">
              ขอคำปรึกษาฟรี <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

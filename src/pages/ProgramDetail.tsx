import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Icon from '../components/Icon';
import ProgramBadge, { programStyle } from '../components/ProgramBadge';
import TutorialCard from '../components/TutorialCard';
import { faqs } from '../data/faqs';
import { LEVELS, LEVEL_LABEL } from '../data/meta';
import { programs } from '../data/programs';
import { tutorials } from '../data/tutorials';
import { usePageTitle } from '../lib/usePageTitle';
import type { Level } from '../types';
import NotFound from './NotFound';

export default function ProgramDetail() {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find((p) => p.slug === slug);
  const [level, setLevel] = useState<Level | 'all'>('all');
  usePageTitle(program ? program.name : 'ไม่พบโปรแกรม');

  if (!program) return <NotFound />;

  const all = tutorials.filter((t) => t.program === program.slug);
  const visible = level === 'all' ? all : all.filter((t) => t.level === level);
  const programFaqs = faqs.filter((f) => f.program === program.slug);

  return (
    <>
      <section className="program-hero" style={programStyle(program)}>
        <div className="container program-hero-inner">
          <div>
            <nav className="breadcrumb" aria-label="breadcrumb">
              <Link to="/">หน้าแรก</Link> / <Link to="/programs">โปรแกรม</Link> / <span>{program.name}</span>
            </nav>
            <h1>{program.name}</h1>
            <p className="lead">{program.description}</p>
            <div className="hero-actions">
              <a href="#lessons" className="btn btn-light">
                ดูบทเรียน ({all.length})
              </a>
              <Link to={`/consult?program=${program.slug}`} className="btn btn-outline-light">
                ปรึกษาเรื่อง {program.abbr}
              </Link>
            </div>
          </div>
          <ProgramBadge program={program} size="lg" />
        </div>
      </section>

      <div className="container page">
        <div className="info-grid">
          <div className="info-card">
            <h3>เหมาะกับ</h3>
            <ul>
              {program.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>ทักษะที่จะได้</h3>
            <div className="tags">
              {program.skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="info-card">
            <h3>รองรับ</h3>
            <div className="tags">
              {program.platforms.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <section id="lessons" className="block">
          <div className="section-head">
            <h2>บทเรียน {program.name}</h2>
          </div>
          <div className="chips" role="group" aria-label="กรองตามระดับ">
            <button
              type="button"
              className={`chip${level === 'all' ? ' active' : ''}`}
              aria-pressed={level === 'all'}
              onClick={() => setLevel('all')}
            >
              ทุกระดับ
            </button>
            {LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                className={`chip${level === l ? ' active' : ''}`}
                aria-pressed={level === l}
                onClick={() => setLevel(l)}
              >
                {LEVEL_LABEL[l]}
              </button>
            ))}
          </div>
          {visible.length > 0 ? (
            <div className="grid grid-3">
              {visible.map((t) => (
                <TutorialCard key={t.id} tutorial={t} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>ยังไม่มีบทเรียนระดับนี้ในโปรแกรมนี้</p>
              <button type="button" className="btn btn-ghost" onClick={() => setLevel('all')}>
                แสดงทุกระดับ
              </button>
            </div>
          )}
        </section>

        {programFaqs.length > 0 && (
          <section className="block narrow-block">
            <div className="section-head">
              <h2>คำถามเกี่ยวกับ {program.abbr}</h2>
            </div>
            <Accordion items={programFaqs} />
          </section>
        )}

        <div className="cta-band">
          <div>
            <h2>อยากได้คำแนะนำเฉพาะตัว?</h2>
            <p>ส่งคำถามเกี่ยวกับ {program.name} มาให้เราได้เลย</p>
          </div>
          <Link to={`/consult?program=${program.slug}`} className="btn btn-light">
            ขอคำปรึกษา <Icon name="arrow" size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}

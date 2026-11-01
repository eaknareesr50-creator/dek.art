import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LEVEL_LABEL } from '../data/meta';
import { getProgram } from '../data/programs';
import { searchPrograms, searchTutorials } from '../lib/search';
import Icon from './Icon';
import ProgramBadge from './ProgramBadge';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const q = query.trim();
  const programResults = useMemo(() => (q ? searchPrograms(q) : []), [q]);
  const tutorialResults = useMemo(() => (q ? searchTutorials(q).slice(0, 8) : []), [q]);

  if (!open) return null;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
    navigate(q ? `/tutorials?q=${encodeURIComponent(q)}` : '/tutorials');
  };

  const hasResults = programResults.length + tutorialResults.length > 0;

  return (
    <div
      className="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="ค้นหา"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-box">
        <form onSubmit={onSubmit} className="search-form">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาโปรแกรมหรือบทเรียน เช่น Pen Tool, ลบพื้นหลัง"
            aria-label="คำค้นหา"
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="ปิดการค้นหา">
            <Icon name="close" />
          </button>
        </form>

        <div className="search-results">
          {!q && <p className="search-hint">พิมพ์คำที่ต้องการค้นหา แล้วกด Enter เพื่อดูผลทั้งหมด</p>}
          {q && !hasResults && (
            <p className="search-hint">ไม่พบผลลัพธ์สำหรับ &ldquo;{q}&rdquo; ลองใช้คำอื่น</p>
          )}

          {programResults.length > 0 && (
            <>
              <h4>โปรแกรม</h4>
              {programResults.map((p) => (
                <Link key={p.slug} to={`/programs/${p.slug}`} className="search-item" onClick={onClose}>
                  <ProgramBadge program={p} size="sm" />
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.tagline}</small>
                  </span>
                </Link>
              ))}
            </>
          )}

          {tutorialResults.length > 0 && (
            <>
              <h4>บทเรียน</h4>
              {tutorialResults.map((t) => (
                <Link key={t.id} to={`/tutorials/${t.id}`} className="search-item" onClick={onClose}>
                  <ProgramBadge program={getProgram(t.program)} size="sm" />
                  <span>
                    <strong>{t.title}</strong>
                    <small>
                      {getProgram(t.program).name} · {LEVEL_LABEL[t.level]} · {t.minutes} นาที
                    </small>
                  </span>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

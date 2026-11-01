import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import TutorialCard from '../components/TutorialCard';
import { useLibrary } from '../context/LibraryContext';
import { LEVELS, LEVEL_LABEL } from '../data/meta';
import { isProgramSlug, programs } from '../data/programs';
import { tutorials } from '../data/tutorials';
import { tutorialMatches } from '../lib/search';
import { usePageTitle } from '../lib/usePageTitle';

type Sort = 'default' | 'short' | 'level';

const levelOrder: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

export default function Tutorials() {
  usePageTitle('บทเรียน');
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') ?? '');
  const { saved } = useLibrary();

  const programParam = params.get('program');
  const program = isProgramSlug(programParam) ? programParam : '';
  const levelParam = params.get('level') ?? '';
  const level = LEVELS.find((l) => l === levelParam) ?? '';
  const onlySaved = params.get('saved') === '1';
  const sortParam = params.get('sort');
  const sort: Sort = sortParam === 'short' || sortParam === 'level' ? sortParam : 'default';
  const q = params.get('q') ?? '';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    let list = tutorials.filter((t) => tutorialMatches(t, q));
    if (program) list = list.filter((t) => t.program === program);
    if (level) list = list.filter((t) => t.level === level);
    if (onlySaved) list = list.filter((t) => saved.includes(t.id));
    if (sort === 'short') list = [...list].sort((a, b) => a.minutes - b.minutes);
    if (sort === 'level') list = [...list].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
    return list;
  }, [q, program, level, onlySaved, sort, saved]);

  const hasFilters = Boolean(q || program || level || onlySaved);

  const clearAll = () => {
    setQuery('');
    setParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="container page">
      <header className="page-head">
        <h1>บทเรียนทั้งหมด</h1>
        <p>ค้นหาและกรองบทเรียนตามโปรแกรม ระดับ และบทเรียนที่คุณบันทึกไว้</p>
      </header>

      <div className="toolbar">
        <div className="search-field">
          <Icon name="search" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              update('q', e.target.value);
            }}
            placeholder="ค้นหาบทเรียน..."
            aria-label="ค้นหาบทเรียน"
          />
        </div>
        <select
          className="select"
          value={program}
          onChange={(e) => update('program', e.target.value)}
          aria-label="กรองตามโปรแกรม"
        >
          <option value="">ทุกโปรแกรม</option>
          {programs.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={level}
          onChange={(e) => update('level', e.target.value)}
          aria-label="กรองตามระดับ"
        >
          <option value="">ทุกระดับ</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {LEVEL_LABEL[l]}
            </option>
          ))}
        </select>
        <select
          className="select"
          value={sort}
          onChange={(e) => update('sort', e.target.value === 'default' ? '' : e.target.value)}
          aria-label="เรียงลำดับ"
        >
          <option value="default">เรียงตามค่าเริ่มต้น</option>
          <option value="short">สั้นที่สุดก่อน</option>
          <option value="level">ง่ายไปยาก</option>
        </select>
        <button
          type="button"
          className={`chip${onlySaved ? ' active' : ''}`}
          aria-pressed={onlySaved}
          onClick={() => update('saved', onlySaved ? '' : '1')}
        >
          <Icon name="bookmark" size={15} filled={onlySaved} /> ที่บันทึกไว้ ({saved.length})
        </button>
      </div>

      <p className="result-count" role="status">
        พบ {results.length} บทเรียน
        {hasFilters && (
          <button type="button" className="link-btn" onClick={clearAll}>
            ล้างตัวกรอง
          </button>
        )}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-3">
          {results.map((t) => (
            <TutorialCard key={t.id} tutorial={t} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>ไม่พบบทเรียนที่ตรงกับเงื่อนไข</h2>
          <p>{onlySaved ? 'คุณยังไม่ได้บันทึกบทเรียนที่ตรงกับตัวกรองนี้' : 'ลองเปลี่ยนคำค้นหาหรือล้างตัวกรอง'}</p>
          <button type="button" className="btn btn-primary" onClick={clearAll}>
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import ProgramCard from '../components/ProgramCard';
import { programs } from '../data/programs';
import { usePageTitle } from '../lib/usePageTitle';

export default function Programs() {
  usePageTitle('โปรแกรม');
  const [category, setCategory] = useState('all');
  const categories = Array.from(new Set(programs.map((p) => p.category)));
  const visible = category === 'all' ? programs : programs.filter((p) => p.category === category);

  return (
    <div className="container page">
      <header className="page-head">
        <h1>โปรแกรมทั้งหมด</h1>
        <p>เลือกโปรแกรมเพื่อดูภาพรวม ทักษะที่จะได้ และบทเรียนที่เกี่ยวข้อง</p>
      </header>

      <div className="chips" role="group" aria-label="กรองตามหมวด">
        <button
          type="button"
          className={`chip${category === 'all' ? ' active' : ''}`}
          aria-pressed={category === 'all'}
          onClick={() => setCategory('all')}
        >
          ทั้งหมด ({programs.length})
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip${category === c ? ' active' : ''}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-programs">
        {visible.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>
    </div>
  );
}

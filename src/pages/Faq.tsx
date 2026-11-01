import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion';
import Icon from '../components/Icon';
import { faqs } from '../data/faqs';
import { FAQ_CATEGORIES, FAQ_CATEGORY_LABEL } from '../data/meta';
import { matchesQuery } from '../lib/search';
import { usePageTitle } from '../lib/usePageTitle';
import type { FaqCategory } from '../types';

export default function Faq() {
  usePageTitle('คำถามที่พบบ่อย');
  const [category, setCategory] = useState<FaqCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const items = useMemo(
    () =>
      faqs.filter(
        (f) => (category === 'all' || f.category === category) && matchesQuery([f.question, f.answer], query),
      ),
    [category, query],
  );

  return (
    <div className="container page narrow">
      <header className="page-head">
        <h1>คำถามที่พบบ่อย</h1>
        <p>ค้นหาคำตอบได้ทันที หากไม่พบสามารถส่งคำถามมาหาเราได้</p>
      </header>

      <div className="search-field">
        <Icon name="search" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาคำถาม..."
          aria-label="ค้นหาคำถาม"
        />
      </div>

      <div className="chips" role="group" aria-label="หมวดคำถาม">
        <button
          type="button"
          className={`chip${category === 'all' ? ' active' : ''}`}
          aria-pressed={category === 'all'}
          onClick={() => setCategory('all')}
        >
          ทั้งหมด
        </button>
        {FAQ_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip${category === c ? ' active' : ''}`}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {FAQ_CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <Accordion key={`${category}-${query}`} items={items} />
      ) : (
        <div className="empty">
          <h2>ไม่พบคำถามที่ตรงกัน</h2>
          <p>ลองเปลี่ยนคำค้นหา หรือส่งคำถามมาหาเราโดยตรง</p>
        </div>
      )}

      <div className="cta-band small">
        <div>
          <h2>ยังไม่เจอคำตอบ?</h2>
          <p>ส่งคำถามของคุณมาได้เลย</p>
        </div>
        <Link to="/consult" className="btn btn-light">
          ขอคำปรึกษา
        </Link>
      </div>
    </div>
  );
}

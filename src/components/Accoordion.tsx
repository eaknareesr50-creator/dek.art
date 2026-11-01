import { useState } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="accordion">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className={`acc-item${open ? ' open' : ''}`}>
            <h3>
              <button
                type="button"
                className="acc-trigger"
                id={`acc-btn-${item.id}`}
                aria-expanded={open}
                aria-controls={`acc-panel-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.question}</span>
                <span className="acc-icon" aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              className="acc-panel"
              id={`acc-panel-${item.id}`}
              role="region"
              aria-labelledby={`acc-btn-${item.id}`}
            >
              <div className="acc-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

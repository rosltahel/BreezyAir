import { useState } from 'react';
import { faqs } from '../data.js';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="faq-list">
      {faqs.map((item, i) => (
        <div className="faq-item" key={i}>
          <button
            className={`faq-q${openIndex === i ? ' open' : ''}`}
            onClick={() => toggle(i)}
          >
            {item.q}
            <span className="faq-arrow">+</span>
          </button>
          <div className={`faq-a${openIndex === i ? ' open' : ''}`}>
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}

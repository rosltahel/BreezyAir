import { useState, useMemo } from 'react';
import { faqs } from '../data.js';

/* ─── Keyword scoring ────────────────────────────────────────────────────────
   Split the query into individual words, then count how many appear in the
   combined question + answer text (case-insensitive). Items with zero matches
   are excluded; survivors are sorted highest-score first.
   This means searching "cancel subscription" surfaces the cancellation FAQ
   before a tangentially related one — without any external search library.
──────────────────────────────────────────────────────────────────────────── */
function scoreItem(item, words) {
  const haystack = (item.q + ' ' + item.a).toLowerCase();
  return words.reduce((sum, w) => sum + (haystack.includes(w) ? 1 : 0), 0);
}

const HINT = 'pricing, delivery, freshness, cancel, subscription, refund, pet, safety';

export default function FAQAccordion() {
  const [query, setQuery]       = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  /* Recompute the visible list only when query or faqs change */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs.map((item, i) => ({ item, i, score: 0 }));

    const words = q.split(/\s+/).filter(Boolean);
    return faqs
      .map((item, i) => ({ item, i, score: scoreItem(item, words) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  /* Reset open accordion whenever the search changes */
  const handleQuery = (e) => {
    setQuery(e.target.value);
    setOpenIndex(null);
  };

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const noMatch = query.trim() !== '' && results.length === 0;

  return (
    <>
      <style>{`
        /* ── Search box ── */
        .bz-faq-search-wrap {
          position: relative;
          max-width: 540px;
          margin: 32px auto 40px;
        }
        .bz-faq-search {
          width: 100%;
          padding: 14px 44px 14px 20px;
          border: 1.5px solid var(--sky-200);
          border-radius: 999px;
          background: #fff;
          font-size: 1rem;
          color: var(--slate-700);
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
          box-sizing: border-box;
          box-shadow: 0 1px 4px rgba(14,165,233,0.06);
        }
        .bz-faq-search::placeholder { color: var(--slate-400); }
        .bz-faq-search:focus {
          border-color: var(--sky-400);
          box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
        }
        /* Magnifier icon inside the input */
        .bz-faq-search-icon {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--sky-400);
          pointer-events: none;
        }
        /* Clear button appears when there is text */
        .bz-faq-clear {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: var(--slate-400);
          font-size: 1rem;
          line-height: 1;
          padding: 2px 4px;
          border-radius: 50%;
          transition: color 0.15s, background 0.15s;
        }
        .bz-faq-clear:hover { color: var(--slate-600); background: var(--sky-50); }

        /* ── Result count badge ── */
        .bz-faq-count {
          font-size: 0.78rem;
          color: var(--sky-500);
          text-align: center;
          margin: -24px 0 20px;
          letter-spacing: 0.03em;
          font-weight: 500;
          min-height: 1.2em;
        }

        /* ── No-match state ── */
        .bz-faq-empty {
          background: var(--sky-50);
          border: 1.5px dashed var(--sky-200);
          border-radius: 16px;
          padding: 36px 24px;
          color: var(--slate-500);
          max-width: 540px;
          margin: 0 auto;
        }
        .bz-faq-empty strong { color: var(--slate-700); }
        .bz-faq-empty .bz-faq-hints {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
          margin-top: 16px;
        }
        .bz-faq-hint-chip {
          background: #fff;
          border: 1.5px solid var(--sky-200);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 0.82rem;
          color: var(--sky-600);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .bz-faq-hint-chip:hover {
          background: var(--sky-100);
          border-color: var(--sky-400);
        }

        /* ── Matched keyword highlight inside answers ── */
        .bz-faq-hl {
          background: rgba(14,165,233,0.14);
          border-radius: 3px;
          padding: 0 2px;
          color: inherit;
        }
      `}</style>

      {/* ── Search input ── */}
      <div className="bz-faq-search-wrap">
        <input
          className="bz-faq-search"
          type="text"
          placeholder="Search questions… e.g. cancel, refund, delivery"
          value={query}
          onChange={handleQuery}
          aria-label="Search FAQs"
        />
        {query ? (
          <button
            className="bz-faq-clear"
            onClick={() => { setQuery(''); setOpenIndex(null); }}
            aria-label="Clear search"
          >✕</button>
        ) : (
          <span className="bz-faq-search-icon" aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
        )}
      </div>

      {/* ── Result count (only when a search is active) ── */}
      {query.trim() && !noMatch && (
        <div className="bz-faq-count">
          {results.length} answer{results.length !== 1 ? 's' : ''} found
        </div>
      )}

      {/* ── No-match message with hint chips ── */}
      {noMatch ? (
        <div className="bz-faq-empty" role="status">
          <p style={{ marginBottom: 4 }}>
            <strong>No exact match</strong> for "{query.trim()}"
          </p>
          <p style={{ fontSize: '0.88rem', margin: 0 }}>Try one of these topics:</p>
          <div className="bz-faq-hints">
            {['pricing', 'cancel', 'refund', 'delivery', 'freshness', 'subscription', 'pet', 'safety'].map(hint => (
              <button
                key={hint}
                className="bz-faq-hint-chip"
                onClick={() => { setQuery(hint); setOpenIndex(null); }}
              >
                {hint}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── FAQ accordion list ── */
        <div className="faq-list">
          {results.map(({ item, i }) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={toggle}
              highlight={query.trim().toLowerCase().split(/\s+/).filter(Boolean)}
            />
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Single accordion item with optional keyword highlighting ───────────── */
function FAQItem({ item, index, isOpen, onToggle, highlight }) {
  return (
    <div className="faq-item">
      <button
        className={`faq-q${isOpen ? ' open' : ''}`}
        onClick={() => onToggle(index)}
      >
        <Highlighted text={item.q} words={highlight} />
        <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
      </button>
      <div className={`faq-a${isOpen ? ' open' : ''}`}>
        <Highlighted text={item.a} words={highlight} />
      </div>
    </div>
  );
}

/* ─── Wraps matched words in a highlight span ───────────────────────────── */
function Highlighted({ text, words }) {
  if (!words.length) return text;

  /* Build a regex that matches any of the search words */
  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex   = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts   = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bz-faq-hl">{part}</mark>
          : part
      )}
    </>
  );
}

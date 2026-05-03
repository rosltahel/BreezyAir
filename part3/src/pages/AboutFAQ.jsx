import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import FAQAccordion from '../components/FAQAccordion.jsx';

/* ─────────────────────────────────────────────────────────────────────────────
   AnimatedWords — word-by-word staggered slide-up (used in about-hero)
───────────────────────────────────────────────────────────────────────────── */
function AnimatedWords({ text, baseDelay = 0 }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="bz-word"
          style={{ animationDelay: `${baseDelay + i * 90}ms` }}
        >
          {word}{i < words.length - 1 && '\u00a0'}
        </span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RevealParagraph — fades + slides up when scrolled into view
───────────────────────────────────────────────────────────────────────────── */
function RevealParagraph({ children, delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <p
      ref={ref}
      className={`lead bz-reveal${seen ? ' bz-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RevealSection — fires once when the section header scrolls into view,
   adding .bz-in to trigger the label + title transitions.
───────────────────────────────────────────────────────────────────────────── */
function RevealSection({ label, title }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div className={`section-label bz-sec-label${seen ? ' bz-in' : ''}`}>
        {label}
        <span className={`bz-label-rule${seen ? ' bz-in' : ''}`} aria-hidden="true" />
      </div>
      <div className={`section-title bz-sec-title${seen ? ' bz-in' : ''}`}>
        {title}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   RevealCard — each value card slides up + fades in when it enters the
   viewport. `delay` staggers the four cards so they arrive in sequence.
───────────────────────────────────────────────────────────────────────────── */
function RevealCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSeen(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`value-card bz-card${seen ? ' bz-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   AboutFAQ page
───────────────────────────────────────────────────────────────────────────── */
export default function AboutFAQ() {
  useEffect(() => { document.title = 'About & FAQ | Breezy™'; }, []);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: 'var(--sky-50)' }}>

      <style>{`

        /* ── About-hero: drifting background orb ── */
        @keyframes bz-about-drift {
          0%   { transform: translate(0, 0)        scale(1);    }
          40%  { transform: translate(60px, -40px) scale(1.06); }
          70%  { transform: translate(-30px, 30px) scale(0.95); }
          100% { transform: translate(0, 0)        scale(1);    }
        }
        .bz-about-orb {
          position: absolute;
          width: 560px; height: 560px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(186,230,253,0.45) 0%, transparent 68%);
          filter: blur(80px);
          top: -140px; right: -180px;
          pointer-events: none;
          z-index: 0;
          animation: bz-about-drift 20s ease-in-out infinite;
        }

        /* ── About-hero: "OUR STORY" label on load ── */
        @keyframes bz-label-in {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bz-label-anim {
          animation: bz-label-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
        }

        /* ── Decorative rule that grows left-to-right ── */
        @keyframes bz-rule-grow {
          from { width: 0; opacity: 0; }
          to   { width: 48px; opacity: 1; }
        }
        .bz-label-rule {
          display: block;
          height: 2px;
          background: var(--sky-400);
          border-radius: 2px;
          margin: 8px auto 0;
          width: 0;
          opacity: 0;
          transition: width 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.18s,
                      opacity 0.4s ease 0.18s;
        }
        /* On load (about-hero label, no scroll trigger needed) */
        .bz-label-anim .bz-label-rule {
          animation: bz-rule-grow 0.6s cubic-bezier(0.22, 1, 0.36, 1) 450ms both;
        }
        /* On scroll (values section label) */
        .bz-label-rule.bz-in {
          width: 48px;
          opacity: 1;
        }

        /* ── About-hero: word-by-word headline cascade ── */
        @keyframes bz-word-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bz-word {
          display: inline-block;
          opacity: 0;
          animation: bz-word-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* ── Scroll-reveal: paragraphs ── */
        .bz-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bz-reveal.bz-in { opacity: 1; transform: translateY(0); }

        /* ── Brand name hover ── */
        .bz-brand-em {
          display: inline-block;
          font-style: normal;
          font-weight: 700;
          color: var(--sky-600);
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .bz-brand-em:hover { transform: scale(1.04); color: var(--sky-500); }

        /* ── Values: section label scroll-reveal ── */
        .bz-sec-label {
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .bz-sec-label.bz-in { opacity: 1; transform: translateY(0); }

        /* ── Values: section title scroll-reveal ── */
        .bz-sec-title {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s,
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
        }
        .bz-sec-title.bz-in { opacity: 1; transform: translateY(0); }

        /* ── Values: card scroll-reveal ── */
        .bz-card {
          opacity: 0;
          transform: translateY(36px) scale(0.97);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.25s ease,
                      border-color 0.25s ease;
        }
        .bz-card.bz-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* ── Values: card hover lift + glow ── */
        .bz-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
          box-shadow: 0 16px 40px rgba(14,165,233,0.13), 0 2px 8px rgba(0,0,0,0.06) !important;
          border-color: var(--sky-200) !important;
        }

        /* ── Values: icon pops in when card arrives ── */
        @keyframes bz-icon-pop {
          0%   { transform: scale(0.6) rotate(-8deg); opacity: 0; }
          70%  { transform: scale(1.12) rotate(3deg); opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        .bz-card.bz-in .value-icon {
          animation: bz-icon-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        /* each card's icon delay matches the card's transition-delay + a little extra */
        .bz-card:nth-child(1).bz-in .value-icon { animation-delay: 0.18s; }
        .bz-card:nth-child(2).bz-in .value-icon { animation-delay: 0.22s; }
        .bz-card:nth-child(3).bz-in .value-icon { animation-delay: 0.26s; }
        .bz-card:nth-child(4).bz-in .value-icon { animation-delay: 0.30s; }

        /* ── Values: icon scale on card hover ── */
        .bz-card:hover .value-icon {
          transform: scale(1.1) rotate(-4deg);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* ── ABOUT HERO ── */}
      <section className="about-hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="bz-about-orb" aria-hidden="true" />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label bz-label-anim" style={{ display: 'inline-block' }}>
            Our Story
            <span className="bz-label-rule" aria-hidden="true" />
          </div>

          <h1>
            <AnimatedWords text="We breathed so"     baseDelay={280} />
            <br />
            <AnimatedWords text="you don't have to." baseDelay={580} />
          </h1>

          <RevealParagraph delay={0}>
            Founded in 2024 in a converted yurt in the Swiss Alps after our founder realized you
            could charge people for things that already exist for free.
          </RevealParagraph>

          <RevealParagraph delay={80}>
            We looked around and saw a world full of people inhaling generic, un-curated oxygen —
            people who would happily pay $8 for water in a geometric bottle but were somehow satisfied
            breathing street air. That's when{' '}
            <strong className="bz-brand-em">Breezy™</strong> was born.
          </RevealParagraph>

          <RevealParagraph delay={160}>
            We assembled a team of master Air Sommeliers to scour the globe for the finest altitudes,
            capturing them in artisanal glass vessels and delivering them directly to your nostrils
            via our proprietary subscription model.
          </RevealParagraph>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="values">
        <div className="container">

          <RevealSection label="Our Values" title="What we stand for" />

          <div className="values-grid" style={{ marginTop: '48px' }}>

            <RevealCard delay={0}>
              <div className="value-icon" style={{ background: 'var(--sky-50)', color: 'var(--sky-500)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2"/>
                </svg>
              </div>
              <h3>Radical Transparency</h3>
              <p>Our air is exactly what it looks like: completely invisible. We hide nothing.</p>
            </RevealCard>

            <RevealCard delay={100}>
              <div className="value-icon" style={{ background: '#f5f3ff', color: 'var(--violet-500)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>
                </svg>
              </div>
              <h3>Hyper-Local Sourcing</h3>
              <p>We source our air globally, which is just another way of saying locally everywhere.</p>
            </RevealCard>

            <RevealCard delay={200}>
              <div className="value-icon" style={{ background: '#ecfdf5', color: 'var(--emerald-500)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Zero-Calorie Guilt</h3>
              <p>All our air is gluten-free, vegan, keto, and paleo. Indulge without regret.</p>
            </RevealCard>

            <RevealCard delay={300}>
              <div className="value-icon" style={{ background: '#fff7ed', color: '#f97316' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
              </div>
              <h3>Global Air Network</h3>
              <p>47 countries. Thousands of altitudes. One subscription. Breathe everywhere.</p>
            </RevealCard>

          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">FAQ</div>
          <div className="section-title">Questions we made up</div>
          <p className="section-sub" style={{ margin: '0 auto' }}>Transparent answers to the questions literally nobody asked.</p>
          <FAQAccordion />
          <div style={{ marginTop: '56px' }}>
            <p style={{ color: 'var(--slate-500)', marginBottom: '20px' }}>Still have questions? Or just need a breath of fresh air?</p>
            <Link href="/pricing" className="btn btn-primary">Find Your Air Plan</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

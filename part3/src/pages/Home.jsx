import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { logos, features, timeline } from '../data.js';

/* ─── Particle data: fixed positions so they don't re-randomize on render ─── */
const PARTICLES = [
  { left: '12%', delay: '0s',   dur: '6s'  },
  { left: '28%', delay: '1.2s', dur: '8s'  },
  { left: '44%', delay: '0.4s', dur: '7s'  },
  { left: '60%', delay: '2.1s', dur: '9s'  },
  { left: '75%', delay: '0.9s', dur: '6.5s'},
  { left: '88%', delay: '1.7s', dur: '7.5s'},
];

export default function Home() {
  useEffect(() => { document.title = 'Breezy™ — Premium Artisanal Air'; }, []);

  const [email, setEmail]         = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending]     = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setEmailError(v && !validateEmail(v) ? "That doesn't look like a valid email." : '');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email)               { setEmailError('Please enter an email address.'); return; }
    if (!validateEmail(email)){ setEmailError("That doesn't look like a valid email."); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setEmail('');
      toast.success("Welcome to the upper echelon of breathing. Check your inbox.");
    }, 800);
  };

  return (
    <>
      {/* ─── Scoped animation styles, lives in this file only ─── */}
      <style>{`
        /* Badge bobs gently up and down — signals life, draws the eye */
        @keyframes bz-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }

        /* Two large blurred orbs drift around the hero like slow-moving air */
        @keyframes bz-drift-a {
          0%   { transform: translate(0,    0px)   scale(1);    }
          40%  { transform: translate(40px, -50px) scale(1.07); }
          70%  { transform: translate(-20px, 30px) scale(0.96); }
          100% { transform: translate(0,    0px)   scale(1);    }
        }
        @keyframes bz-drift-b {
          0%   { transform: translate(0,    0px)   scale(1);    }
          35%  { transform: translate(-50px, 40px) scale(1.05); }
          65%  { transform: translate(30px, -20px) scale(0.97); }
          100% { transform: translate(0,    0px)   scale(1);    }
        }

        /* Tiny particles rise like air bubbles */
        @keyframes bz-rise {
          0%   { transform: translateY(0)     scale(1);   opacity: 0;   }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(-130px) scale(0.5); opacity: 0; }
        }

        /* Shimmer sweeps across the CTA button on hover */
        @keyframes bz-shimmer {
          0%   { left: -75%; }
          100% { left: 135%;  }
        }

        /* ── Applied classes ── */
        .bz-badge-float {
          animation: bz-float 3.5s ease-in-out infinite;
          will-change: transform;
        }

        .bz-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          pointer-events: none;
          will-change: transform;
          z-index: 0;
        }
        .bz-orb-a {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(186,230,253,0.55) 0%, transparent 70%);
          top: -120px; left: -160px;
          animation: bz-drift-a 18s ease-in-out infinite;
        }
        .bz-orb-b {
          width: 440px; height: 440px;
          background: radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%);
          bottom: 40px; right: -100px;
          animation: bz-drift-b 22s ease-in-out infinite;
        }

        .bz-particle {
          position: absolute;
          bottom: 60px;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--sky-400);
          opacity: 0;
          animation: bz-rise linear infinite;
          will-change: transform, opacity;
          pointer-events: none;
          z-index: 0;
        }

        /* CTA button: shimmer sweep + stronger lift on hover */
        .bz-cta {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease !important;
        }
        .bz-cta::after {
          content: '';
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: skewX(-18deg);
          pointer-events: none;
        }
        .bz-cta:hover::after {
          animation: bz-shimmer 0.55s ease forwards;
        }
        .bz-cta:hover {
          transform: translateY(-4px) scale(1.03) !important;
          box-shadow: 0 12px 32px rgba(14,165,233,0.45) !important;
        }
        .bz-cta:active {
          transform: translateY(-1px) scale(1.01) !important;
        }
      `}</style>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: 'var(--sky-50)' }}>

        {/* ── HERO ── */}
        <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>

          {/* Drifting air orbs — decorative background blobs */}
          <div className="bz-orb bz-orb-a" aria-hidden="true" />
          <div className="bz-orb bz-orb-b" aria-hidden="true" />

          {/* Rising particles — subtle air-bubble dots */}
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="bz-particle"
              style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
              aria-hidden="true"
            />
          ))}

          <div className="hero-inner" style={{ position: 'relative', zIndex: 1 }}>

            {/* Badge floats gently */}
            <div className="badge bz-badge-float">
              <span className="badge-dot" /> Now serving 47 countries
            </div>

            <h1>Premium <em className="text-gradient">Artisanal Air</em>, Delivered&nbsp;Fresh</h1>
            <p>Hand-curated atmospheric blends sourced from the world's finest altitudes. Because you deserve air with <em>character</em>.</p>

            <div className="hero-buttons">
              {/* Primary CTA gets the shimmer + stronger lift */}
              <Link href="/pricing" className="btn btn-primary bz-cta">
                Start Breathing Better →
              </Link>
              <button className="btn btn-secondary" onClick={() => toast("📺 Playing: The Art of Nothing (3 min)")}>
                ▶ Watch the Story
              </button>
            </div>

            <div className="social-proof">
              <div className="avatars">
                {['J', 'S', 'M', 'A', 'T'].map((l, i) => (
                  <div key={i} className="avatar">{l}</div>
                ))}
              </div>
              <p><strong>12,847</strong> breathers joined this month</p>
            </div>

          </div>
        </section>

        {/* ── LOGOS ── */}
        <div className="logos">
          <p>Trusted by industry leaders who breathe</p>
          <div className="logo-row">
            {logos.map((l) => <span key={l}>{l}</span>)}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="features">
          <div className="container">
            <div className="section-label">Why Breezy</div>
            <div className="section-title">Air, but make it ✨ premium ✨</div>
            <p className="section-sub">We ruined a perfectly free resource by adding a subscription model. You're welcome.</p>
            <div className="features-grid">
              {features.map(({ Icon, bg, title, description }) => (
                <div className="feature-card" key={title}>
                  <div className="feature-icon" style={{ background: bg }}>
                    <Icon size={24} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="how" id="how">
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="section-label">How It Works</div>
            <div className="section-title">Three steps to better breathing</div>
            <p className="section-sub" style={{ margin: '0 auto' }}>It's so simple, you've probably been doing it wrong your whole life.</p>
            <div className="timeline">
              {timeline.map((step) => (
                <div className="timeline-step" key={step.num}>
                  <div className="timeline-num">{step.num}</div>
                  <div className="timeline-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="newsletter">
          <div className="nl-box">
            <h2>Inhale the Newsletter</h2>
            <p>Get weekly tips on how to breathe more pretentiously, plus exclusive access to limited-edition seasonal atmospheres.</p>
            <form onSubmit={handleSubscribe} noValidate>
              <div className="nl-form">
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  className={emailError ? 'error' : ''}
                />
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Inhaling…' : 'Subscribe'}
                </button>
              </div>
              {emailError && <p className="nl-error">{emailError}</p>}
            </form>
          </div>
        </section>

      </div>
    </>
  );
}

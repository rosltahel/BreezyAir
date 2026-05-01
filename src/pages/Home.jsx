import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { toast } from 'sonner';
import { logos, features, timeline } from '../data.js';

export default function Home() {
  useEffect(() => { document.title = 'Breezy™ — Premium Artisanal Air'; }, []);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleEmailChange = (e) => {
    const v = e.target.value;
    setEmail(v);
    setEmailError(v && !validateEmail(v) ? "That doesn't look like a valid email." : '');
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) { setEmailError('Please enter an email address.'); return; }
    if (!validateEmail(email)) { setEmailError("That doesn't look like a valid email."); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setEmail('');
      toast.success("Welcome to the upper echelon of breathing. Check your inbox.");
    }, 800);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: 'var(--sky-50)' }}>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-inner">
          <div className="badge"><span className="badge-dot" /> Now serving 47 countries</div>
          <h1>Premium <em className="text-gradient">Artisanal Air</em>, Delivered&nbsp;Fresh</h1>
          <p>Hand-curated atmospheric blends sourced from the world's finest altitudes. Because you deserve air with <em>character</em>.</p>
          <div className="hero-buttons">
            <Link href="/pricing" className="btn btn-primary">Start Breathing Better →</Link>
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
  );
}

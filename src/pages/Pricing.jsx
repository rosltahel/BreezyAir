import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import PricingQuiz from '../components/PricingQuiz.jsx';
import { plans, stats, testimonials } from '../data.js';

export default function Pricing() {
  useEffect(() => { document.title = 'Plans & Pricing | Breezy™'; }, []);

  const [recommended, setRecommended] = useState(null);

  useEffect(() => {
    const read = () => {
      try {
        const saved = localStorage.getItem('breezy-recommended-plan');
        setRecommended(saved ? JSON.parse(saved)?.plan ?? null : null);
      } catch (_) { setRecommended(null); }
    };
    read();
    window.addEventListener('breezy-recommendation-updated', read);
    return () => window.removeEventListener('breezy-recommendation-updated', read);
  }, []);

  const handleSelect = (plan) => {
    const msgs = {
      casual: '🫁 Welcome aboard, Casual Breather!',
      power: '🎉 Power Inhaler activated! Take a deep breath.',
      enterprise: '📞 Our Air Sales team will reach out within 1 business breath.',
    };
    toast(msgs[plan.key]);
  };

  return (
    <div className="pricing-page">

      {/* ── HEADER ── */}
      <section className="pricing-header">
        <div className="section-label">Pricing</div>
        <div className="section-title">Choose your atmosphere</div>
        <p className="section-sub" style={{ margin: '0 auto' }}>All plans include unlimited access to Earth's atmosphere (terms apply).</p>
        <PricingQuiz />
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ padding: '0 24px 96px' }}>
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan) => {
              const isRecommended = recommended === plan.key;
              const isHighlighted = plan.popular || isRecommended;
              return (
                <div
                  key={plan.id}
                  id={plan.id}
                  className={`price-card${plan.popular && !isRecommended ? ' popular' : ''}${isRecommended ? ' recommended' : ''}`}
                >
                  {isRecommended && <div className="recommended-tag">★ Recommended for you</div>}
                  {plan.popular && !isRecommended && <div className="popular-tag">Most Popular</div>}
                  <h3>{plan.name}</h3>
                  <p className="desc">{plan.description}</p>
                  <div className="price">
                    <sup>$</sup>{plan.price}<sub>/mo</sub>
                  </div>
                  <ul>
                    {plan.features.map((f) => (
                      <li key={f}><span className="check">✓</span>{f}</li>
                    ))}
                  </ul>
                  <button
                    className={`btn${isHighlighted ? ' btn-primary' : ' btn-secondary'}`}
                    onClick={() => handleSelect(plan)}
                  >
                    {plan.key === 'enterprise' ? 'Contact Sales' : plan.popular && !isRecommended ? 'Start Free Trial' : 'Get Started'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="stats">
        <div className="stats-grid">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <h2>{s.value}</h2>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-label">Testimonials</div>
          <div className="section-title" style={{ color: '#fff' }}>Don't take our word for it</div>
          <p className="section-sub">Real reviews from real breathers. Probably.</p>
          <div className="test-grid">
            {testimonials.map((t) => (
              <div className="test-card" key={t.author}>
                <div className="stars">{'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="test-author">
                  <div className="test-avatar">{t.initials}</div>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

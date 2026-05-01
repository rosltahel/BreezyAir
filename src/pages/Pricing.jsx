import { useState, useEffect } from 'react';
import { quizQuestions } from '../data.js';

const PLAN_NAMES = { casual: 'Casual Breather', power: 'Power Inhaler', enterprise: 'Enterprise Lung' };
const REASONS = {
  casual: "Since you just need occasional breaths and the standard mix suits you fine, Casual Breather is your perfect minimalist respiratory plan.",
  power: "Because you're breathing daily and want premium blends, Power Inhaler gives you unlimited breaths and 3 altitude blends.",
  enterprise: "With a whole organization to oxygenate and a need for dedicated support, Enterprise Lung ensures nobody suffocates on the clock.",
};

const STORAGE_KEY = 'breezy-recommended-plan';

export default function PricingQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ casual: 0, power: 0, enterprise: 0 });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.plan) { setResult(parsed); setStep(quizQuestions.length); }
      } catch (_) {}
    }
  }, []);

  const handleAnswer = (optionScore) => {
    const newScores = {
      casual: scores.casual + optionScore.casual,
      power: scores.power + optionScore.power,
      enterprise: scores.enterprise + optionScore.enterprise,
    };
    setScores(newScores);

    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      let winner = 'power';
      let max = -1;
      if (newScores.casual > max) { max = newScores.casual; winner = 'casual'; }
      if (newScores.power >= max) { max = newScores.power; winner = 'power'; }
      if (newScores.enterprise > max) { winner = 'enterprise'; }

      const finalResult = { plan: winner, reason: REASONS[winner] };
      setResult(finalResult);
      setStep(quizQuestions.length);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalResult));
      window.dispatchEvent(new Event('breezy-recommendation-updated'));
    }
  };

  const reset = () => {
    setStep(0);
    setScores({ casual: 0, power: 0, enterprise: 0 });
    setResult(null);
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('breezy-recommendation-updated'));
  };

  const scrollToPlan = () => {
    if (!result) return;
    const el = document.getElementById(`plan-${result.plan}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const isDone = step >= quizQuestions.length;
  const progress = isDone ? 100 : (step / quizQuestions.length) * 100;

  return (
    <div className="quiz-wrap">
      <div className="quiz-card">
        {!isDone && (
          <>
            <div className="quiz-header">
              <h3>✨ Find Your Air Plan</h3>
              <span className="quiz-step-label">Step {step + 1} of {quizQuestions.length}</span>
            </div>
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="quiz-body">
              <p className="quiz-question">{quizQuestions[step].question}</p>
              <div className="quiz-options">
                {quizQuestions[step].options.map((opt, i) => (
                  <button key={i} className="quiz-option" onClick={() => handleAnswer(opt.score)}>
                    <span>{opt.text}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {isDone && result && (
          <div className="quiz-result">
            <div className="quiz-result-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3>
              You're a{' '}
              <span className="text-gradient">{PLAN_NAMES[result.plan]}</span>
            </h3>
            <p>{result.reason}</p>
            <div className="quiz-result-actions">
              <button className="btn btn-primary" onClick={scrollToPlan}>See My Plan</button>
              <button className="quiz-retake" onClick={reset}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                </svg>
                Retake Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

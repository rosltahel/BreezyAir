import { Mountain, Dna, Leaf, Zap, FlaskConical, Users } from 'lucide-react';

export const logos = ['Lungify', 'AirBnBreeze', 'OxyCorp', 'NostrilTech', 'GaspWorks'];

export const features = [
  { Icon: Mountain, bg: '#dbeafe', title: 'Mountain-Sourced™', description: "Each batch is harvested at peak altitude by our trained Air Sommeliers using proprietary glass jars." },
  { Icon: Dna, bg: '#fce7f3', title: 'DNA-Matched Blends', description: "Our AI analyzes your 23andMe data to craft a bespoke nitrogen-oxygen ratio. Patent pending." },
  { Icon: Leaf, bg: '#d1fae5', title: 'Carbon-Neutral Carbon', description: "We offset our CO₂ by thinking really hard about trees. It's basically the same thing." },
  { Icon: Zap, bg: '#fef3c7', title: 'Instant Delivery', description: 'Our patented "Open a Window" technology ensures same-second delivery anywhere on Earth.' },
  { Icon: FlaskConical, bg: '#ede9fe', title: 'Lab-Verified Purity', description: "Every batch is tested by scientists who definitely exist and are not just our intern in a lab coat." },
  { Icon: Users, bg: '#ffe4e6', title: 'Community Breathing', description: "Join our Discord of 50k+ breathers. Share tips, techniques, and which nostril you prefer." },
];

export const timeline = [
  { num: 1, title: 'Take Our Quiz', description: "Answer 47 deeply personal questions so we can recommend the air you were already breathing." },
  { num: 2, title: 'We "Curate"', description: "Our team spends 0 minutes hand-selecting the exact same air from our warehouse (the sky)." },
  { num: 3, title: 'Breathe & Subscribe', description: "Inhale, exhale, repeat. If you stop, it's not our fault but also please don't cancel." },
];

export const plans = [
  {
    id: 'plan-casual',
    key: 'casual',
    name: 'Casual Breather',
    price: '9',
    description: 'For the air-curious',
    features: ['Up to 23,000 breaths/day', 'Standard atmospheric blend', 'Email support (we may reply)', '1 nostril optimization'],
    popular: false,
  },
  {
    id: 'plan-power',
    key: 'power',
    name: 'Power Inhaler',
    price: '29',
    description: 'For serious oxygen enthusiasts',
    features: ['Unlimited breaths', '3 premium altitude blends', 'Priority support (we will reply)', 'Dual-nostril optimization', 'Monthly Air Report™'],
    popular: true,
  },
  {
    id: 'plan-enterprise',
    key: 'enterprise',
    name: 'Enterprise Lung',
    price: '99',
    description: 'For teams that breathe together',
    features: ['Everything in Power Inhaler', 'Dedicated Air Account Manager', 'Custom scent profiles', 'SSO (Single Sniff-On)', 'SLA: 99.9% oxygen uptime'],
    popular: false,
  },
];

export const stats = [
  { value: '12M+', label: 'Breaths facilitated' },
  { value: '99.97%', label: 'Oxygen uptime SLA' },
  { value: '47', label: 'Countries served' },
  { value: '0', label: 'Customers who stopped breathing*' },
];

export const testimonials = [
  { stars: 5, quote: "I've been breathing for 34 years and never knew I was doing it wrong. Breezy changed everything. My left nostril has never been more optimized.", author: 'Jordan P.', role: 'VP of Inhaling, Lungify', initials: 'J' },
  { stars: 5, quote: "We switched our entire office to Breezy Enterprise. Productivity is the same but morale is confusingly higher. 10/10 would subscribe to air again.", author: 'Sam K.', role: 'COO, NostrilTech', initials: 'S' },
  { stars: 4, quote: "Four stars because I briefly forgot to breathe and it wasn't covered under the warranty. Otherwise, flawless product. The Mountain Blend slaps.", author: 'Taylor R.', role: 'Professional Breather', initials: 'T' },
];

export const faqs = [
  { q: "Isn't air already free?", a: "Technically, yes. But is free air really the air you want to be breathing? Our air comes with a receipt, and that's called peace of mind." },
  { q: "What if I forget to breathe?", a: "That's actually a medical concern and not something we can help with. But our Power Inhaler plan does include breathing reminders via push notification every 4 seconds." },
  { q: "Can I cancel anytime?", a: "Absolutely. You are free to return to breathing generic, un-curated street air whenever you wish. We won't judge you (publicly)." },
  { q: "How do you source your air?", a: "Our Air Sommeliers travel to remote, inaccessible peaks and capture the atmosphere in artisanal glass jars. It's totally not just a fan blowing in an empty warehouse." },
  { q: "Do you offer refunds for bad air?", a: "Air is highly subjective. If you find our blends 'stale', it's likely your lungs haven't developed the sophisticated palate required to appreciate our subtle nitrogen notes." },
  { q: "Can I mix different air blends?", a: "We strictly advise against DIY mixing. Mixing Swiss Alps with Tokyo Morning may result in sudden onset existential dread." },
  { q: "Is Breezy safe for pets?", a: "Dogs naturally breathe better air than we do. However, cats on the Power Inhaler plan have shown a 400% increase in condescending stares. Use with caution." },
];

export const footerLinks = {
  Product: ['Pricing', 'Air Blends', 'Equipment', 'Gift Cards'],
  Company: ['About Us', 'Careers', 'Sustainability', 'Press'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Refund Policy', 'Breathing Liability'],
};

export const quizQuestions = [
  {
    question: 'How often do you plan to breathe with us?',
    options: [
      { text: 'Casually (a few breaths a day)', score: { casual: 2, power: 0, enterprise: 0 } },
      { text: 'Daily devotion', score: { casual: 0, power: 2, enterprise: 0 } },
      { text: 'Continuously, professionally', score: { casual: 0, power: 0, enterprise: 2 } },
    ],
  },
  {
    question: "Who's breathing with you?",
    options: [
      { text: 'Just me', score: { casual: 1, power: 1, enterprise: 0 } },
      { text: 'A small crew (2–10)', score: { casual: 0, power: 2, enterprise: 1 } },
      { text: 'The whole organization', score: { casual: 0, power: 0, enterprise: 3 } },
    ],
  },
  {
    question: 'What level of hand-holding do you need?',
    options: [
      { text: 'I figure it out myself', score: { casual: 1, power: 1, enterprise: 0 } },
      { text: 'Occasional check-ins', score: { casual: 0, power: 2, enterprise: 0 } },
      { text: 'Dedicated air concierge', score: { casual: 0, power: 0, enterprise: 2 } },
    ],
  },
  {
    question: 'Are you interested in our premium altitude blends?',
    options: [
      { text: 'No, the standard mix is fine', score: { casual: 2, power: 0, enterprise: 0 } },
      { text: 'Maybe a few', score: { casual: 0, power: 2, enterprise: 0 } },
      { text: 'Yes, I want everything Mountain-Sourced™', score: { casual: 0, power: 1, enterprise: 2 } },
    ],
  },
];

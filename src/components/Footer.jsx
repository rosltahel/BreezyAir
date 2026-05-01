import { Link } from 'wouter';
import { footerLinks } from '../data.js';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="nav-brand">
            <span className="text-gradient">Breezy</span><sup style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: '0.8rem' }}>™</sup>
          </Link>
          <p>Premium Artisanal Air. Stop breathing basic oxygen and elevate your respiration.</p>
        </div>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading}>
            <h4>{heading}</h4>
            <ul>
              {links.map((link) => (
                <li key={link}>
                  <Link href={link === 'Pricing' ? '/pricing' : link.includes('About') ? '/about' : '#'}>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Breezy™. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

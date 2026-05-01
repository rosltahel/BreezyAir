import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const isActive = (path) => location === path ? 'active' : '';

  return (
    <>
      <div className="header-wrap">
        {/* Utility bar */}
        <div className="utility-bar">
          <a href="#">📱 Breezy App</a>
          <a href="#">📅 Consultations</a>
          <a href="#">📞 1-888-AIR-GOOD</a>
        </div>

        {/* Mid bar */}
        <div className="mid-bar">
          <Link href="/" className="nav-brand">
            <span className="text-gradient">Breezy</span><sup>™</sup>
          </Link>
          <div className="mid-links">
            <Link href="/about">Our Story</Link>
            <Link href="/pricing">Plans</Link>
            <Link href="/pricing" className="book-btn">Book Air</Link>
          </div>
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Main nav */}
        <div className="main-nav">
          <div className="location-badge">
            <div className="location-dot">📍</div>
            SUMMIT
          </div>
          <div className="main-nav-links">
            <Link href="/" className={isActive('/')}>Home</Link>
            <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
            <Link href="/about" className={isActive('/about')}>About & FAQ</Link>
            <div className="more-wrap">
              <button
                className="more-btn"
                onClick={() => setMoreOpen(!moreOpen)}
              >
                More <span className={`more-arrow${moreOpen ? ' open' : ''}`}>▼</span>
              </button>
              <div className={`more-dropdown${moreOpen ? ' open' : ''}`}>
                <Link href="/about">FAQ</Link>
                <Link href="#">Air Menu</Link>
                <Link href="#">Careers</Link>
                <Link href="#">Directions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <Link href="/">Home</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About & FAQ</Link>
        <div className="mobile-divider" />
        <Link href="/about">FAQ</Link>
        <Link href="#">Air Menu</Link>
        <Link href="#">Careers</Link>
        <div className="mobile-divider" />
        <Link href="#">Rewards Club</Link>
        <Link href="/pricing">Book Air</Link>
      </div>

      {/* Spacer */}
      <div className="header-spacer" style={{ height: '140px' }} />
    </>
  );
}

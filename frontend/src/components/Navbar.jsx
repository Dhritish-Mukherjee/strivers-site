import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button.jsx';

const navLinks = [
  {
    label: 'All Courses',
    href: '#courses',
    dropdown: ['Govt. Job Prep', 'JEE', 'NEET', 'SSC & Banking', 'Class 11–12', 'Foundation'],
  },
  { label: 'StriverTech', href: '#' },
  { label: 'Striver Academy', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDrop, setOpenDrop] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const u = localStorage.getItem('user');
      if (u) {
        setUser(JSON.parse(u));
      } else {
        setUser(null);
      }
    };
    loadUser();
    window.addEventListener('auth-change', loadUser);
    return () => window.removeEventListener('auth-change', loadUser);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setOpenDrop(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 100,
    background: scrolled ? 'var(--color-yellow)' : 'var(--color-paper)',
    borderBottom: '4px solid var(--color-ink)',
    boxShadow: scrolled ? '0px 8px 0px var(--color-ink)' : 'none',
    transition: 'background 0.25s ease, box-shadow 0.25s ease',
  };

  return (
    <header id="navbar" style={navStyle}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '4rem', gap: '2.5rem' }}>
        {/* Logo */}
        <a href="/" id="nav-logo" style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', flexShrink: 0, transform: 'rotate(-3deg)',
          background: 'var(--color-yellow)', border: '3px solid var(--color-ink)',
          boxShadow: '4px 4px 0px var(--color-ink)', padding: '0.4rem 0.8rem',
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s',
          position: 'relative', zIndex: 10
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-ink)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'rotate(-3deg)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)'; }}
        >
          <picture>
            <source srcSet="/logo.webp" type="image/webp" />
            <img src="/logo.png" alt="Strivers EdTech Logo — Prepare Smarter, Score Higher" width="160" height="56" loading="eager" decoding="async" style={{ height: '3.5rem', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </picture>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }} className="desktop-nav">
          {navLinks.map((link) => (
            <div key={link.label} style={{ position: 'relative' }}>
              {link.dropdown ? (
                <button
                  id={`nav-${link.label.toLowerCase().replace(/\s/g,'-')}`}
                  onClick={e => { e.stopPropagation(); setOpenDrop(openDrop === link.label ? null : link.label); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                    fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase',
                    color: 'var(--color-ink)', background: 'none', border: 'none',
                    cursor: 'pointer', padding: '0.5rem 0.75rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    style={{ transform: openDrop === link.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              ) : (
                <a
                  href={link.href}
                  id={`nav-${link.label.toLowerCase().replace(/\s/g,'-')}`}
                  style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase',
                    color: 'var(--color-ink)', textDecoration: 'none',
                    padding: '0.5rem 0.75rem', display: 'block',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-ink)'; }}
                >
                  {link.label}
                </a>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {link.dropdown && openDrop === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.18 }}
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: 'absolute', top: 'calc(100% + 0.5rem)', left: 0,
                      background: 'var(--color-paper)',
                      border: '3px solid var(--color-ink)',
                      boxShadow: 'var(--shadow-brutal-sm)',
                      minWidth: '12rem',
                      zIndex: 200,
                    }}
                  >
                    {link.dropdown.map((item) => (
                      <a
                        key={item}
                        href="#courses"
                        onClick={() => setOpenDrop(null)}
                        style={{
                          display: 'block', padding: '0.75rem 1rem',
                          fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase',
                          color: 'var(--color-ink)', textDecoration: 'none',
                          borderBottom: '2px solid var(--color-ink)',
                          transition: 'background 0.12s, color 0.12s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(193,68,14,0.04)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-ink)'; }}
                      >
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexShrink: 0, position: 'relative' }}>
          {!user ? (
            <Button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-login-modal')); }} variant="primary" id="nav-enroll-btn" style={{
              fontSize: '0.9rem', padding: '0.6rem 1.2rem', border: '2px solid var(--color-ink)',
              boxShadow: '4px 4px 0px var(--color-ink)', transform: 'translateY(-2px)'
            }}>Enroll Now</Button>
          ) : (
            <Button variant="primary" style={{
              fontSize: '0.9rem', padding: '0.6rem 1.2rem', border: '2px solid var(--color-ink)',
              boxShadow: '4px 4px 0px var(--color-ink)', transform: 'translateY(-2px)',
              background: 'var(--color-ink)', color: 'white'
            }}>Dashboard</Button>
          )}

          {/* Hamburger */}
          <button
            id="nav-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none', background: 'none', border: 'none',
              cursor: 'pointer', padding: '0.4rem', color: 'var(--color-ink)',
            }}
            className="hamburger-btn"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              {menuOpen
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              background: 'transparent',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <div className="container" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block', padding: '0.875rem 0',
                    fontFamily: 'var(--font-sans)', fontSize: '1rem',
                    color: 'var(--color-ink)', textDecoration: 'none',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <div style={{ marginTop: '1.25rem' }}>
                {!user ? (
                  <Button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('open-login-modal')); setMenuOpen(false); }} variant="primary" id="mob-enroll-btn">Enroll Now</Button>
                ) : (
                  <Button variant="primary" style={{ background: 'var(--color-ink)', color: 'white' }}>Dashboard</Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}

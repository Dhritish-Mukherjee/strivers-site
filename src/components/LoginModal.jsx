import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsSignUp(false);
    };
    window.addEventListener('open-login-modal', handleOpen);
    return () => window.removeEventListener('open-login-modal', handleOpen);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content - Brutalist/Maximalist Design */}
          <motion.div
            initial={{ y: 50, opacity: 0, rotate: -2, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 20, opacity: 0, rotate: 2, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'relative',
              background: 'var(--color-paper, #f4f0e6)',
              border: '4px solid var(--color-ink, #1a1a1a)',
              boxShadow: '12px 12px 0px var(--color-ink, #1a1a1a)',
              width: '100%',
              maxWidth: '420px',
              padding: '2.5rem',
              zIndex: 10000,
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '-1rem',
                right: '-1rem',
                background: 'var(--color-yellow, #ffd500)',
                border: '3px solid var(--color-ink, #1a1a1a)',
                boxShadow: '4px 4px 0px var(--color-ink, #1a1a1a)',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--color-ink, #1a1a1a)',
                transition: 'transform 0.1s, box-shadow 0.1s',
              }}
              onMouseDown={e => {
                e.currentTarget.style.transform = 'translate(4px, 4px)';
                e.currentTarget.style.boxShadow = '0px 0px 0px var(--color-ink)';
              }}
              onMouseUp={e => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink)';
              }}
            >
              ×
            </button>

            <h2 style={{
              fontFamily: 'var(--font-heading, "Archivo Black", sans-serif)',
              fontSize: '2rem',
              textTransform: 'uppercase',
              color: 'var(--color-ink, #1a1a1a)',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
            }}>
              {isSignUp ? (
                <>Create <br/><span style={{ color: 'var(--color-accent, #c1440e)' }}>Account</span></>
              ) : (
                <>Join the <br/><span style={{ color: 'var(--color-accent, #c1440e)' }}>Revolution</span></>
              )}
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans, "Inter", sans-serif)',
              fontWeight: 600,
              color: 'var(--color-ink, #1a1a1a)',
              marginBottom: '2rem',
              fontSize: '0.95rem'
            }}>
              {isSignUp ? 'Sign up to get started.' : 'Login to access exclusive courses.'}
            </p>

            <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Email</label>
                <input 
                  type="email" 
                  placeholder="striver@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    background: 'var(--color-paper, #f4f0e6)',
                    border: '3px solid var(--color-ink, #1a1a1a)',
                    boxShadow: '4px 4px 0px var(--color-ink, #1a1a1a)',
                    outline: 'none',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => {
                    e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-accent, #c1440e)';
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink, #1a1a1a)';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1rem',
                    background: 'var(--color-paper, #f4f0e6)',
                    border: '3px solid var(--color-ink, #1a1a1a)',
                    boxShadow: '4px 4px 0px var(--color-ink, #1a1a1a)',
                    outline: 'none',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => {
                    e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-accent, #c1440e)';
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  }}
                  onBlur={e => {
                    e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink, #1a1a1a)';
                    e.currentTarget.style.transform = 'translate(0, 0)';
                  }}
                />
              </div>

              {isSignUp && (
                <div>
                  <label style={{ display: 'block', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 9999999999"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      background: 'var(--color-paper, #f4f0e6)',
                      border: '3px solid var(--color-ink, #1a1a1a)',
                      boxShadow: '4px 4px 0px var(--color-ink, #1a1a1a)',
                      outline: 'none',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onFocus={e => {
                      e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-accent, #c1440e)';
                      e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    }}
                    onBlur={e => {
                      e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-ink, #1a1a1a)';
                      e.currentTarget.style.transform = 'translate(0, 0)';
                    }}
                  />
                </div>
              )}

              {isSignUp && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    id="marketing-opt-in"
                    required
                    style={{
                      marginTop: '0.25rem',
                      width: '1.25rem',
                      height: '1.25rem',
                      accentColor: 'var(--color-accent, #c1440e)',
                      cursor: 'pointer',
                      border: '2px solid var(--color-ink)'
                    }}
                  />
                  <label htmlFor="marketing-opt-in" style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '0.85rem', 
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: 'var(--color-ink, #1a1a1a)',
                    cursor: 'pointer'
                  }}>
                    I agree to receive advertisements, offers, and promotional emails from Strivers.
                  </label>
                </div>
              )}

              <button
                type="submit"
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'var(--color-accent, #c1440e)',
                  color: 'white',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  border: '3px solid var(--color-ink, #1a1a1a)',
                  boxShadow: '6px 6px 0px var(--color-ink, #1a1a1a)',
                  cursor: 'pointer',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translate(6px, 6px)';
                  e.currentTarget.style.boxShadow = '0px 0px 0px var(--color-ink)';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-ink)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translate(0px, 0px)';
                  e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-ink)';
                }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div style={{ 
                marginTop: '1rem', 
                textAlign: 'center',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}>
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent, #c1440e)',
                    fontWeight: 800,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    fontSize: 'inherit'
                  }}
                >
                  {isSignUp ? 'Sign In' : 'Create Account'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

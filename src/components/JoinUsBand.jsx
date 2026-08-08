import { motion } from 'framer-motion';
import { Button } from './ui/Button.jsx';
import { useInViewOnce } from '../hooks/useInViewOnce.js';

export default function JoinUsBand() {
  const [ref, inView] = useInViewOnce();
  return (
    <section id="community" ref={ref} style={{ background: 'var(--color-tertiary)', borderTop: '4px solid var(--color-ink)', borderBottom: '4px solid var(--color-ink)', overflow: 'hidden' }}>
      <div className="container section-py">
        {/* Label */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 900,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--color-ink)', marginBottom: '1.25rem', background: 'var(--color-yellow)',
          display: 'inline-block', padding: '0.2rem 0.8rem', border: '2px solid var(--color-ink)',
          boxShadow: '4px 4px 0px var(--color-ink)', transform: 'rotate(-2deg)'
        }}>
          Free to join
        </p>

        {/* Two-col: headline + CTA */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '3rem',
        }}
          className="join-grid"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900, lineHeight: 1, textTransform: 'uppercase',
              color: 'var(--color-ink)', textShadow: '4px 4px 0px var(--color-yellow)'
            }}
          >
            Join{' '}
            <span style={{ position: 'relative', display: 'inline-block', color: '#fff', WebkitTextStroke: '2px var(--color-ink)' }}>
              100,000+
              <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', overflow: 'visible' }}
                height="8" viewBox="0 0 140 8" preserveAspectRatio="none" fill="none">
                <path d="M2 3.5C30 1 60 4.5 70 2.5S110 0.5 138 3"
                  stroke="var(--color-ink)" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>{' '}
            students preparing with Strivers.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexShrink: 0 }}
          >
            <Button href="#community-links" variant="primary" id="joinband-join-btn" style={{
              fontSize: '1rem', padding: '0.8rem 1.5rem', border: '3px solid var(--color-ink)',
              boxShadow: '6px 6px 0px var(--color-ink)', background: 'var(--color-yellow)', color: 'var(--color-ink)'
            }}>Join Us Free</Button>
            <Button href="#courses" variant="ghost" id="joinband-browse-btn" style={{
              fontSize: '1rem', padding: '0.8rem 1.5rem', border: '3px solid var(--color-ink)',
              boxShadow: '6px 6px 0px var(--color-ink)', background: '#fff', color: 'var(--color-ink)'
            }}>Browse Courses</Button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="stats-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '4px solid var(--color-ink)', background: '#fff', boxShadow: 'var(--shadow-brutal)' }}
        >
          {[
            { v: '50,000+', l: 'Active Students' },
            { v: '500+',    l: 'Hours of Content' },
            { v: '20+',     l: 'Expert Educators' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '1.5rem 2rem',
              borderRight: i < 2 ? '4px solid var(--color-ink)' : 'none',
              background: i % 2 === 0 ? 'var(--color-secondary)' : '#fff'
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-ink)', marginBottom: '0.2rem' }}>{s.v}</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-ink)' }}>{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .join-grid { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div { border-right: none !important; border-bottom: 4px solid var(--color-ink) !important; }
          .stats-grid > div:last-child { border-bottom: none !important; }
        }
      `}</style>
    </section>
  );
}

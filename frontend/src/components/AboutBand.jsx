import { motion } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce.js';

export default function AboutBand() {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });

  return (
    <section id="about" style={{ background: 'transparent', position: 'relative', overflowX: 'hidden' }}>
      {/* Container with relative position for absolute decorative elements */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', position: 'relative' }}>
        
        {/* Maximalist side margin decorations */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {/* Left margin floaters */}
          <motion.div 
            animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', top: '10%', left: '-2rem', opacity: 1, fontFamily: 'var(--font-serif)', fontSize: '8rem', color: 'var(--color-yellow)', textShadow: '4px 4px 0px var(--color-ink)', WebkitTextStroke: '2px var(--color-ink)', userSelect: 'none', transform: 'rotate(-5deg)' }}>“</motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: 'absolute', bottom: '20%', left: '1rem', border: '3px solid var(--color-ink)', padding: '0.5rem 1rem', background: 'var(--color-secondary)', transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: 'left bottom', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)' }}>
            Est. 2021
          </motion.div>

          {/* Right margin floaters */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            style={{ position: 'absolute', top: '15%', right: '-4rem', fontFamily: 'var(--font-sans)', fontSize: '14rem', fontWeight: 900, lineHeight: 1, color: 'transparent', WebkitTextStroke: '4px rgba(0,0,0,0.1)', userSelect: 'none' }}>S</motion.div>
          
          <div style={{ position: 'absolute', bottom: '15%', right: '2rem', display: 'flex', gap: '0.3rem', opacity: 1 }}>
            {[1,2,3,4].map(i => (
              <motion.div 
                key={i} 
                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                style={{ width: '4px', height: '2rem', background: 'var(--color-ink)', transform: 'rotate(25deg)' }} />
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="about-grid"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '0',
            alignItems: 'center',
            background: 'var(--color-yellow)',
            border: '4px solid var(--color-ink)',
            padding: '3rem',
            boxShadow: 'var(--shadow-brutal)',
          }}
        >
          {/* Left — copy */}
          <div style={{ paddingRight: '3rem' }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 900,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-paper)', background: 'var(--color-ink)', display: 'inline-block', padding: '0.3rem 0.8rem', transform: 'rotate(-2deg)', marginBottom: '1.5rem',
            }}>About Strivers</p>
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase',
              color: 'var(--color-ink)', marginBottom: '1rem', textShadow: '4px 4px 0px #fff'
            }}>
              Built for India's most determined learners.
            </h2>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 600,
              color: 'var(--color-ink)', lineHeight: 1.75, maxWidth: '44ch',
            }}>
              Strivers started as a YouTube channel with one goal: make world-class exam
              preparation accessible to every student in India — regardless of city,
              coaching budget, or background. Today, over 100,000 students prepare daily
              with our structured courses, live sessions, and expert faculty.
            </p>
          </div>

          {/* Divider */}
          <div style={{
            width: '4px', alignSelf: 'stretch',
            background: 'var(--color-ink)',
          }} />

          {/* Right — founder photo + name */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            paddingLeft: '3rem', gap: '1rem',
          }}>
            {/* Circular photo placeholder */}
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              border: '4px solid var(--color-ink)', boxShadow: '6px 6px 0px var(--color-ink)',
              background: 'var(--color-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', transform: 'rotate(5deg)'
            }}>
              <svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="var(--color-secondary)"/>
                <circle cx="50" cy="38" r="20" fill="var(--color-ink)"/>
                <ellipse cx="50" cy="95" rx="35" ry="28" fill="var(--color-ink)"/>
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase',
                color: 'var(--color-ink)',
              }}>Founder &amp; CEO</p>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 700,
                color: 'var(--color-ink-muted)', marginTop: '0.2rem',
              }}>Strivers EdTech Pvt. Ltd.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:800px){
          .about-grid{grid-template-columns:1fr!important; padding: 2rem!important;}
          .about-grid>div:nth-child(2){display:none!important;}
          .about-grid>div:first-child{padding-right:0!important;}
          .about-grid>div:last-child{padding-left:0!important;padding-top:2rem!important;}
        }
      `}</style>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SLIDES = [
  {
    id: 'jee-batch',
    tag: 'NEW BATCH',
    headline: 'JEE 2026 — Full Syllabus',
    subline: 'Expert faculty. Structured plan. Starting September 1st.',
    cta: { label: 'Reserve Your Seat', href: '#' },
    bg: 'linear-gradient(135deg, #0d1117 0%, #1a1f3a 55%, #0f1225 100%)',
    accent: '#4D5F8A',
    align: 'left',
  },
  {
    id: 'neet-live',
    tag: 'LIVE TODAY',
    headline: 'Free Live Class — NEET Biology',
    subline: 'Cell Structure & Function. Today 5 PM. No registration needed.',
    cta: { label: 'Join Free', href: '#' },
    bg: 'linear-gradient(135deg, #071510 0%, #0d2b1a 55%, #0a1a12 100%)',
    accent: '#1E7A52',
    align: 'center',
  },
  {
    id: 'ssc-crash',
    tag: 'LIMITED SEATS',
    headline: 'SSC CGL Crash Course',
    subline: '60 days. Structured. Proven. 94% selection rate in last batch.',
    cta: { label: 'Enroll Now', href: '#' },
    bg: 'linear-gradient(135deg, #1a0d08 0%, #2d1508 55%, #3d2010 100%)',
    accent: '#C1440E',
    align: 'left',
  },
];

const INTERVAL = 5000;

export default function PosterCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [arrowsVisible, setArrowsVisible] = useState(false);
  const touchStart = useRef(null);
  const reduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (paused || reduced.current) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const go = (dir) => setCurrent(c => (c + dir + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[current];

  const arrowBtn = {
    position:'absolute', top:'50%', transform:'translateY(-50%)',
    background:'rgba(0,0,0,0.35)', border:'1px solid rgba(255,255,255,0.2)',
    color:'#fff', width:'2.5rem', height:'2.5rem',
    display:'flex', alignItems:'center', justifyContent:'center',
    cursor:'pointer', backdropFilter:'blur(6px)', transition:'background 0.15s', zIndex:10,
  };

  return (
    /* Inset card — sits within container, cream shows around it */
    <section id="poster-carousel" style={{ background:'transparent' }}>
      <div className="container section-py" style={{ paddingTop:'1.5rem' }}>
        <div
          style={{
            position:'relative', overflow:'hidden',
            borderRadius:'0px',
            height:'clamp(250px,35vw,500px)',
            border:'4px solid var(--color-ink)',
            boxShadow: 'var(--shadow-brutal)',
          }}
          onMouseEnter={() => { setPaused(true); setArrowsVisible(true); }}
          onMouseLeave={() => { setPaused(false); setArrowsVisible(false); }}
          onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            if (touchStart.current === null) return;
            const d = touchStart.current - e.changedTouches[0].clientX;
            if (Math.abs(d) > 48) go(d > 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          {/* BG crossfade */}
          <AnimatePresence mode="sync" initial={false}>
            <motion.div key={`bg-${slide.id}`}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration: 0.7 }}
              style={{ position:'absolute', inset:0, background:slide.bg, zIndex:0 }}
            >
              <div style={{ position:'absolute', inset:0, opacity:0.05,
                backgroundImage:'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)',
                backgroundSize:'14px 14px' }} />
              
              {/* Giant Ghost Backdrop Text */}
              <div style={{
                position: 'absolute', right: '-2rem', bottom: '-2rem',
                fontFamily: 'var(--font-sans)', fontSize: 'clamp(10rem, 25vw, 22rem)',
                fontWeight: 900, color: 'transparent', WebkitTextStroke: '6px rgba(255,255,255,0.15)',
                userSelect: 'none', pointerEvents: 'none', lineHeight: 0.8
              }}>
                02
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Content crossfade */}
          <AnimatePresence mode="sync" initial={false}>
            <motion.div key={`cnt-${slide.id}`}
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:0.55 }}
              style={{ position:'absolute', inset:0, zIndex:2,
                display:'flex', alignItems:'center',
                padding:'clamp(1.5rem,5vw,4.5rem)',
                justifyContent: slide.align==='center' ? 'center' : 'flex-start' }}
            >
              <div style={{ maxWidth:'520px', textAlign: slide.align==='center' ? 'center' : 'left' }}>
                <span style={{ display:'inline-block', fontFamily:'var(--font-sans)',
                  fontSize:'0.75rem', fontWeight:900, letterSpacing:'0.18em',
                  textTransform:'uppercase', color: '#fff', background: slide.accent,
                  border:`2px solid var(--color-ink)`, boxShadow: '4px 4px 0px rgba(0,0,0,0.5)', padding:'0.3rem 0.8rem', marginBottom:'1.5rem', transform: 'rotate(-2deg)' }}>
                  {slide.tag}
                </span>
                <h2 style={{ fontFamily:'var(--font-sans)',
                  fontSize:'clamp(2rem,4vw,3.5rem)', textTransform: 'uppercase',
                  fontWeight:900, color:'#fff', lineHeight:1, marginBottom:'1rem', textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}>
                  {slide.headline}
                </h2>
                <p style={{ fontFamily:'var(--font-sans)',
                  fontSize:'clamp(0.75rem,1.4vw,0.9rem)',
                  color:'rgba(255,255,255,0.65)', lineHeight:1.6, marginBottom:'1.4rem' }}>
                  {slide.subline}
                </p>
                <a href={slide.cta.href}
                  onClick={(e) => {
                    if (slide.cta.label === 'Enroll Now' || slide.cta.label === 'Reserve Your Seat' || slide.cta.label === 'Join Free') {
                      e.preventDefault();
                      window.dispatchEvent(new Event('open-login-modal'));
                    }
                  }}
                  style={{ display:'inline-block', fontFamily:'var(--font-sans)',
                    fontSize:'1rem', fontWeight:900, textTransform: 'uppercase',
                    color:'#fff', background:slide.accent, padding:'0.8rem 1.8rem',
                    textDecoration:'none', border:`4px solid var(--color-ink)`,
                    boxShadow: `6px 6px 0px rgba(0,0,0,0.5)`,
                    transition:'background 0.18s, transform 0.18s, box-shadow 0.18s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='var(--color-ink)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`6px 6px 0px rgba(0,0,0,0.8)`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background=slide.accent; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow=`6px 6px 0px rgba(0,0,0,0.5)`; }}>
                  {slide.cta.label}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div style={{ position:'absolute', bottom:'1.1rem', left:0, right:0,
            display:'flex', justifyContent:'center', gap:'0.4rem', zIndex:10 }}>
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                aria-label={`Slide ${i+1}`}
                style={{ height:'3px', padding:0, border:'none', cursor:'pointer',
                  width: i===current ? '2rem' : '0.5rem',
                  background: i===current ? slide.accent : 'rgba(255,255,255,0.35)',
                  transition:'width 0.35s ease, background 0.35s ease' }} />
            ))}
          </div>

          {/* Arrows */}
          <AnimatePresence>
            {arrowsVisible && <>
              <motion.button key="prev" aria-label="Previous slide"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                onClick={() => go(-1)} style={{ ...arrowBtn, left:'1rem', border: '3px solid var(--color-ink)', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(0,0,0,0.8)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(0,0,0,0.35)'; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
              </motion.button>
              <motion.button key="next" aria-label="Next slide"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                onClick={() => go(1)} style={{ ...arrowBtn, right:'1rem', border: '3px solid var(--color-ink)', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(0,0,0,0.8)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='rgba(0,0,0,0.35)'; }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
              </motion.button>
            </>}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

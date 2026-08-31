import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from './ParticleNetwork.jsx';

const SUBJECT_COLORS = {
  Physics:         { color: '#3A4E8C', bg: '#e6eaf5' },
  Chemistry:       { color: '#1E6644', bg: '#e2f0e9' },
  Mathematics:     { color: '#8C3520', bg: '#f5e8e5' },
  Biology:         { color: '#1A6E72', bg: '#e2f1f2' },
  'SSC & Banking': { color: '#8A6A10', bg: '#f5eedb' },
  English:         { color: '#8C4A5E', bg: '#f5e8ed' },
  Reasoning:       { color: '#3A4E8C', bg: '#e6eaf5' },
};
const BRAND = { yt:'#FF0000', ig:'#E1306C', li:'#0A66C2' };
const SOCIAL_ICONS = {
  yt: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/></svg>,
  ig: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>,
  li: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
};

const FACULTY = [
  { name:'Dr. Rajeev Sharma', subject:'Physics',       initials:'RS', credentials:'12 years FIITJEE · Head of Physics', bio:"Explains thermodynamics like it's gossip.", socials:['yt','ig','li'],
    quals: ['Ph.D. Applied Physics, IIT Delhi', 'Former Head of Physics, FIITJEE', 'Mentored 150+ Top 1000 JEE Rankers'], fullBio: "Dr. Sharma's unique teaching style bridges rigorous mathematics with intuitive physical phenomena. His famous 'Thermodynamics in a Coffee Cup' lecture has over 2M views.", courses: 4, badge: 'Top Educator' },
  { name:'Priya Menon',       subject:'Chemistry',     initials:'PM', credentials:'3× JEE Advanced qualifier', bio:'Occasionally grows plants mid-lecture.', socials:['yt','li'],
    quals: ['M.Sc. Chemistry, IISc Bangalore', 'Specializes in Organic Reaction Mechanisms'], fullBio: "Priya believes that chemistry is not about memorization, but visualization. She uses real-world models to demystify complex organic structures.", courses: 2 },
  { name:'Amit Khanna',       subject:'Mathematics',   initials:'AK', credentials:'IIT Bombay gold medalist', bio:'Will not accept "I forgot the formula."', socials:['yt','ig'],
    quals: ['B.Tech. Computer Science, IIT Bombay', 'University Gold Medalist', 'Author of "Advanced Calculus for JEE"'], fullBio: "Amit's classes are legendary for their intensity and focus on first principles. If you can survive his weekly problem sets, the actual exam feels like a breeze.", courses: 3 },
  { name:'Dr. Sunita Rao',    subject:'Biology',       initials:'SR', credentials:'AIIMS alumna · Ex-HOD Biology', bio:'Has named all her plants after cell organelles.', socials:['yt','li'],
    quals: ['MBBS, AIIMS New Delhi', '15+ years experience in NEET prep'], fullBio: "Dr. Rao treats biology not as a subject, but as a story of life. Her mnemonic techniques have helped thousands of students achieve perfect scores in NEET.", courses: 5 },
  { name:'Vikram Joshi',      subject:'SSC & Banking', initials:'VJ', credentials:'Cleared 4 government exams', bio:'Now helps you clear yours.', socials:['yt','ig','li'],
    quals: ['Cleared SSC CGL, SBI PO, IBPS PO', 'Quantitative Aptitude Expert', 'Developed the "30-Second Solve" method'], fullBio: "Vikram doesn't just teach math; he teaches time management. His methods focus on accuracy and speed, the two pillars of cracking competitive exams.", courses: 2, badge: 'New Batch' },
  { name:'Kavya Nair',        subject:'English',       initials:'KN', credentials:'MA English Lit · 9 yrs experience', bio:'Will personally judge your grammar. Lovingly.', socials:['ig','li'],
    quals: ['M.A. English Literature, JNU', 'Expert in Reading Comprehension'], fullBio: "Kavya's classes transform English from a confusing set of rules into an intuitive language. She's known for her dry wit and zero tolerance for basic grammar errors.", courses: 1 },
  { name:'Arjun Gupta',       subject:'Reasoning',     initials:'AG', credentials:'SSC CGL Top 100 · LR Specialist', bio:'Thinks in flowcharts. Dreams in Venn diagrams.', socials:['yt','li'],
    quals: ['SSC CGL Top 100 Ranker', 'Creator of the "Grid Matrix" approach'], fullBio: "Arjun treats reasoning puzzles like games. His systematic, flowchart-based approach breaks down even the most convoluted analytical reasoning questions into simple steps.", courses: 2 },
];
const N = FACULTY.length;
const CARD_W = 340;
const OFFSET = CARD_W + 24;

function relPos(idx, cur) {
  let r = idx - cur;
  if (r >  N / 2) r -= N;
  if (r < -N / 2) r += N;
  return r;
}

function slotAnimate(rp, isExpanded) {
  const a = Math.abs(rp);
  if (a === 0) return { x: 0, scale: 1, opacity: 1, zIndex: 5 };
  if (a === 1) return { x: rp * OFFSET, scale: 0.78, opacity: isExpanded ? 0.15 : 0.58, zIndex: 3 };
  return { x: rp * OFFSET * 1.12, scale: 0.65, opacity: 0, zIndex: 1 };
}

function Card({ person, index, isCenter, isExpanded, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const sc = SUBJECT_COLORS[person.subject] || { color:'#888', bg:'#f0f0f0' };
  
  return (
    <div
      onClick={isCenter ? onToggle : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${CARD_W}px`, background:'var(--color-paper)',
        border:'4px solid var(--color-ink)',
        cursor: isCenter ? 'pointer' : 'pointer',
        userSelect:'none', display:'flex', flexDirection:'column',
        boxShadow: isCenter ? (isExpanded ? `0 24px 64px rgba(0,0,0,0.15), 12px 12px 0px var(--color-ink)` : `0 16px 48px rgba(0,0,0,0.10), 12px 12px 0px var(--color-ink)`) : 'none',
        transition:'box-shadow 0.48s cubic-bezier(0.16,1,0.3,1)',
        height: 'auto',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ height:'4px', background: sc.color, flexShrink:0 }} />
      <div style={{ height: isCenter ? (isExpanded ? '160px' : '220px') : '220px', background: isCenter ? sc.bg : '#f0ede8',
        transition:'background 0.45s, height 0.48s cubic-bezier(0.16,1,0.3,1)', display:'flex', alignItems:'center', justifyContent:'center',
        position:'relative', overflow:'hidden', flexShrink:0 }}>
        
        {/* Tiny index in corner */}
        <div style={{ position: 'absolute', top: '0.8rem', right: '1rem', fontFamily: 'var(--font-serif)', fontSize: '0.75rem', fontWeight: 500, color: sc.color, opacity: 0.6, zIndex: 10 }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <div style={{
          width: isCenter ? (isExpanded ? '72px' : '96px') : '80px', 
          height: isCenter ? (isExpanded ? '72px' : '96px') : '80px', 
          borderRadius:'50%',
          background: isCenter ? sc.color : '#c0bab2',
          transition:'background 0.45s, width 0.48s cubic-bezier(0.16,1,0.3,1), height 0.48s cubic-bezier(0.16,1,0.3,1)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--font-sans)', fontSize: isCenter ? (isExpanded ? '1.5rem' : '2.5rem') : '1.5rem', fontWeight:900, color:'#fff', border: '3px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)',
        }}>{person.initials}</div>

        {/* Hover affordance when collapsed */}
        <AnimatePresence>
          {isCenter && !isExpanded && hovered && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
              style={{ position: 'absolute', bottom: '1rem', background: 'rgba(0,0,0,0.6)', color: '#fff',
                padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.65rem', fontFamily: 'var(--font-sans)',
                fontWeight: 500, backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Click to know more
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {person.badge && (
        <div style={{
          position: 'absolute', top: '130px', left: '-10px',
          background: 'var(--color-accent)', color: 'var(--color-paper)',
          padding: '0.4rem 0.8rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
          fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
          transform: 'rotate(-5deg)', boxShadow: '4px 4px 0px var(--color-ink)',
          zIndex: 10, border: '2px solid var(--color-ink)',
        }}>
          {person.badge}
        </div>
      )}

      <div style={{ padding:'1.25rem', flex:1, display:'flex', flexDirection:'column' }}>
        <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'1.4rem', fontWeight:900, textTransform: 'uppercase',
          color:'var(--color-ink)', marginBottom:'0.4rem' }}>{person.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{
            display:'inline-block', fontFamily:'var(--font-sans)', fontSize:'0.62rem',
            fontWeight:800, letterSpacing:'0.08em', textTransform:'uppercase',
            background:sc.color, color: '#fff', padding:'0.3rem 0.6rem',
            border:`2px solid var(--color-ink)`, marginBottom: '1rem', boxShadow: '2px 2px 0px var(--color-ink)',
          }}>{person.subject}</span>
          
          <div style={{
            display: 'grid',
            gridTemplateRows: (isCenter && isExpanded) ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.48s cubic-bezier(0.16,1,0.3,1)',
          }}>
            <div style={{ overflow: 'hidden' }}>
              <span style={{ fontFamily:'var(--font-sans)', fontSize:'0.75rem', fontWeight:900, color:'var(--color-ink)', background: 'var(--color-yellow)', padding: '0.2rem 0.5rem', border: '1px solid var(--color-ink)', boxShadow: '2px 2px 0px var(--color-ink)' }}>
                {person.courses} Courses →
              </span>
            </div>
          </div>
        </div>

        {/* Details section */}
        {isCenter && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {/* Credentials Row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-faint)" strokeWidth="1.5" style={{ marginTop: '0.1rem', flexShrink: 0 }}>
                <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.72rem', color:'var(--color-ink-muted)', lineHeight:1.4 }}>
                {person.credentials}
              </p>
            </div>
            
            {/* Short Bio (always visible) */}
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.82rem', fontWeight:400,
              color:'var(--color-ink-muted)', lineHeight:1.6, fontStyle:'italic' }}>
              {person.bio}
            </p>

            {/* Extended Details (animated with CSS grid) */}
            <div style={{
              display: 'grid',
              gridTemplateRows: isExpanded ? '1fr' : '0fr',
              transition: 'grid-template-rows 0.48s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{ overflow: 'hidden', opacity: isExpanded ? 1 : 0, transition: 'opacity 0.48s cubic-bezier(0.16,1,0.3,1)' }}>
                <div style={{ paddingTop: '1.25rem' }}>
                  <ul style={{ margin: '0 0 1rem 1.25rem', padding: 0, color: 'var(--color-ink-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', lineHeight: 1.6 }}>
                    {person.quals.map((q, i) => <li key={i}>{q}</li>)}
                  </ul>
                  <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.82rem', fontWeight:400,
                    color:'var(--color-ink-muted)', lineHeight:1.6, marginBottom:'0.5rem' }}>
                    {person.fullBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Row */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ display:'flex', gap:'0.45rem' }} onClick={e => e.stopPropagation()}>
                {person.socials.map(s => (
                  <a key={s} href="#" aria-label={s}
                    style={{ width:'1.75rem', height:'1.75rem', border:'1px solid var(--color-border)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'var(--color-ink-muted)', textDecoration:'none',
                      transition:'background 0.15s, border-color 0.15s, color 0.15s' }}
                    onMouseEnter={e=>{ const c=BRAND[s]||'#333'; e.currentTarget.style.background=c; e.currentTarget.style.borderColor=c; e.currentTarget.style.color='#fff'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='var(--color-border)'; e.currentTarget.style.color='var(--color-ink-muted)'; }}
                  >{SOCIAL_ICONS[s]}</a>
                ))}
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.48s cubic-bezier(0.16,1,0.3,1)',
              }}>
                <div style={{ overflow: 'hidden' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggle(); }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--color-ink-faint)', display: 'flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15l-6-6-6 6"/></svg>
                    Collapse
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FacultyCarousel() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const pausedRef = useRef(false);
  const touchStart = useRef(null);

  useEffect(() => {
    pausedRef.current = hovered || expanded;
  }, [hovered, expanded]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = setInterval(() => {
      if (!pausedRef.current) setCurrent(c => (c + 1) % N);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const go = (dir) => {
    setExpanded(false);
    setCurrent(c => (c + dir + N) % N);
  };

  const handleCardClick = (rp, idx) => {
    if (rp !== 0) {
      setExpanded(false);
      setCurrent(idx);
    }
  };

  const visibleCards = FACULTY.map((person, idx) => ({
    person, idx, rp: relPos(idx, current),
  })).filter(c => Math.abs(c.rp) <= 2);

  return (
    <section id="faculty" className="hairline-bottom" style={{ background:'transparent', position:'relative', overflow:'hidden' }}>
      <ParticleNetwork density={20000} />
      
      {/* Giant Ghost Text Background (Maximalist typography texture) */}
      <div className="faculty-ghost-text" style={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(12rem, 25vw, 24rem)',
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: '6px var(--color-ink)',
        opacity: 0.1,
        userSelect: 'none',
        pointerEvents: 'none',
        lineHeight: 0.8,
        zIndex: 0
      }}>
        FACULTY
      </div>

      <div className="container" style={{ paddingTop:'var(--section-py)', position:'relative', zIndex: 10 }}>
        <div className="faculty-header" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'2.25rem' }}>
          <div style={{ position: 'relative', background: 'var(--color-yellow)', padding: '1rem', border: '4px solid var(--color-ink)', boxShadow: '6px 6px 0px var(--color-ink)', transform: 'rotate(-2deg)' }}>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.85rem', fontWeight:900,
              letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--color-ink)', marginBottom:'0.5rem' }}>Who teaches</p>
            <h2 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(2.5rem,5vw,4rem)', textTransform: 'uppercase',
              fontWeight:900, lineHeight:1, color:'var(--color-ink)', position:'relative', display:'inline-block' }}>
              Meet Your Educators
              
              {/* Handwritten Marginalia Annotation */}
              <span className="faculty-marginalia" style={{
                position: 'absolute',
                top: '-1.2rem',
                right: '-7rem',
                fontFamily: 'var(--font-script)',
                fontSize: '1.4rem',
                color: 'var(--color-accent)',
                transform: 'rotate(-8deg)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none'
              }}>
                (top 1% mentors!)
              </span>
            </h2>
          </div>
          <div className="desktop-nav-buttons" style={{ display:'flex', gap:'0.5rem' }}>
            {[-1,1].map(dir => (
              <button key={dir} onClick={() => go(dir)}
                aria-label={dir === -1 ? 'Previous educator' : 'Next educator'}
                style={{ width:'3.5rem', height:'3.5rem', border:'4px solid var(--color-ink)',
                  background:'var(--color-yellow)', color:'var(--color-ink)', cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', boxShadow: '4px 4px 0px var(--color-ink)',
                  transition:'background 0.15s, color 0.15s' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='var(--color-ink)'; e.currentTarget.style.color='var(--color-paper)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.background='var(--color-paper)'; e.currentTarget.style.color='var(--color-ink)'; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {dir === -1 ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Coverflow track */}
      <div className="faculty-track"
        style={{ position:'relative', height: expanded ? '760px' : '560px', overflow:'hidden',
          display:'flex', alignItems:'center', justifyContent:'center',
          paddingBottom:'var(--section-py)', transition: 'height 0.48s cubic-bezier(0.16, 1, 0.3, 1)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={e => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStart.current === null) return;
          const d = touchStart.current - e.changedTouches[0].clientX;
          if (Math.abs(d) > 40) go(d > 0 ? 1 : -1);
          touchStart.current = null;
        }}
      >
        {visibleCards.map(({ person, idx, rp }) => (
          <motion.div
            key={idx}
            style={{ position:'absolute' }}
            animate={slotAnimate(rp, expanded)}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleCardClick(rp, idx)}
          >
            <Card person={person} index={idx} isCenter={rp === 0} isExpanded={rp === 0 && expanded} onToggle={() => setExpanded(e => !e)} />
          </motion.div>
        ))}

        {/* Mobile Swipe Hint */}
        <div className="mobile-swipe-hint" style={{ 
          display: 'none', position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', 
          fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', 
          color: 'var(--color-ink)', background: 'var(--color-yellow)', border: '2px solid var(--color-ink)', 
          padding: '0.4rem 1rem', boxShadow: '4px 4px 0px var(--color-ink)', zIndex: 20, 
          pointerEvents: 'none', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap'
        }}>
          ← Swipe to explore →
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display:'flex', justifyContent:'center', gap:'0.4rem',
        paddingBottom:'var(--section-py)' }}>
        {FACULTY.map((_, i) => (
          <button key={i} onClick={() => { setExpanded(false); setCurrent(i); }}
            aria-label={`Go to educator ${i+1}`}
            style={{ width: i===current ? '1.75rem' : '0.45rem', height:'3px',
              padding:0, border:'none', cursor:'pointer',
              background: i===current ? 'var(--color-accent)' : 'var(--color-border-strong)',
              transition:'width 0.3s ease, background 0.3s ease' }}
          />
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          #faculty .faculty-ghost-text { display: none; }
          .faculty-header .desktop-nav-buttons { display: none !important; }
          .mobile-swipe-hint { display: flex !important; }
          .faculty-header { flex-direction: column; align-items: flex-start !important; gap: 1.5rem; }
          .faculty-marginalia { right: 0 !important; top: 110% !important; }
        }
      `}</style>
    </section>
  );
}

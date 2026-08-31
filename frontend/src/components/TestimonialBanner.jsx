import { motion, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce.js';
import { useState, useEffect } from 'react';

const AVATAR_COLORS = ['#A0442A','#4D5F8A','#2D6B50','#9A7A1A','#9B6070'];

const ALL_TESTIMONIALS = [
  { id: 1, quote: "Meowed through NEET biology. Slept through thermodynamics. Got vibes. 10/10 would nap again.", name: 'Whiskers', tag: 'NEET Aspirant — Mostly Napping', initials: '🐱', color: '#9A7A1A', isJoke: true },
  { id: 2, quote:"I prepared for NEET in a Tier-3 city with no access to good coaching. Strivers was my coaching. Scored 680/720.", name:'Priya Nair', tag:'NEET 2024 — 680/720', initials:'PN', color:'#2D6B50' },
  { id: 3, quote:"The live sessions are genuinely different. Educators actually know their students. I went from 60% to 98 percentile in JEE within a year.", name:'Rohan Mehta', tag:'JEE Advanced — IIT Delhi', initials:'RM', color:'#4D5F8A' },
  { id: 4, quote: "Strivers didn't just teach me concepts — it gave me a method. I cleared SSC CGL in my first attempt after 6 months with their structured courses.", name: 'Anjali Sharma', tag: 'SSC CGL — AIR 312', initials: 'AS', color: '#A0442A' },
];

function Avatar({ initials, color, isJoke }) {
  return (
    <div style={{
      width:'2.25rem', height:'2.25rem', borderRadius:'50%',
      background: isJoke ? '#f0ede8' : color,
      color: isJoke ? color : 'var(--color-paper)',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:'var(--font-sans)', fontSize: isJoke ? '1.1rem' : '0.65rem',
      fontWeight:600, flexShrink:0,
      border: isJoke ? `1px solid ${color}44` : 'none',
    }}>{initials}</div>
  );
}

function TestimonialCard({ card, index, total, swipedLogs, setSwipedLogs }) {
  const logIndex = swipedLogs.findIndex(l => l.id === card.id);
  const isSwiped = logIndex !== -1;
  const isFront = index === total - 1 - swipedLogs.length;
  const offset = isSwiped ? 0 : (total - 1 - swipedLogs.length - index);

  const targetX = isSwiped ? swipedLogs[logIndex].x : 0;
  const targetY = isSwiped ? swipedLogs[logIndex].y : offset * 12;
  const targetRot = isSwiped ? swipedLogs[logIndex].rotate : (offset % 2 === 0 ? -1.5 : 2);

  const x = useMotionValue(0);
  const y = useMotionValue(offset * 12);
  const rotate = useMotionValue(offset % 2 === 0 ? -1.5 : 2);

  useEffect(() => {
    // Only animate if the current value is noticeably different from target (avoids locking after drag)
    if (Math.abs(x.get() - targetX) > 0.5) animate(x, targetX, { type: 'spring', stiffness: 240, damping: 26, mass: 0.8 });
    if (Math.abs(y.get() - targetY) > 0.5) animate(y, targetY, { type: 'spring', stiffness: 240, damping: 26, mass: 0.8 });
    if (Math.abs(rotate.get() - targetRot) > 0.5) animate(rotate, targetRot, { type: 'spring', stiffness: 240, damping: 26, mass: 0.8 });
  }, [targetX, targetY, targetRot]);

  const handleDragEnd = (e, info) => {
    if (!isSwiped) {
      // Swipe threshold check
      if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
        let newX, newY, newRotate;
        if (swipedLogs.length === 0) {
          newX = -450; newY = 20; newRotate = -6;
        } else {
          const isRightSwipe = info.velocity.x > 0 || (info.velocity.x === 0 && info.offset.x > 0);
          const baseX = isRightSwipe ? (250 + Math.random() * 200) : (-250 - Math.random() * 200);
          
          const rawX = baseX + (info.velocity.x * 0.03);
          const rawY = info.offset.y + (info.velocity.y * 0.04) + (Math.random() * 100 - 50);
          
          newX = rawX;
          newY = rawY;
          newRotate = newX * 0.02 + (Math.random() * 20 - 10);
        }
        setSwipedLogs(prev => [...prev, { id: card.id, x: newX, y: newY, rotate: newRotate }]);
      } else {
        // Snap back to stack position smoothly
        animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
        animate(y, offset * 12, { type: 'spring', stiffness: 300, damping: 20 });
        animate(rotate, offset % 2 === 0 ? -1.5 : 2, { type: 'spring', stiffness: 300, damping: 20 });
      }
    } else {
      // Repositioning a nailed card — allows infinite drag/repositioning ('n' tries)
      x.stop();
      y.stop();
      rotate.stop();
      
      const curX = x.get() + (info.velocity.x * 0.02);
      const curY = y.get() + (info.velocity.y * 0.02);
      const newX = curX;
      const newY = curY;
      const newRotate = rotate.get();

      x.set(newX);
      y.set(newY);

      setSwipedLogs(prev => prev.map(log => log.id === card.id ? { ...log, x: newX, y: newY, rotate: newRotate } : log));
    }
  };

  return (
    <motion.div
      drag={isFront || isSwiped ? true : false}
      dragConstraints={false}
      onDragEnd={(isFront || isSwiped) ? handleDragEnd : undefined}
      whileDrag={{ cursor: 'grabbing', scale: 1.05, zIndex: 100, boxShadow: `12px 12px 0px ${card.color}44, 0 32px 64px rgba(0,0,0,0.15)` }}
      style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, margin: '0 auto',
        width: '100%', maxWidth: '440px',
        x, y, rotate,
        zIndex: isSwiped ? 10 + logIndex : 50 + index,
        border: '4px solid var(--color-ink)',
        cursor: isFront || isSwiped ? 'grab' : 'auto',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        height: '100%', minHeight: '380px',
        transformOrigin: 'center center',
        pointerEvents: 'auto',
      }}
      animate={{
        scale: isSwiped ? 0.75 : 1 - offset * 0.04,
        padding: isSwiped ? '0.8rem 0.8rem 2rem 0.8rem' : '2.5rem',
        backgroundColor: isSwiped ? '#ffffff' : 'var(--color-yellow)',
        boxShadow: isSwiped 
          ? `8px 8px 0px rgba(0,0,0,0.1)` 
          : (isFront ? `12px 12px 0px var(--color-ink)` : `4px 4px 0px var(--color-ink)`),
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.8 }}
    >
      {/* Washi Tape (Maximalist Detail) */}
      <motion.div
        animate={{ opacity: isSwiped ? 0.8 : 0 }}
        style={{
          position: 'absolute', top: '-12px', right: '20px',
          width: '60px', height: '24px',
          background: 'rgba(255, 235, 150, 0.6)',
          backdropFilter: 'blur(2px)',
          transform: 'rotate(8deg)',
          zIndex: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      />
      {/* Polaroid frame internal styling for swiped state */}
      <motion.div 
        animate={{ 
           backgroundColor: isSwiped ? 'var(--color-paper)' : 'transparent',
           padding: isSwiped ? '1.5rem' : '0rem',
           border: isSwiped ? '4px solid var(--color-ink)' : 'none',
        }}
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <motion.svg animate={{ opacity: isSwiped ? 0 : 0.14 }} width="32" height="24" viewBox="0 0 48 36" style={{ marginBottom:'1.25rem' }}>
          <path d="M0 36V21.6C0 9.6 7.2 2.4 21.6 0l2.4 4.8C14.4 6.4 9.6 11.2 9.6 18H21.6V36H0zm26.4 0V21.6C26.4 9.6 33.6 2.4 48 0l2.4 4.8C40.8 6.4 36 11.2 36 18H48V36H26.4z" fill="var(--color-ink)"/>
        </motion.svg>
        
        <blockquote style={{ fontFamily:'var(--font-sans)', fontSize: 'clamp(1.2rem,2.5vw,1.6rem)', fontWeight:900, textTransform:'uppercase', color:'var(--color-ink)', flex:1, lineHeight:1.1 }}>"{card.quote}"</blockquote>
        
        <div style={{ display:'flex', alignItems:'center', gap: '0.8rem', marginTop: '1.5rem', background: 'var(--color-ink)', padding: '0.8rem', color: 'var(--color-paper)' }}>
          <Avatar initials={card.initials} color={card.color} isJoke={card.isJoke} />
          <div>
            <p style={{ fontFamily:'var(--font-sans)', fontSize: '1rem', fontWeight:900, color:'var(--color-yellow)' }}>{card.name}</p>
            <motion.p animate={{ opacity: isSwiped ? 0 : 1, height: isSwiped ? 0 : 'auto' }} style={{ fontFamily:'var(--font-sans)', fontSize:'0.75rem', fontWeight:700, color:'#fff', marginTop:'0.15rem' }}>{card.tag}</motion.p>
          </div>
        </div>
      </motion.div>

      {/* Nail / Pin */}
      <motion.div 
        animate={{ opacity: isSwiped ? 1 : 0 }} 
        style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-accent)', border: '4px solid var(--color-ink)', boxShadow: '4px 4px 0px rgba(0,0,0,0.5)', zIndex: 10 }}
      >
        <div style={{ position: 'absolute', top: '1px', left: '1px', width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />
      </motion.div>
    </motion.div>
  );
}

export default function TestimonialBanner() {
  const [ref, inView] = useInViewOnce({ threshold:0.1 });
  const [swipedLogs, setSwipedLogs] = useState([]);

  const swipe = () => {
    if (swipedLogs.length >= ALL_TESTIMONIALS.length) return;
    const card = ALL_TESTIMONIALS[ALL_TESTIMONIALS.length - 1 - swipedLogs.length];
    let newX, newY, newRotate;
    if (swipedLogs.length === 0) {
      newX = -450; newY = 20; newRotate = -6;
    } else {
      // Alternate throwing left and right when using the button
      const isRight = swipedLogs.length % 2 !== 0;
      newX = isRight ? (300 + Math.random() * 200) : (-300 - Math.random() * 200);
      newY = -50 + Math.random() * 200;
      newRotate = newX * 0.02 + (Math.random() * 20 - 10);
    }
    setSwipedLogs(prev => [...prev, { id: card.id, x: newX, y: newY, rotate: newRotate }]);
  };

  const isTextHidden = swipedLogs.length > 0;

  return (
    <section id="testimonials" ref={ref} className="hairline-bottom" style={{ background:'transparent', position:'relative', minHeight: '900px', overflow: 'hidden' }}>
      
      {/* Maximalist Confetti & Rubber Stamp Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
        
        {/* Giant Infinite Marquee */}
        <motion.div 
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          style={{
            position: 'absolute', top: '35%', left: 0, width: '200%',
            fontFamily: 'var(--font-sans)', fontSize: 'clamp(8rem, 16vw, 12rem)',
            fontWeight: 900, color: 'transparent', WebkitTextStroke: '4px var(--color-ink)', opacity: 0.1,
            whiteSpace: 'nowrap', textTransform: 'uppercase', lineHeight: 1
          }}
        >
          DON'T JUST TAKE OUR WORD FOR IT — READ THE REVIEWS — DON'T JUST TAKE OUR WORD FOR IT — READ THE REVIEWS —
        </motion.div>
        {/* Rubber Stamp Badge */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '6%',
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          border: '2px dashed var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-18deg)',
          opacity: 0.25,
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.55rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          textAlign: 'center',
          padding: '0.5rem',
          boxShadow: 'inset 0 0 0 4px transparent'
        }}>
          ★ 100% VERIFIED ★ REVIEWS FROM RANKERS
        </div>

        <div style={{ position: 'absolute', top: '15%', left: '10%', opacity: 0.15, transform: 'rotate(15deg)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div style={{ position: 'absolute', bottom: '20%', right: '8%', opacity: 0.2, transform: 'rotate(-25deg)' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink)"><circle cx="12" cy="12" r="10"/></svg>
        </div>
        <div style={{ position: 'absolute', top: '40%', right: '2%', opacity: 0.15, transform: 'rotate(45deg)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"/></svg>
        </div>
      </div>

      <div 
        className="container section-py" 
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '3rem', minHeight: '900px', position: 'relative', zIndex: 1 }}
      >
        
        {/* Top Side: Copy & Marginalia */}
        <div 
          style={{ position: 'relative', whiteSpace: 'normal', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 20 }}
        >
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" style={{ flexShrink:0 }}>
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <span style={{ fontFamily:'var(--font-sans)', fontSize:'0.85rem', fontWeight:900, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--color-ink)', background:'var(--color-secondary)', padding:'0.5rem 1rem', border:'2px solid var(--color-ink)', transform:'rotate(-2deg)', boxShadow:'4px 4px 0px var(--color-ink)' }}>Loved by students</span>
          </div>

          <h2 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(3.5rem,6.5vw,5rem)', fontWeight:900, lineHeight:0.95, color:'var(--color-ink)', marginBottom: '1.5rem', position: 'relative', textTransform:'uppercase', textShadow:'4px 4px 0px var(--color-secondary)' }}>
            Words from those who made it.
            
            {/* Handwritten Marginalia */}
            <motion.div 
              initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
              animate={inView && !isTextHidden ? { opacity: 1, rotate: -10, scale: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              style={{ position: 'absolute', top: '-1.5rem', right: '10%', fontFamily: 'var(--font-script)', fontSize: '1.75rem', color: 'var(--color-accent)', zIndex: 10 }}>
              (and one cat)
              <svg width="30" height="30" viewBox="0 0 40 40" style={{ position: 'absolute', bottom: '-15px', left: '-20px', overflow: 'visible', stroke: 'currentColor', strokeWidth: 1.5, fill: 'none' }}>
                <path d="M 30,5 Q 10,15 15,35" strokeLinecap="round" />
                <path d="M 5,25 L 15,35 L 25,25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </h2>

          <p style={{ fontFamily:'var(--font-sans)', fontSize:'1rem', color:'var(--color-ink-muted)', lineHeight:1.7, maxWidth:'36ch', marginBottom: '2.5rem', whiteSpace: 'normal' }}>
            From tier-3 cities to top-tier institutes, our students are proving that with the right guidance, any exam is crackable.
          </p>

          {/* Accessible buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={swipe} style={{ width: 'auto', pointerEvents: 'auto', padding: '1rem 2rem', border: '4px solid var(--color-ink)', background: 'var(--color-yellow)', boxShadow: '6px 6px 0px var(--color-ink)', fontWeight: 900, fontSize: '1rem', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-ink)', transition: 'background 0.2s, transform 0.2s' }} aria-label="Next testimonial" onMouseEnter={e => { e.currentTarget.style.background='var(--color-accent)'; e.currentTarget.style.transform='translateY(-2px)'; }} onMouseLeave={e => { e.currentTarget.style.background='var(--color-yellow)'; e.currentTarget.style.transform='none'; }}>
              Toss a review
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>

        {/* Bottom / Centered: Draggable Deck */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', height: '400px', width: '100%', maxWidth: '440px', margin: '0 auto', perspective: '1000px', zIndex: 10 }}>
          
          <motion.div 
            animate={{ opacity: swipedLogs.length < ALL_TESTIMONIALS.length ? 1 : 0 }} 
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--color-ink-faint)', letterSpacing: '0.1em', textTransform: 'uppercase', zIndex: 0 }}
          >
            Drag to browse &rarr;
          </motion.div>

          {ALL_TESTIMONIALS.map((card, i) => (
            <TestimonialCard key={card.id} card={card} index={i} total={ALL_TESTIMONIALS.length} swipedLogs={swipedLogs} setSwipedLogs={setSwipedLogs} />
          ))}

        </motion.div>
      </div>

      <style>{`
        #testimonials .container { text-align: center; }
        #testimonials p { margin-left: auto; margin-right: auto; }
      `}</style>
    </section>
  );
}

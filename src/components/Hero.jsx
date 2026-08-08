import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button.jsx';
import { IconPlay } from '../assets/icons/Icons.jsx';
import ParticleNetwork from './ParticleNetwork.jsx';

const headlineWords = ['Learn', 'like', 'a', 'Strivers.'];

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.08 + i * 0.09, duration: 0.55, ease: [0.16,1,0.3,1] },
  }),
};

// Easter egg pool — picked randomly on mount
const EASTER_EGGS = [
  'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',           // classic rickroll
  'https://www.youtube.com/embed/jofNR_WkoCE?autoplay=1',           // cat falls asleep studying
  'https://www.youtube.com/embed/XqZsoesa55w?autoplay=1',           // baby shark (you deserve this)
];

// Tooltip pool — shown on hover of video thumbnail, rotated
const TOOLTIPS = [
  '94% chance this is actually about integration by parts.',
  'Warning: may cause sudden motivation. Side effects include studying.',
  'Certified not a boring lecture. Results may vary.',
];

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Pick easter egg based on click count cycling through pool
  const eggUrl = EASTER_EGGS[clickCount % EASTER_EGGS.length];
  const tooltip = TOOLTIPS[Math.floor(Math.random() * TOOLTIPS.length)];

  const handlePlayClick = () => {
    setClickCount(c => c + 1);
    setVideoOpen(true);
  };

  return (
    <section
      id="hero"
      style={{ background: '#fdfbf7', paddingTop: '5rem', paddingBottom: '0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Maximalist background blobs & patterns */}
      <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(193,68,14,0.15) 0%, rgba(193,68,14,0.05) 40%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(242,205,96,0.2) 0%, rgba(242,205,96,0.05) 40%, transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(26,26,26,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(26,26,26,0.05) 2px, transparent 2px)', backgroundSize: '40px 40px', zIndex: 0 }} />

      <ParticleNetwork />
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ delay: 0.05, duration: 0.4, type: 'spring' }}
          style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', paddingTop: '3rem',
            background: 'var(--color-accent)', color: '#fff', padding: '0.5rem 1rem',
            border: '2px solid var(--color-ink)', boxShadow: '4px 4px 0px var(--color-ink)'
          }}
        >
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 800,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>India's Premier EdTech Channel 🚀</span>
        </motion.div>

        {/* Two-column grid */}
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'end' }}>
          {/* Left */}
          <div>
            <h1 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(3.5rem,8.5vw,7.5rem)',
              fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em',
              color: 'var(--color-ink)', marginBottom: '1.5rem',
              textTransform: 'uppercase',
              textShadow: '4px 4px 0px var(--color-accent), 8px 8px 0px rgba(0,0,0,0.1)'
            }}>
              {headlineWords.map((word, i) => {
                const isStrivers = word === 'Strivers.';
                return (
                  <motion.span key={i} custom={i} variants={wordVariants} initial="hidden" animate="visible"
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      color: isStrivers ? 'transparent' : 'inherit',
                      backgroundImage: isStrivers ? 'linear-gradient(45deg, #FF512F 0%, #F09819 51%, #FF512F 100%)' : 'none',
                      backgroundSize: isStrivers ? '200% auto' : 'auto',
                      WebkitBackgroundClip: isStrivers ? 'text' : 'border-box',
                      WebkitTextStroke: isStrivers ? '2px var(--color-ink)' : '0px',
                      marginRight: i < headlineWords.length - 1 ? '0.3em' : 0,
                    }}>
                    {word}
                    {isStrivers && (
                      <motion.svg 
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        viewBox="0 0 200 100" 
                        style={{
                          position: 'absolute',
                          top: '40%',
                          left: '50%',
                          width: '130%',
                          height: '140%',
                          transform: 'translate(-50%, -50%) rotate(-4deg)',
                          pointerEvents: 'none',
                          zIndex: -1,
                          overflow: 'visible'
                        }}
                      >
                        <motion.path 
                          d="M10,50 Q40,5 100,10 T190,50 Q180,95 100,90 T10,50" 
                          fill="none" 
                          stroke="var(--color-ink)" 
                          strokeWidth="8" 
                          strokeLinecap="round" 
                          opacity="1" 
                        />
                        <motion.path 
                          d="M15,48 Q45,2 95,8 T185,55 Q175,98 105,88 T20,52" 
                          fill="none" 
                          stroke="#f2cd60" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          opacity="1" 
                        />
                      </motion.svg>
                    )}
                  </motion.span>
                );
              })}
            </h1>

            <motion.p initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.5,duration:0.4 }}
              style={{ fontFamily:'var(--font-sans)',fontSize:'1.2rem',fontWeight:600,lineHeight:1.6,
                color:'var(--color-ink)',maxWidth:'36ch',marginBottom:'2rem',
                borderLeft: '4px solid var(--color-accent)', paddingLeft: '1rem' }}>
              From JEE &amp; NEET to Government exams — expert-led courses, live sessions,
              and a community of driven learners.
            </motion.p>

            <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.62,duration:0.4 }}
              style={{ display:'flex',gap:'1rem',flexWrap:'wrap',marginBottom:'2.5rem', position: 'relative' }}>
              <Button href="#community" variant="primary" id="hero-join-btn" style={{
                fontSize: '1rem', padding: '0.8rem 1.5rem', border: '2px solid var(--color-ink)',
                boxShadow: '6px 6px 0px var(--color-ink)', transform: 'translateY(-2px)'
              }}>Join Us Free</Button>
              <Button href="#courses" variant="ghost" id="hero-explore-btn" style={{
                fontSize: '1rem', padding: '0.8rem 1.5rem', border: '2px solid var(--color-ink)',
                boxShadow: '4px 4px 0px rgba(0,0,0,0.2)', background: '#fff'
              }}>Explore Courses</Button>
              
              {/* Maximalist Sticker */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  position: 'absolute',
                  top: '-1.5rem',
                  left: '9rem',
                  background: '#f2cd60',
                  color: 'var(--color-ink)',
                  padding: '0.3rem 0.8rem',
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  transform: 'rotate(12deg)',
                  boxShadow: '6px 6px 0px var(--color-ink)',
                  border: '2px solid var(--color-ink)',
                  pointerEvents: 'none',
                  zIndex: 20
                }}
              >
                Seats filling fast!
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.78,duration:0.4 }}
              style={{ display:'flex',alignItems:'center',gap:'0.875rem' }}>
              <div style={{ display:'flex' }}>
                {['A','R','S','P'].map((l,i) => (
                  <div key={i} style={{
                    width:'2rem',height:'2rem',borderRadius:'50%',
                    background:'var(--color-ink)',color:'var(--color-paper)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:'0.65rem',fontWeight:600,
                    border:'2px solid var(--color-paper)',
                    marginLeft: i > 0 ? '-0.5rem' : 0,
                  }}>{l}</div>
                ))}
              </div>
              <p style={{ fontSize:'0.8rem',color:'var(--color-ink-muted)' }}>
                <strong style={{ color:'var(--color-ink)' }}>50,000+</strong> students preparing daily
              </p>
            </motion.div>
          </div>

          {/* Right — video card */}
          <motion.div
            initial={{ opacity:0,scale:0.96 }} 
            animate={{ opacity:1,scale:1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { delay:0.45, duration:0.65, ease:[0.16,1,0.3,1] },
              scale: { delay:0.45, duration:0.65, ease:[0.16,1,0.3,1] },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ position:'relative',paddingBottom:'3rem' }}
          >
            {/* Tooltip on hover */}
            <div
              style={{ position:'relative' }}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            >
              {tooltipVisible && (
                <div style={{
                  position:'absolute',bottom:'calc(100% + 0.5rem)',left:'50%',transform:'translateX(-50%)',
                  background:'var(--color-ink)',color:'var(--color-paper)',
                  fontFamily:'var(--font-sans)',fontSize:'0.72rem',lineHeight:1.5,
                  padding:'0.5rem 0.75rem',whiteSpace:'nowrap',zIndex:10,
                  pointerEvents:'none',
                }}>
                  {tooltip}
                  <span style={{ position:'absolute',top:'100%',left:'50%',transform:'translateX(-50%)',
                    width:0,height:0,borderLeft:'5px solid transparent',borderRight:'5px solid transparent',
                    borderTop:'5px solid var(--color-ink)',display:'block' }} />
                </div>
              )}

              <div style={{
                position:'relative',aspectRatio:'16/10',
                border:'4px solid var(--color-ink)',
                boxShadow: '12px 12px 0px var(--color-accent)',
                overflow:'hidden',background:'#1a1a1a', transform: 'rotate(1.5deg)'
              }}>
                <div style={{
                  position:'absolute',inset:0,
                  background:'linear-gradient(135deg,#1A1A1A 0%,#2d2520 55%,#3d2010 100%)',
                  display:'flex',flexDirection:'column',justifyContent:'flex-end',
                  padding:'1.5rem',
                }}>
                  <div style={{
                    position:'absolute',inset:0,opacity:0.07,
                    backgroundImage:'repeating-linear-gradient(45deg,#C1440E 0,#C1440E 1px,transparent 0,transparent 50%)',
                    backgroundSize:'14px 14px',
                  }} />
                  <span style={{ position:'relative',fontFamily:'var(--font-sans)',fontSize:'0.65rem',
                    fontWeight:600,letterSpacing:'0.15em',textTransform:'uppercase',
                    color:'var(--color-accent)',display:'block',marginBottom:'0.5rem' }}>Free Live Class</span>
                  <p style={{ position:'relative',fontFamily:'var(--font-serif)',fontSize:'1.2rem',
                    fontWeight:500,color:'#fff',lineHeight:1.3 }}>
                    JEE Mains 2025 — Full Syllabus Strategy
                  </p>
                </div>

                <button id="hero-play-btn" onClick={handlePlayClick}
                  aria-label="Watch demo video"
                  style={{
                    position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',
                    background:'transparent',border:'none',cursor:'pointer',
                  }}>
                  <div style={{
                    width:'4.5rem',height:'4.5rem',borderRadius:'50%',
                    border:'3px solid var(--color-ink)',
                    boxShadow: '0 0 0 4px var(--color-accent)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'#fff',backdropFilter:'blur(4px)',
                    background:'var(--color-accent)',transition:'transform 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                  >
                    <IconPlay size={20} />
                  </div>
                </button>
              </div>

              {/* Microcopy under thumbnail — personality */}
              {clickCount > 0 && (
                <p style={{ fontFamily:'var(--font-sans)',fontSize:'0.68rem',
                  color:'var(--color-ink-faint)',textAlign:'center',marginTop:'0.5rem',
                  fontStyle:'italic',
                }}>
                  {clickCount === 1 ? 'Classic.' : clickCount === 2 ? 'Still here? Respect.' : 'You have unlocked: commitment issues.'}
                </p>
              )}
            </div>

            {/* App badge */}
            <a href="#" id="hero-app-badge"
              style={{
                display:'inline-flex',alignItems:'center',gap:'0.75rem',
                border:'1px solid var(--color-border-strong)',
                padding:'0.625rem 1rem',marginTop:'1rem',
                color:'inherit',textDecoration:'none',transition:'border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-ink-muted)" strokeWidth="1.5">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <div>
                <p style={{ fontSize:'0.65rem',color:'var(--color-ink-faint)',textTransform:'uppercase',letterSpacing:'0.1em' }}>Download the</p>
                <p style={{ fontSize:'0.85rem',fontWeight:500,color:'var(--color-ink)' }}>Strivers App</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.hero-grid{grid-template-columns:1fr!important;gap:2.5rem!important;}}`}</style>

      {/* Video Modal */}
      {videoOpen && (
        <div
          style={{ position:'fixed',inset:0,zIndex:200,background:'rgba(0,0,0,0.88)',
            display:'flex',alignItems:'center',justifyContent:'center',padding:'1.5rem' }}
          onClick={() => setVideoOpen(false)}>
          <div style={{ width:'100%',maxWidth:'860px',aspectRatio:'16/9',position:'relative' }}
            onClick={e => e.stopPropagation()}>
            <iframe src={eggUrl} style={{ width:'100%',height:'100%',border:'none' }}
              allow="autoplay; fullscreen" title="Strivers class demo" />
            <button onClick={() => setVideoOpen(false)}
              style={{ position:'absolute',top:'-2rem',right:0,background:'none',border:'none',
                color:'#fff',cursor:'pointer',fontSize:'0.85rem' }}>
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

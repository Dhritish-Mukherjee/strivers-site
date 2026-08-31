import { useState } from 'react';
import { motion } from 'framer-motion';

const CAT_COLORS = {
  govt:       { color: '#B04A2E', bg: 'rgba(176,74,46,0.10)'   },  // deep terracotta
  jee:        { color: '#3D5296', bg: 'rgba(61,82,150,0.10)'   },  // indigo-slate
  neet:       { color: '#1E7A52', bg: 'rgba(30,122,82,0.10)'   },  // forest green
  ssc:        { color: '#A07010', bg: 'rgba(160,112,16,0.10)'  },  // mustard/ochre
  class:      { color: '#A84E66', bg: 'rgba(168,78,102,0.10)'  },  // dusty rose
  foundation: { color: '#1A8A90', bg: 'rgba(26,138,144,0.10)' },  // teal
};

const categories = [
  { id:'govt',       title:'Govt. Job Prep',  description:'SSC, UPSC, Railway, and all major government exam categories — taught by top educators.', count:48, featured:true,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg> },
  { id:'jee',        title:'JEE',             description:'IIT JEE Mains & Advanced — Physics, Chemistry, Maths with full syllabus coverage.', count:32,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg> },
  { id:'neet',       title:'NEET',            description:'Biology, Physics & Chemistry — NCERT-based and advanced preparation.', count:28,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.7C17.3 17 22 13 22 10a10 10 0 10-20 0c0 3 4.7 7 10 11.7z"/><path d="M12 10v-4M10 8h4"/></svg> },
  { id:'ssc',        title:'SSC & Banking',   description:'SSC CGL, CHSL, SBI PO, IBPS — Quant, Reasoning & English.', count:24,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> },
  { id:'class',      title:'Class 11–12',     description:'Board + entrance prep — Science & Commerce streams.', count:18,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg> },
  { id:'foundation', title:'Foundation',      description:'Classes 6–10 — strong conceptual base for future competitive exams.', count:14,
    icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
];

function Card({ cat, delay, featured }) {
  const [hovered, setHovered] = useState(false);
  const cc = CAT_COLORS[cat.id];

  return (
    <motion.a
      href="#" id={`cat-${cat.id}`}
      initial={{ opacity:0, y:14 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'0px 0px 100px 0px' }}
      transition={{ delay, duration:0.45, ease:[0.16,1,0.3,1] }}
      style={{
        display:'block', textDecoration:'none', color:'var(--color-ink)',
        padding: featured ? '2.5rem 2rem' : '1.75rem 1.75rem',
        position:'relative', height:'100%',
        background: hovered ? cc.bg : '#fff',
        transition:'transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease',
        border: '4px solid var(--color-ink)',
        boxShadow: hovered ? `10px 10px 0px ${cc.color}` : `6px 6px 0px var(--color-ink)`,
        transform: hovered ? 'translate(-4px, -4px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ position:'absolute', top:'1.25rem', right:'1.25rem',
        fontFamily:'var(--font-sans)', fontSize:'0.65rem',
        color:'var(--color-ink-faint)', letterSpacing:'0.05em' }}>
        {cat.count} courses
      </span>

      {/* Washi-tape style sticker for featured */}
      {featured && (
        <div style={{
          position: 'absolute', top: '-1rem', left: '-1rem',
          background: 'var(--color-yellow)', color: 'var(--color-ink)',
          padding: '0.4rem 0.8rem', fontFamily: 'var(--font-sans)', fontSize: '0.8rem',
          fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em',
          transform: 'rotate(-10deg)', boxShadow: `4px 4px 0px var(--color-ink)`,
          zIndex: 10, border: `2px solid var(--color-ink)`,
        }}>
          Trending
        </div>
      )}

      <div style={{
        width:'3rem', height:'3rem',
        border:`3px solid var(--color-ink)`,
        boxShadow: `4px 4px 0px ${cc.color}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        color: cc.color, background: '#fff',
        marginBottom: featured ? '2rem' : '1.25rem',
        transition:'transform 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        position: 'relative',
        overflow: 'visible',
      }}>
        {cat.icon}
        {/* Playful hover ring/burst */}
        {hovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0, rotate: 90 }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: 'absolute', inset: -2,
              border: `1px dashed ${cc.color}`,
              borderRadius: '50%',
            }}
          />
        )}
      </div>

      <h3 style={{
        fontFamily: 'var(--font-sans)',
        fontSize: featured ? 'clamp(1.6rem,2.5vw,2.2rem)' : '1.2rem',
        fontWeight: 900, textTransform: 'uppercase',
        color:'var(--color-ink)', marginBottom:'0.625rem', lineHeight:1.1,
      }}>{cat.title}</h3>

      <p style={{
        fontFamily:'var(--font-sans)',
        fontSize: featured ? '0.9rem' : '0.8rem',
        color:'var(--color-ink-muted)', lineHeight:1.65,
        maxWidth: featured ? '36ch' : '28ch',
      }}>{cat.description}</p>

      <div style={{
        marginTop: featured ? '2rem' : '1.25rem',
        display:'flex', alignItems:'center', gap:'0.4rem',
        fontFamily:'var(--font-sans)', fontSize:'0.75rem',
        fontWeight:600, color: cc.color, letterSpacing:'0.03em',
      }}>
        Explore
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </motion.a>
  );
}

export default function CategoryGrid() {
  return (
    <section id="courses" className="hairline-bottom" style={{ background:'transparent', position: 'relative', overflowX: 'hidden' }}>
      <div className="container section-py" style={{ position: 'relative' }}>
        {/* Giant Ghost Text Background (Maximalist typography texture) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: '-2rem',
            left: '-2rem',
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(16rem, 32vw, 30rem)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '6px var(--color-ink)',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 0.8,
            zIndex: 0
          }}>
          01
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', marginBottom:'3.5rem', position: 'relative', zIndex: 1 }}
        >
          <div style={{ position: 'relative', background: 'var(--color-secondary)', padding: '1rem', border: '4px solid var(--color-ink)', boxShadow: '6px 6px 0px var(--color-ink)', transform: 'rotate(-2deg)' }}>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.85rem', fontWeight:900,
              letterSpacing:'0.1em', textTransform:'uppercase',
              color:'var(--color-ink)', marginBottom:'0.5rem' }}>What we offer</p>
            <h2 style={{ fontFamily:'var(--font-sans)', fontSize:'clamp(2.5rem,5vw,4rem)', textTransform: 'uppercase',
              fontWeight:900, lineHeight:1, color:'var(--color-ink)', display: 'inline-block', position: 'relative' }}>
              Explore Categories
              
              {/* Handwritten Marginalia */}
              <motion.span 
                className="category-marginalia"
                initial={{ opacity: 0, rotate: 0 }}
                whileInView={{ opacity: 1, rotate: -4 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '-8rem',
                  fontFamily: 'var(--font-script)',
                  fontSize: '1.3rem',
                  color: 'var(--color-accent)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}>
                (all 2026 syllabus!)
              </motion.span>
            </h2>
          </div>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.82rem',
            color:'var(--color-ink-muted)', maxWidth:'28ch', textAlign:'right', lineHeight:1.6 }}>
            Expert-crafted courses across every major competitive exam category.
          </p>
        </motion.div>

        {/* Row 1: Featured 2/3 + JEE 1/3 */}
        <div className="cat-row" style={{ display:'grid', gridTemplateColumns:'2fr 1fr',
          border:'4px solid var(--color-ink)', borderBottom:'none' }}>
          <div style={{ borderRight:'4px solid var(--color-ink)' }}>
            <Card cat={categories[0]} delay={0.05} featured />
          </div>
          <div><Card cat={categories[1]} delay={0.12} /></div>
        </div>

        {/* Row 2: NEET + SSC + Class */}
        <div className="cat-row" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          border:'4px solid var(--color-ink)', borderBottom:'none',
          borderTop:'4px solid var(--color-ink)' }}>
          {[categories[2], categories[3], categories[4]].map((cat, i) => (
            <div key={cat.id} style={{ borderRight: i < 2 ? '4px solid var(--color-ink)' : 'none' }}>
              <Card cat={cat} delay={0.05 + i * 0.07} />
            </div>
          ))}
        </div>

        {/* Row 3: Foundation 1/3 + CTA 2/3 */}
        <div className="cat-row" style={{ display:'grid', gridTemplateColumns:'1fr 2fr',
          border:'4px solid var(--color-ink)', borderTop:'4px solid var(--color-ink)' }}>
          <div style={{ borderRight:'4px solid var(--color-ink)' }}>
            <Card cat={categories[5]} delay={0.08} />
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start',
            justifyContent:'center', padding:'2.5rem', gap:'1rem', background: 'var(--color-yellow)' }}>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'1.75rem', fontWeight: 900, textTransform: 'uppercase',
              color:'var(--color-ink)', textAlign:'left', lineHeight:1.1, marginBottom:'0.25rem' }}>
              Not sure where to start?
            </p>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.9rem', fontWeight: 600,
              color:'var(--color-ink)', textAlign:'left', lineHeight:1.6, maxWidth:'32ch' }}>
              Nothing here matches your vibe? Explore all, or talk to a counsellor.
            </p>
            <a href="#" id="cat-view-all-btn"
              style={{
                fontFamily:'var(--font-sans)', fontSize:'1rem', fontWeight:900,
                textTransform:'uppercase', color:'var(--color-paper)',
                background:'var(--color-ink)', padding:'0.8rem 1.8rem',
                textDecoration:'none', border:'4px solid var(--color-ink)',
                boxShadow: '6px 6px 0px rgba(0,0,0,0.2)',
                transition:'background 0.18s, color 0.18s, transform 0.18s',
                display:'inline-block', marginTop:'0.5rem',
              }}
              onMouseEnter={e=>{ e.currentTarget.style.background='var(--color-accent)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e=>{ e.currentTarget.style.background='var(--color-ink)'; e.currentTarget.style.transform='none'; }}>
              View all courses →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .cat-row{grid-template-columns:1fr!important;}
          .cat-row>div{border-right:none!important;border-bottom:4px solid var(--color-ink)!important;}
          .cat-row>div:last-child{border-bottom:none!important;}
          .category-marginalia { right: 0 !important; bottom: -2rem !important; }
        }
      `}</style>
    </section>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const footerLinks = {
  Courses: [
    { label:'Govt. Job Prep', href:'#' },
    { label:'JEE', href:'#' },
    { label:'NEET', href:'#' },
    { label:'SSC & Banking', href:'#' },
    { label:'Class 11–12', href:'#' },
    { label:'Foundation', href:'#' },
  ],
  Platform: [
    { label:'StriverTech', href:'#' },
    { label:'Striver Academy', href:'#' },
    { label:'Live Classes', href:'#' },
    { label:'Download App', href:'#' },
    { label:'Free Resources', href:'#' },
  ],
  Company: [
    { label:'About Us', href:'#' },
    { label:'Careers', href:'#' },
    { label:'Contact', href:'#' },
    { label:'Privacy Policy', href:'#' },
    { label:'Terms of Service', href:'#' },
  ],
};

const BRAND = { yt:'#FF0000', wa:'#25D366', tg:'#2AABEE', tw:'#1A1A1A', ig:'#E1306C', fb:'#1877F2', li:'#0A66C2' };

const socials = [
  { id:'yt',  title:'YouTube', href:'https://www.youtube.com/@Striverseducation',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/></svg> },
  { id:'wa',  title:'WhatsApp', href:'https://chat.whatsapp.com/K0QF19zbGP8ELy7tkClRyG?mode=gi_t',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
  { id:'fb',  title:'Facebook', href:'https://facebook.com/share/17ihKoHDiY',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { id:'tw',  title:'X (Twitter)', href:'https://x.com/Strivers050126',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { id:'ig',  title:'Instagram', href:'https://instagram.com/striverseducation',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/></svg> },
  { id:'li',  title:'LinkedIn', href:'https://linkedin.com/company/strivers-education',
    icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.65 1.65 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66 1.65 1.65 0 0 0-1.66-1.66Z"/></svg> },
];

export default function Footer() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <footer id="footer" ref={containerRef} style={{ background:'var(--color-ink)', color:'var(--color-paper)', position: 'relative', overflow: 'hidden', borderTop: '8px solid var(--color-accent)' }}>
      <motion.div style={{
        position: 'absolute', top: '20%', left: '-10%', width: '120%',
        textAlign: 'center', fontFamily: 'var(--font-sans)',
        fontSize: 'clamp(8rem, 25vw, 35rem)', fontWeight: 900, lineHeight: 0.8,
        color: 'transparent', WebkitTextStroke: '8px rgba(255,255,255,0.05)',
        pointerEvents: 'none', userSelect: 'none', zIndex: 0,
        letterSpacing: '-0.04em', transform: 'rotate(-5deg)',
        y
      }}>
        STRIVERS
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main columns */}
        <div className="footer-grid" style={{
          display:'grid', gridTemplateColumns:'1.6fr 1fr 1fr 1fr',
          gap:'3rem', padding:'4rem 0 3rem',
          borderBottom:'1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Brand col */}
          <div>
            <div style={{ alignItems:'center', gap:'0.375rem', marginBottom:'1.5rem', background: 'var(--color-yellow)', padding: '0.5rem 1rem', display: 'inline-flex', border: '3px solid var(--color-ink)' }}>
              <span style={{ fontFamily:'var(--font-sans)', fontSize:'1.75rem', fontWeight:900, textTransform: 'uppercase', color: 'var(--color-ink)' }}>Strivers Bangla</span>
              <span style={{ width:'8px', height:'8px', background:'var(--color-accent)', marginTop:'4px' }} />
            </div>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'1rem', fontWeight: 600, lineHeight:1.6,
              color:'rgba(250,247,242,0.8)', marginBottom:'2rem', maxWidth:'26ch' }}>
              West Bengal&rsquo;s premier platform for Government Job Preparation, SSC in Kolkata, WBCS, Banking, JEE &amp; NEET.
            </p>
            <div style={{ display:'flex', gap:'0.625rem' }}>
              {socials.map(s => {
                const bc = BRAND[s.id];
                return (
                  <a key={s.id} href={s.href || '#'} target={s.href && s.href !== '#' ? "_blank" : "_self"} rel="noopener noreferrer" id={`footer-${s.id}`} title={s.title}
                    style={{ width:'2.5rem', height:'2.5rem', border:'2px solid rgba(255,255,255,0.4)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      color:'rgba(250,247,242,0.9)', textDecoration:'none', background: 'rgba(255,255,255,0.05)',
                      transition:'border-color 0.15s, color 0.15s, background 0.15s, transform 0.15s' }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=bc; e.currentTarget.style.background=bc; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-3px)'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='rgba(250,247,242,0.9)'; e.currentTarget.style.transform='none'; }}>
                    {s.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.65rem', fontWeight:600,
                letterSpacing:'0.12em', textTransform:'uppercase',
                color:'rgba(250,247,242,0.35)', marginBottom:'1.25rem' }}>{heading}</p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.625rem' }}>
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href}
                      style={{ fontFamily:'var(--font-sans)', fontSize:'0.82rem',
                        color:'rgba(250,247,242,0.55)', textDecoration:'none',
                        transition:'color 0.15s' }}
                      onMouseEnter={e=>{ e.currentTarget.style.color='rgba(250,247,242,1)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.color='rgba(250,247,242,0.55)'; }}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'1.25rem 0', gap:'1rem', flexWrap:'wrap' }}>
          <div>
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.72rem', color:'rgba(250,247,242,0.3)' }}>
              © 2026 Strivers EdTech Pvt. Ltd. All rights reserved.
            </p>
            {/* Easter egg — small, unobtrusive */}
            <p style={{ fontFamily:'var(--font-sans)', fontSize:'0.62rem',
              color:'rgba(250,247,242,0.18)', marginTop:'0.2rem', fontStyle:'italic' }}>
              Built by people who also procrastinated on this website.
            </p>
          </div>
          <div style={{ display:'flex', gap:'1.25rem', alignItems:'center' }}>
            <span style={{ fontFamily:'var(--font-sans)', fontSize:'0.65rem',
              color:'rgba(250,247,242,0.22)', letterSpacing:'0.08em', textTransform:'uppercase' }}>
              Team:
            </span>
            {[
              { label:'Employee Login', id:'footer-emp-login' },
              { label:'PPT Making', id:'footer-ppt' },
              { label:'PDF Submit', id:'footer-pdf' },
            ].map((t, i, arr) => (
              <span key={t.id} style={{ display:'flex', alignItems:'center', gap:'1.25rem' }}>
                <a href="#" id={t.id}
                  style={{ fontFamily:'var(--font-sans)', fontSize:'0.72rem',
                    color:'rgba(250,247,242,0.3)', textDecoration:'none', transition:'color 0.15s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.color='rgba(250,247,242,0.65)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.color='rgba(250,247,242,0.3)'; }}>
                  {t.label}
                </a>
                {i < arr.length - 1 && (
                  <span style={{ width:'1px', height:'12px', background:'rgba(255,255,255,0.1)', flexShrink:0 }} />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr!important;gap:2rem!important;}}
        @media(max-width:540px){.footer-grid{grid-template-columns:1fr!important;}}
      `}</style>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce.js';

// Platform brand colors for hover
const BRAND = {
  yt: '#FF0000',
  wa: '#25D366',
  tg: '#2AABEE',
  tw: '#1A1A1A',
  ig: '#E1306C',
};

const links = [
  { id: 'yt', label: 'YT Live',     sub: 'Live Classes',    href: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><polygon points="10 9 15 12 10 15" fill="currentColor" stroke="none"/></svg> },
  { id: 'wa', label: 'WhatsApp',    sub: 'Community',       href: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg> },
  { id: 'tg', label: 'Telegram',    sub: 'Updates',         href: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg> },
  { id: 'tw', label: 'X (Twitter)', sub: 'Follow us',       href: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { id: 'ig', label: 'Instagram',   sub: 'Behind the scenes', href: '#',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
];

export default function CommunityStrip() {
  const [ref, inView] = useInViewOnce({ threshold: 0.15 });

  return (
    <section id="community-links" style={{ background: 'var(--color-secondary)', borderBottom: '4px solid var(--color-ink)', borderTop: '4px solid var(--color-ink)' }}>
      <div className="container" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 900,
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'var(--color-ink)', marginBottom: '1.25rem', background: '#fff',
          display: 'inline-block', padding: '0.2rem 0.6rem', border: '2px solid var(--color-ink)',
          transform: 'rotate(-2deg)', boxShadow: '4px 4px 0px var(--color-ink)'
        }}>Find us on</p>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          className="community-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', border: '4px solid var(--color-ink)', boxShadow: 'var(--shadow-brutal)', background: '#fff' }}
        >
          {links.map((link, i) => {
            const bc = BRAND[link.id];
            return (
              <motion.a
                key={link.id}
                href={link.href}
                id={`community-${link.id}`}
                variants={{ hidden: { opacity:0,y:8 }, visible: { opacity:1,y:0,transition:{duration:0.3} } }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.875rem',
                  padding: '1.5rem 1.25rem',
                  borderRight: i < links.length - 1 ? '4px solid var(--color-ink)' : 'none',
                  color: 'var(--color-ink)', textDecoration: 'none',
                  transition: 'background 0.18s, transform 0.18s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = bc;
                  e.currentTarget.querySelector('.comm-icon').style.color = '#fff';
                  e.currentTarget.querySelector('.comm-text').style.color = '#fff';
                  e.currentTarget.querySelector('.comm-sub').style.color = 'rgba(255,255,255,0.8)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.querySelector('.comm-icon').style.color = 'var(--color-ink)';
                  e.currentTarget.querySelector('.comm-text').style.color = 'var(--color-ink)';
                  e.currentTarget.querySelector('.comm-sub').style.color = 'var(--color-ink-faint)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span className="comm-icon" style={{
                  color: 'var(--color-ink)', flexShrink: 0,
                  transition: 'color 0.18s',
                }}>
                  {link.icon}
                </span>
                <span>
                  <span className="comm-text" style={{ display:'block', fontFamily:'var(--font-sans)', fontSize:'1rem', fontWeight:900, textTransform:'uppercase', color:'var(--color-ink)', transition: 'color 0.18s' }}>{link.label}</span>
                  <span className="comm-sub" style={{ display:'block', fontFamily:'var(--font-sans)', fontSize:'0.75rem', fontWeight:700, color:'var(--color-ink-faint)', marginTop:'0.1rem', transition: 'color 0.18s' }}>{link.sub}</span>
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          .community-grid{grid-template-columns:1fr 1fr!important;}
          .community-grid a:nth-child(2n){border-right:none!important;}
          .community-grid a{border-bottom:4px solid var(--color-ink)!important;}
          .community-grid a:last-child{border-bottom:none!important;}
        }
        @media(max-width:540px){
          .community-grid{grid-template-columns:1fr!important;}
          .community-grid a{border-right:none!important;}
        }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce.js';
import { useCountUp } from '../hooks/useCountUp.js';

const stats = [
  { value: 500,   suffix: '+', label: 'Hours of Content',  sub: 'across all categories',
    milestone: null },
  { value: 50000, suffix: '+', label: 'Students Enrolled', sub: 'and growing daily',
    milestone: '...probably one more right now.' },
  { value: 20,    suffix: '+', label: 'Expert Educators',  sub: 'handpicked faculty',
    milestone: null },
  { value: 95,    suffix: '%', label: 'Satisfaction Rate', sub: 'from student surveys',
    milestone: null },
];

function StatItem({ stat, start }) {
  const count = useCountUp(stat.value, 1400, start);
  const done = count >= stat.value;

  const display = stat.value >= 10000
    ? `${Math.round(count / 1000)}k`
    : count;

  return (
    <div style={{ padding: '2.5rem 2rem' }}>
      <p style={{
        fontFamily: 'var(--font-sans)', // bolder sans instead of serif
        fontSize: 'clamp(3rem,6vw,4.5rem)',
        fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em',
        color: 'var(--color-ink)', marginBottom: '1rem',
        textShadow: '4px 4px 0px rgba(255,255,255,1)', // white pop shadow
        position: 'relative', display: 'inline-block'
      }}>
        {display}
        <span style={{ color: 'var(--color-ink)' }}>{stat.suffix}</span>
        
        {/* Animated underline when count finishes */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: done ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
          style={{
            position: 'absolute', bottom: '-0.5rem', left: 0, right: 0,
            height: '6px', background: 'var(--color-ink)',
            transformOrigin: 'left',
          }}
        />
      </p>
      <p style={{ fontFamily:'var(--font-sans)',fontSize:'1rem',fontWeight:800,textTransform:'uppercase',color:'var(--color-ink)',marginBottom:'0.2rem' }}>{stat.label}</p>
      <p style={{ fontFamily:'var(--font-sans)',fontSize:'0.85rem',fontWeight:600,color:'var(--color-ink-muted)' }}>{stat.sub}</p>

      {/* Milestone line — fades in when count finishes */}
      {stat.milestone && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 800,
            color: 'var(--color-ink)', fontStyle: 'italic',
            marginTop: '0.5rem', background: '#fff', display: 'inline-block',
            padding: '0.1rem 0.5rem', border: '2px solid var(--color-ink)'
          }}
        >
          {stat.milestone}
        </motion.p>
      )}
    </div>
  );
}

export default function StatsBanner() {
  const [ref, inView] = useInViewOnce({ threshold: 0.2 });

  return (
    <section id="stats" ref={ref} style={{ background: 'var(--color-paper)', borderBottom: '4px solid var(--color-ink)' }}>
      <div className="container section-py">
        <div style={{ display:'inline-flex',alignItems:'center',gap:'0.75rem',marginBottom:'2.5rem', background: 'var(--color-ink)', padding: '0.5rem 1rem', transform: 'rotate(-1deg)' }}>
          <span style={{ fontFamily:'var(--font-sans)',fontSize:'0.85rem',fontWeight:800,
            letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--color-yellow)' }}>
            By the numbers
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="stats-grid"
          style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',border:'4px solid var(--color-ink)', boxShadow: 'var(--shadow-brutal)' }}
        >
          {stats.map((stat, i) => {
            const bgColors = ['var(--color-yellow)', 'var(--color-secondary)', 'var(--color-tertiary)', '#FF512F'];
            return (
              <div key={stat.label}
                style={{ borderRight: i < 3 ? '4px solid var(--color-ink)' : 'none', background: bgColors[i] }}
                className="stat-cell">
                <StatItem stat={stat} start={inView} />
              </div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:640px){
          .stats-grid{grid-template-columns:1fr!important;}
          .stat-cell{border-right:none!important;border-bottom:4px solid var(--color-ink)!important;}
          .stat-cell:last-child{border-bottom:none!important;}
        }
      `}</style>
    </section>
  );
}

import { motion, useScroll, useSpring } from 'framer-motion';

export default function RisingLine() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div id="rising-line" style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
      display: 'flex', justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1440px', height: '100%', position: 'relative' }}>
        <svg
          width="100%" height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0 }}
        >
          <motion.path
            d="M 5,95 Q 15,90 25,75 T 45,60 T 65,40 T 95,5"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeOpacity="0.15"
            style={{ pathLength: smoothProgress }}
          />
        </svg>
      </div>
      <style>{`@media(max-width:768px){#rising-line{display:none;}}`}</style>
    </div>
  );
}

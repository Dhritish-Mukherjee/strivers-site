import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export default function EquationAnimation() {
  const controls = useAnimation();

  useEffect(() => {
    async function sequence() {
      // Small delay on mount
      await new Promise(r => setTimeout(r, 1000));
      
      while (true) {
        // 1. Draw equation: ∫ e^x dx
        await controls.start("drawEq", { transition: { duration: 1.5, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 1500));
        
        // 2. Equals sign
        await controls.start("drawEqSign", { transition: { duration: 0.5, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 1000));
        
        // 3. Solve step 1: e^x
        await controls.start("drawAns1", { transition: { duration: 1, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 1000));
        
        // 4. Solve step 2: + C
        await controls.start("drawAns2", { transition: { duration: 1, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 6000)); // loop delay
        
        // Fade out
        await controls.start("fadeOut", { transition: { duration: 0.8 } });
        // Reset
        controls.set("reset");
        await new Promise(r => setTimeout(r, 500));
      }
    }
    sequence();
  }, [controls]);

  const pathProps = {
    fill: "none",
    stroke: "var(--color-ink-muted)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    initial: "reset",
    animate: controls,
  };

  const drawVar = {
    reset: { pathLength: 0, opacity: 0 },
    drawEq: { pathLength: 1, opacity: 1 },
    fadeOut: { opacity: 0 }
  };
  
  const drawEqSignVar = {
    reset: { pathLength: 0, opacity: 0 },
    drawEqSign: { pathLength: 1, opacity: 1 },
    fadeOut: { opacity: 0 }
  };

  const drawAns1Var = {
    reset: { pathLength: 0, opacity: 0 },
    drawAns1: { pathLength: 1, opacity: 1 },
    fadeOut: { opacity: 0 }
  };

  const drawAns2Var = {
    reset: { pathLength: 0, opacity: 0 },
    drawAns2: { pathLength: 1, opacity: 1 },
    fadeOut: { opacity: 0 }
  };

  return (
    <div style={{
      position: 'absolute', top: '4rem', right: '4rem',
      opacity: 0.5, pointerEvents: 'none',
      transform: 'rotate(-4deg)',
    }}>
      <svg width="220" height="100" viewBox="0 0 220 100">
        {/* ∫ */}
        <motion.path d="M 25,75 C 25,75 15,75 15,65 C 15,35 35,35 35,15 C 35,5 25,5 25,5" variants={drawVar} {...pathProps} />
        {/* e */}
        <motion.path d="M 45,55 C 40,55 40,65 50,65 C 60,65 60,55 50,55 C 40,55 40,45 50,45 C 55,45 60,50 60,55" variants={drawVar} {...pathProps} />
        {/* ^x */}
        <motion.path d="M 65,30 L 75,45 M 75,30 L 65,45" variants={drawVar} {...pathProps} />
        {/* d */}
        <motion.path d="M 100,40 L 100,65 M 100,55 C 95,50 85,50 85,60 C 85,70 95,70 100,65" variants={drawVar} {...pathProps} />
        {/* x */}
        <motion.path d="M 110,45 L 125,65 M 125,45 L 110,65" variants={drawVar} {...pathProps} />
        
        {/* = */}
        <motion.path d="M 140,50 L 155,50 M 140,60 L 155,60" variants={drawEqSignVar} {...pathProps} />
        
        {/* e */}
        <motion.path d="M 170,55 C 165,55 165,65 175,65 C 185,65 185,55 175,55 C 165,55 165,45 175,45 C 180,45 185,50 185,55" variants={drawAns1Var} {...pathProps} />
        {/* ^x */}
        <motion.path d="M 190,30 L 200,45 M 200,30 L 190,45" variants={drawAns1Var} {...pathProps} />

        {/* + */}
        <motion.path d="M 215,50 L 215,60 M 210,55 L 220,55" variants={drawAns2Var} {...pathProps} />
        {/* C */}
        <motion.path d="M 245,45 C 235,45 230,50 230,55 C 230,60 235,65 245,65" variants={drawAns2Var} {...pathProps} />
      </svg>
      <style>{`@media(max-width:900px){div{display:none;}}`}</style>
    </div>
  );
}

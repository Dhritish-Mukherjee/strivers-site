import { useEffect, useRef } from 'react';

export default function ParticleNetwork({ interactive = true, density = 15000, fixed = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Parent should be relative
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = fixed ? window.innerHeight : (canvas.parentElement?.offsetHeight || window.innerHeight);

    let particles = [];
    
    // Check if mobile (disable interactivity)
    const isMobile = window.innerWidth <= 768;
    
    const options = {
      particleColor: 'rgba(26,26,26,0.35)', // ink
      accentColor: 'rgba(193,68,14,0.6)', // accent
      particleAmount: Math.min(Math.floor((w * h) / (isMobile ? density * 2 : density * 1.5)), 40),
      defaultSpeed: 0.15,
      variantSpeed: 0.2,
      defaultRadius: 1,
      variantRadius: 1,
      linkRadius: 140,
    };

    const mouse = { x: -1000, y: -1000, active: false };

    if (!isMobile && interactive) {
      const onMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      };
      const onMouseLeave = () => {
        mouse.active = false;
        mouse.x = -1000;
        mouse.y = -1000;
      };
      
      window.addEventListener('mousemove', onMouseMove);
      if (canvas.parentElement && !fixed) {
        canvas.parentElement.addEventListener('mouseleave', onMouseLeave);
      } else {
        document.addEventListener('mouseleave', onMouseLeave);
      }
      
      // Store on canvas for cleanup
      canvas._onMouseMove = onMouseMove;
      canvas._onMouseLeave = onMouseLeave;
    }

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = fixed ? window.innerHeight : (canvas.parentElement?.offsetHeight || window.innerHeight);
      init();
    };
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.color = Math.random() > 0.85 ? options.accentColor : options.particleColor;
        this.radius = options.defaultRadius + Math.random() * options.variantRadius;
        this.vector = {
          x: Math.cos(this.directionAngle) * this.speed,
          y: Math.sin(this.directionAngle) * this.speed
        };
      }
      
      update() {
        this.border();
        
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        // Gravitate toward mouse if close
        if (mouse.active && dist < options.linkRadius) {
          const force = (options.linkRadius - dist) / options.linkRadius;
          this.x += (dx / dist) * force * 1.2;
          this.y += (dy / dist) * force * 1.2;
        } else {
          this.x += this.vector.x;
          this.y += this.vector.y;
        }
      }
      
      border() {
        if (this.x >= w || this.x <= 0) this.vector.x *= -1;
        if (this.y >= h || this.y <= 0) this.vector.y *= -1;
        if (this.x > w) this.x = w;
        if (this.y > h) this.y = h;
        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
      }
    }

    let animationId;
    let isVisible = true;

    // Pause updates when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0 });
    
    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    function loop() {
      if (isVisible) {
        ctx.clearRect(0, 0, w, h);
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
        
        // Draw lines
        for (let i = 0; i < particles.length; i++) {
          // Link to mouse
          if (mouse.active) {
            let dx = mouse.x - particles[i].x;
            let dy = mouse.y - particles[i].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < options.linkRadius) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(26,26,26,${0.2 - (dist/options.linkRadius) * 0.2})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
          
          // Link to other particles
          for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[j].x - particles[i].x;
            let dy = particles[j].y - particles[i].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < options.linkRadius) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(26,26,26,${0.15 - (dist/options.linkRadius) * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      animationId = requestAnimationFrame(loop);
    }

    init();
    loop();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (!isMobile && interactive) {
        window.removeEventListener('mousemove', canvas._onMouseMove);
        if (canvas.parentElement && !fixed) {
          canvas.parentElement.removeEventListener('mouseleave', canvas._onMouseLeave);
        } else {
          document.removeEventListener('mouseleave', canvas._onMouseLeave);
        }
      }
    };
  }, [interactive, density, fixed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none' // Don't block interactions
      }}
    />
  );
}

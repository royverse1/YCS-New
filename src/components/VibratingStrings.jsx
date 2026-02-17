/* src/components/VibratingStrings.jsx */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VibratingStrings() {
  const containerRef = useRef(null);
  const layer1Paths = useRef([]);
  const layer2Paths = useRef([]);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Smoother update function using a higher dampening factor
    const updateWaves = (amplitude, scrollPos) => {
      const width = window.innerWidth;
      const height = containerRef.current.offsetHeight;
      const centerY = height / 2;
      
      const drawLayer = (paths, count, offsetMultiplier, speedMultiplier, colorOffset) => {
        paths.forEach((path, i) => {
          const y = (centerY - 225) + i * 50 + colorOffset;
          const phase = scrollPos * speedMultiplier + i;
          // Lerped offset for silkier motion
          const offset = Math.sin(phase) * amplitude * offsetMultiplier;
          // Precision path with 3 points for better curve rendering
          const d = `M 0 ${y} C ${width * 0.3} ${y + offset}, ${width * 0.7} ${y - offset}, ${width} ${y}`;
          if (path) path.setAttribute('d', d);
        });
      };

      drawLayer(layer1Paths.current, 10, 1, 0.003, 0);       // Green
      drawLayer(layer2Paths.current, 10, 1.4, -0.005, 20);   // Blue
    };

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.min(Math.abs(self.getVelocity() / 5), 200);
          const scrollPos = self.scroll();
          updateWaves(velocity, scrollPos);
          
          gsap.to(".psychedelic-glow", {
            backgroundPosition: `${self.progress * 100}% center`,
            duration: 1.2,
            ease: "sine.out"
          });

          gsap.to({}, {
            duration: 1.5,
            onUpdate: () => {
              const currentAmp = gsap.utils.interpolate(velocity, 10, 0.05);
              updateWaves(currentAmp, scrollPos);
            }
          });
        }
      });

      // Line-by-Line animation for the summarized text
      const lines = paragraphRef.current.children;
      gsap.fromTo(lines, 
        { opacity: 0, y: 30, filter: "blur(10px)" },
        { 
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.2, stagger: 0.4, ease: "power3.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ background: '#000', position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      
      {/* Blending Masks */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '25%', background: 'linear-gradient(to bottom, #000, transparent)', zIndex: 5 }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '25%', background: 'linear-gradient(to top, #000, transparent)', zIndex: 5 }}></div>

      {/* Psychedelic Glow */}
      <div className="psychedelic-glow" style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(90deg, #7000ff, #00ffff, #7000ff)', backgroundSize: '200% auto', opacity: 0.1, filter: 'blur(140px)' }}></div>

      {/* Back Layer (Blue) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, opacity: 0.2 }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          {[...Array(10)].map((_, i) => (
            <path key={i} ref={el => layer2Paths.current[i] = el} stroke="#00ffff" strokeWidth="1" fill="transparent" />
          ))}
        </svg>
      </div>

      {/* Front Layer (Green) */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, opacity: 0.4 }}>
        <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
          {[...Array(10)].map((_, i) => (
            <path key={i} ref={el => layer1Paths.current[i] = el} stroke="#39FF14" strokeWidth="1.5" fill="transparent" />
          ))}
        </svg>
      </div>

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 8%' }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(4.5rem, 12vw, 9rem)', fontWeight: '900', textTransform: 'uppercase', marginBottom: '35px', letterSpacing: '-0.02em' }}>FUN FACT</h2>
        
        <div ref={paragraphRef} style={{ color: '#fff', maxWidth: '1000px', margin: '0 auto', fontSize: 'clamp(1.1rem, 1.8vw, 1.8rem)', fontStyle: 'italic', fontWeight: '400', lineHeight: '1.7' }}>
          <p>While 90% of guitar students globally quit within their first year,</p>
          <p>the Yangerila method flips the script, with over 90% of our students</p>
          <p>continuing to make music a permanent part of their lives.</p>
        </div>
      </div>
    </section>
  );
}
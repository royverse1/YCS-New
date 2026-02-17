/* src/components/Stats.jsx */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const rootRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".stat-num", {
        textContent: 0,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.12, filter: 'grayscale(1)' }}>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-particles-of-blue-and-purple-light-moving-31652-large.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '95%', maxWidth: '1400px' }}>
        
        {/* Stat 1: Experience */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6em', fontWeight: '900' }}>EXPERIENCE</p>
          <div style={{ width: '150px', height: '3px', background: 'var(--color-neon)', boxShadow: '0 0 20px var(--color-neon)', margin: '25px 0' }}></div>
          <h2 style={{ fontSize: 'clamp(4rem, 9vw, 7rem)', color: '#fff', fontWeight: '900', margin: '0' }}>
            <span className="stat-num">20</span>+
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '15px' }}>Years in Music</p>
        </div>

        {/* Stat 2: Students */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6em', fontWeight: '900' }}>STUDENTS</p>
          <div style={{ width: '150px', height: '3px', background: 'var(--color-neon)', boxShadow: '0 0 20px var(--color-neon)', margin: '25px 0' }}></div>
          <h2 style={{ fontSize: 'clamp(4rem, 9vw, 7rem)', color: '#fff', fontWeight: '900', margin: '0' }}>
            <span className="stat-num">4000</span>+
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '15px' }}>Taught Worldwide</p>
        </div>

        {/* Stat 3: Serving */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '1rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.6em', fontWeight: '900' }}>SERVING</p>
          <div style={{ width: '150px', height: '3px', background: 'var(--color-neon)', boxShadow: '0 0 20px var(--color-neon)', margin: '25px 0' }}></div>
          <h2 style={{ fontSize: 'clamp(4rem, 9vw, 7rem)', color: '#fff', fontWeight: '900', margin: '0' }}>
            <span className="stat-num">12</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: '15px' }}>Countries</p>
        </div>
      </div>
    </section>
  );
}
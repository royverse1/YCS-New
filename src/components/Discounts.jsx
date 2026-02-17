/* src/components/Discounts.jsx */
import { useState, useEffect, useRef } from 'react';

export default function Discounts() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);

  const offers = [
    { 
      title: "Referral Reward", 
      detail: "INR 1,000 Amazon Gift Card", 
      sub: "Valid till: Always Active", 
      color: "#39FF14", 
      desc: "Empower a friend's musical journey and get rewarded instantly." 
    },
    { 
      title: "United We Stand", 
      detail: "30% OFF – Group Discount", 
      sub: "Valid till: Always Active", 
      color: "#00ffff", 
      desc: "Learning is better together. Form a trio and unlock massive savings."
    },
    { 
      title: "Student Referral", 
      detail: "50% OFF – Next Fee", 
      sub: "Valid till: Always Active", 
      color: "#7000ff", 
      desc: "Our biggest internal scholarship for those who help our community grow."
    },
    { 
      title: "Festive Discount", 
      detail: "Diwali 2025 Special", 
      sub: "Valid till: Limited Period", 
      color: "#ff00ff", 
      desc: "Celebrate the festival of lights with exclusive enrollment waivers."
    }
  ];

  // Slower auto-cycle: 7 seconds for better readability
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % offers.length);
      }, 7000); 
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, offers.length]);

  return (
    <section style={{ background: '#000', padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%' }}>
        
        {/* Scaled Heading */}
        <h2 style={{ 
          color: '#fff', 
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', 
          fontWeight: '900', 
          marginBottom: '50px', 
          textAlign: 'left',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em'
        }}>
          Upcoming Discounts & Offers.
        </h2>

        {/* GALLERY STAGE - Scaled 30% smaller height */}
        <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center' }}>
          {offers.map((offer, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '100%',
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  transform: isActive ? 'scale(1) translateX(0)' : 'scale(0.95) translateX(60px)',
                  transition: 'all 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: isActive ? 2 : 1
                }}
              >
                {/* External Glow Layer - Scaled */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '650px',
                  height: '100%',
                  background: offer.color,
                  opacity: isActive ? 0.12 : 0,
                  filter: 'blur(100px)',
                  transition: 'opacity 0.8s ease',
                  pointerEvents: 'none'
                }}></div>

                {/* Main Card - Scaled Padding and Radius */}
                <div style={{
                  width: '100%',
                  maxWidth: '650px',
                  background: 'rgba(12, 12, 12, 0.85)',
                  border: `1px solid ${offer.color}22`,
                  borderRadius: '32px',
                  padding: '60px 50px',
                  backdropFilter: 'blur(40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  minHeight: '320px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: `0 15px 40px -15px ${offer.color}33`
                }}>
                  {/* High-Velocity Internal Gradient */}
                  <div className="fast-gradient-animate" style={{ 
                    position: 'absolute', 
                    inset: '-80%',
                    background: `radial-gradient(circle at center, ${offer.color}33 0%, transparent 60%)`,
                    zIndex: 0,
                    pointerEvents: 'none'
                  }}></div>

                  <span style={{ 
                    color: offer.color, 
                    fontSize: '0.75rem', 
                    fontWeight: '900', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.4em', 
                    marginBottom: '25px', 
                    zIndex: 1 
                  }}>
                    {offer.title}
                  </span>

                  {/* Scaled Serif Heading */}
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: 'clamp(2rem, 4.5vw, 3rem)', 
                    fontFamily: 'Georgia, serif',
                    fontWeight: '900', 
                    marginBottom: '18px', 
                    zIndex: 1, 
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em'
                  }}>
                    {offer.detail}
                  </h3>

                  <p style={{ 
                    color: '#aaa', 
                    fontSize: '1rem', 
                    maxWidth: '450px', 
                    marginBottom: '35px', 
                    zIndex: 1, 
                    lineHeight: '1.5',
                    fontWeight: '300' 
                  }}>
                    {offer.desc}
                  </p>

                  <p style={{ 
                    color: '#666', 
                    fontSize: '0.7rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.25em', 
                    zIndex: 1, 
                    fontWeight: '800' 
                  }}>
                    {offer.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* NAVIGATION - Scaled Dots and Button */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '25px', marginTop: '50px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {offers.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActiveIndex(i)}
                style={{ 
                  width: activeIndex === i ? '32px' : '8px', 
                  height: '8px', 
                  borderRadius: '10px', 
                  background: activeIndex === i ? '#fff' : '#333',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }} 
              />
            ))}
          </div>

          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ 
              background: 'rgba(255,255,255,0.08)', border: 'none', 
              borderRadius: '50%', width: '40px', height: '40px', 
              color: '#fff', cursor: 'pointer', display: 'flex', 
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            {isPlaying ? (
              <svg width="10" height="10" viewBox="0 0 14 14" fill="white"><rect width="4" height="14" /><rect x="10" width="4" height="14" /></svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 14 14" fill="white"><path d="M0 0L14 7L0 14V0Z" /></svg>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes highSpeedFloat {
          0% { transform: translate(-5%, -5%) scale(1); }
          50% { transform: translate(12%, 12%) scale(1.05); }
          100% { transform: translate(-5%, -5%) scale(1); }
        }
        .fast-gradient-animate {
          animation: highSpeedFloat 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
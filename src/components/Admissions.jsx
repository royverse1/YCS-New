/* src/components/Admissions.jsx */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Admissions() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const slides = [
    {
      type: "Admissions",
      title: "Interested in joining us?",
      content: "Simply fill out JOIN NOW form, and our Student Relationship Manager (SRM) will contact you to answer all your queries. Every student is given a demo session first, and once that's complete, your SRM will personally guide you through the admission process.",
      buttonText: "JOIN NOW",
      gradient: "radial-gradient(circle at center, rgba(168, 85, 247, 0.25) 0%, transparent 60%)",
      btnColor: "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
      accent: "#a855f7"
    },
    {
      type: "Demo Session",
      title: "Start with a blast.",
      content: "Come and experience our uniquely designed demo session. Unlike typical trial classes, this session gives you a complete overview of guitar types, playing techniques, and all the essential information every beginner should know before starting their journey. Best of all—it's completely free and online.",
      buttonText: "BOOK NOW",
      gradient: "radial-gradient(circle at center, rgba(0, 255, 255, 0.2) 0%, transparent 60%)",
      btnColor: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
      accent: "#00ffff"
    }
  ];

  useEffect(() => {
    if (isPlaying && !showForm) {
      const timer = setInterval(() => {
        gsap.to(cardRef.current, { opacity: 0, y: 20, duration: 0.4, onComplete: () => {
          setActiveSlide((prev) => (prev + 1) % slides.length);
          gsap.fromTo(cardRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 });
        }});
      }, 7000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, showForm, activeSlide]);

  useEffect(() => {
    if (showForm) {
      gsap.to(overlayRef.current, { display: 'flex', opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' });
    }
  }, [showForm]);

  const closeForm = () => {
    gsap.to(overlayRef.current, { opacity: 0, display: 'none', duration: 0.3, onComplete: () => setShowForm(false) });
  };

  return (
    <section 
      style={{ background: '#000' }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '90%' }}>
        <div ref={cardRef} style={{
          position: 'relative', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(50px)',
          border: `1px solid rgba(255,255,255,0.08)`, borderRadius: '48px', padding: '100px 70px',
          minHeight: '580px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center', overflow: 'hidden'
        }}>
          {/* HIGH-VELOCITY MOVING GRADIENT */}
          <div style={{ 
            position: 'absolute', inset: '-50%', background: slides[activeSlide].gradient, 
            animation: 'fastMove 6s ease-in-out infinite alternate', zIndex: 0 
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* TYPOGRAPHY CALIBRATION */}
            <h2 style={{ 
              color: '#fff', fontSize: 'clamp(3.5rem, 7vw, 6rem)', marginBottom: '10px', 
              textTransform: 'uppercase', fontWeight: 900, letterSpacing: '-0.02em' 
            }}>{slides[activeSlide].type}</h2>
            
            <h4 style={{ 
              color: slides[activeSlide].accent, letterSpacing: '0.4em', marginBottom: '40px', 
              fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase' 
            }}>{slides[activeSlide].title}</h4>

            <p style={{ color: '#ccc', fontSize: '1.25rem', lineHeight: '1.8', maxWidth: '850px', margin: '0 auto 50px' }}>{slides[activeSlide].content}</p>
            
            <button 
              className="admission-btn" 
              onClick={() => setShowForm(true)}
              style={{ background: slides[activeSlide].btnColor }}
            >{slides[activeSlide].buttonText}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px' }}>
          {slides.map((_, i) => (
            <div key={i} className={`carousel-dot ${activeSlide === i ? 'active' : ''}`} onClick={() => setActiveSlide(i)} />
          ))}
        </div>
      </div>

      {/* COMPREHENSIVE GLASS MODAL FORM */}
      <div ref={overlayRef} className="glass-popup-overlay" style={{ display: 'none', opacity: 0 }} onClick={closeForm}>
        <div ref={modalRef} className="glass-popup" onClick={(e) => e.stopPropagation()}>
          <button onClick={closeForm} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
          
          <h3 style={{ color: slides[activeSlide].accent, fontSize: '2rem', marginBottom: '5px' }}>{slides[activeSlide].type} Form</h3>
          <p style={{ marginBottom: '35px', color: '#666', fontSize: '1rem' }}>
            {activeSlide === 0 ? "I want to join the academy" : "I want to book a demo class"}
          </p>
          
          <div className="apple-form-field">
            <label className="apple-form-label">Name *</label>
            <input type="text" className="apple-form-input" placeholder="Enter your full name" />
          </div>

          <div className="apple-form-field">
            <label className="apple-form-label">Phone Number *</label>
            <input type="text" className="apple-form-input" placeholder="+91 98765 43210" />
          </div>

          <div className="apple-form-field">
            <label className="apple-form-label">Age</label>
            <input type="text" className="apple-form-input" placeholder="Enter your age" />
          </div>

          <div className="apple-form-field">
            <label className="apple-form-label">Have you learned guitar before? *</label>
            <div className="apple-radio-group">
              <label className="apple-radio-item"><input type="radio" name="learned" /> Yes</label>
              <label className="apple-radio-item"><input type="radio" name="learned" /> No</label>
            </div>
          </div>

          <div className="apple-form-field">
            <label className="apple-form-label">Do you have a guitar? *</label>
            <div className="apple-radio-group">
              <label className="apple-radio-item"><input type="radio" name="guitar" /> Yes</label>
              <label className="apple-radio-item"><input type="radio" name="guitar" /> No</label>
            </div>
          </div>
          
          <button className="admission-btn" style={{ width: '100%', background: slides[activeSlide].btnColor }}>SUBMIT</button>
        </div>
      </div>
    </section>
  );
}
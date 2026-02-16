import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    text: "Yangerila Studio didn't just teach me how to use the software; it taught me how to think like a professional artist. The mentorship was invaluable.",
    author: '— Alex Chen, Character Animator at Stellar Games',
  },
  {
    text: 'The portfolio I built here opened doors I never thought possible. The instructors are industry masters who push you to be your absolute best.',
    author: '— Priya Singh, Environment Artist at Moonlit Forge',
  },
  {
    text: 'A truly transformative experience. I went from a hobbyist to a confident professional with a deep understanding of the entire creative pipeline.',
    author: '— Ben Carter, VFX Artist at Phoenix Digital',
  },
];

const Testimonials = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current.querySelectorAll('.testimonial-card').forEach(card => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section">
      <h2 className="section-title">What Our Alumni Say</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">{testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

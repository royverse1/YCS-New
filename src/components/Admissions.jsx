import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Admissions = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="admissions-section">
      <div className="admissions-content">
        <h2>Begin Your Journey</h2>
        <p>
          Your path to becoming a world-class digital artist starts here. We're looking for passionate, dedicated individuals ready to transform their creative potential into a professional career.
        </p>
        <button className="cta-button">Apply Now</button>
      </div>
    </section>
  );
};

export default Admissions;
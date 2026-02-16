import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { value: 1200, label: 'Graduates' },
  { value: 98, label: 'Percent Hired' },
  { value: 40, label: 'Industry Partners' },
];

const Stats = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll('.stat-item'), {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            sectionRef.current.querySelectorAll('.stat-number').forEach((el, index) => {
              const endValue = statsData[index].value;
              gsap.to(el, {
                innerText: endValue,
                duration: 2,
                ease: 'power1.inOut',
                snap: { innerText: 1 },
              });
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stats-section">
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-number">0</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Mantra() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  
  // The full updated paragraph
  const fullText = `Our Motto, "Always Performance Ready" defines our teaching approach, ensuring every student learns with performance in mind. From the very first weeks, students are guided to apply what they learn into real songs and musical pieces. Within just a couple of months, most students can confidently perform.`;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. PIN SECTION
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        // Increased slightly from 60% to 80% to account for the longer text
        end: window.innerWidth < 768 ? "+=80%" : "+=120%", 
        pin: true,
        scrub: 0.5, 
      });

      // 2. TYPING EFFECT
      gsap.to(textRef.current, {
        duration: 2,
        text: {
          value: fullText,
          delimiter: ""
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 10%", 
          end: window.innerWidth < 768 ? "+=80%" : "+=120%",
          scrub: 0.2,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mantra-container bg-black flex flex-col justify-center items-center px-6 py-10 md:px-20 min-h-screen">
      <h2 className="apple-mantra-title text-center text-3xl md:text-5xl font-bold tracking-tight mb-6 md:mb-12 text-white uppercase">
        Always Performance Ready
      </h2>
      
      <div className="apple-mantra-para w-full max-w-4xl text-center">
        <span className="motto-label block text-neon uppercase tracking-widest text-xs md:text-sm mb-4">The Vision</span>
        
        {/* Adjusted text size for the longer paragraph to ensure it fits mobile screens */}
        <p ref={textRef} className="typing-text text-white text-lg md:text-3xl font-medium leading-relaxed md:leading-snug">
          {/* Text injected here */}
        </p>
      </div>
    </section>
  );
}
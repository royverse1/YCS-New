import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Mantra() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const fullText = `"Always Performance Ready" defines our teaching approach, ensuring every student learns with performance in mind. Within just a couple of months, most students can confidently perform and make music a part of their soul.`;

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. PIN SECTION
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.5, 
      });

      // 2. FASTER TYPING (Targeting text property directly)
      gsap.to(textRef.current, {
        duration: 2,
        text: {
          value: fullText,
          delimiter: ""
        },
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 15%",
          end: "top -15%",
          scrub: 0.2,
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="mantra-container bg-black">
      <h2 className="apple-mantra-title">ALWAYS PERFORMANCE READY</h2>
      
      <div className="apple-mantra-para">
        <span className="motto-label">Our Motto</span>
        <p ref={textRef} className="typing-text text-white">
          {/* Text injected here */}
        </p>
      </div>
    </section>
  );
}
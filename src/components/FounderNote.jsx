/* src/components/FounderNote.jsx */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FounderNote() {
  const containerRef = useRef(null);
  const portraitRef = useRef(null);
  const bentoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Fixed trigger: 'top top' locks it precisely to the top of the viewport
          start: isMobile ? "top top" : "top 10%", 
          end: isMobile ? "+=250%" : "+=500%", 
          pin: true, 
          scrub: 1,
        }
      });

      // --- INITIAL STATE ---
      gsap.set(portraitRef.current, { 
        y: isMobile ? 0 : "100vh", 
        xPercent: isMobile ? 0 : -50, 
        left: isMobile ? "0" : "50%", 
        opacity: 1, 
        scale: 1
      });
      
      gsap.set(bentoRef.current, { 
        backgroundColor: isMobile ? "rgba(255, 255, 255, 0.03)" : "transparent", 
        borderColor: isMobile ? "rgba(255, 255, 255, 0.1)" : "transparent"
      });
      
      gsap.set(".founder-step-para, .signature-white", { 
        opacity: isMobile ? 1 : 0, 
        y: isMobile ? 0 : 20 
      });

      // --- ANIMATION LOGIC (PC ONLY) ---
      if (!isMobile) {
        tl.to(portraitRef.current, { 
          y: "-5%", 
          opacity: 1, 
          scale: 1,
          duration: 1.5,
          ease: "power2.out"
        })
        .to(".signature-white", { opacity: 1, y: -5, duration: 0.8 })
        .to(portraitRef.current, { 
          left: "8%", 
          xPercent: 0,
          scale: 0.9,
          duration: 2,
          ease: "power3.inOut"
        })
        .to(bentoRef.current, { 
          backgroundColor: "rgba(255, 255, 255, 0.03)", 
          borderColor: "rgba(255, 255, 255, 0.1)",
          duration: 1.5 
        }, "<")
        .to(".p1", { opacity: 1, y: 0, duration: 1 })
        .to(".quote-area", { opacity: 1, y: 0, duration: 1 })
        .to(".p2", { opacity: 1, y: 0, duration: 1 });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black flex items-center justify-center min-h-screen py-20 md:py-0 founder-section-wrapper">
      <div ref={bentoRef} className="bento-container relative flex flex-col md:flex-row items-center md:justify-end">
        
        {/* THE PORTRAIT */}
        <div ref={portraitRef} className="founder-portrait-card">
          <span className="text-zinc-800 uppercase tracking-widest text-xs font-bold">Founder Portrait</span>
          <div className="signature-white italic text-lg md:text-2xl">Micky Dixit</div>
        </div>

        {/* THE TEXT COLUMN */}
        <div className="founder-text-column">
          <p className="founder-step-para p1">
            I am among the <b>lucky few</b> who have had the opportunity to learn and pursue music since childhood. 
            In 2003, when the <b>guitar entered my life</b>, my journey changed forever. In my <b>20+ years as a guitarist</b>, 
            I’ve learned, played, and performed—but teaching has always had my heart.
          </p>
          
          <div className="founder-step-para quote-area founder-quote">
            "Music gave me wings, teaching gave me roots, and Yangerila is where we help students find both."
          </div>

          <p className="founder-step-para p2">
            At Yangerila, <b>with so much experience in teaching</b>, we designed unique programs that make learning accessible. 
            Often my students tell me how our classes feel <b>lively, interactive, and even more connected</b> than offline sessions. 
            Give us the opportunity to serve you, and I promise it will be one of the best decisions in your musical journey.
          </p>
        </div>
        
      </div>
    </section>
  );
}
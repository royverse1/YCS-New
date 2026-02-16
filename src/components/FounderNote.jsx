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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 10%", // Triggers earlier to prevent dead space
          end: "+=500%", 
          pin: true,
          scrub: 1,
        }
      });

      // --- INITIAL STATE ---
      gsap.set(portraitRef.current, { 
        y: "100vh", 
        xPercent: -50, 
        left: "50%", 
        opacity: 0,
        scale: 0.95
      });
      gsap.set(bentoRef.current, { 
        backgroundColor: "transparent", 
        borderColor: "transparent"
      });
      gsap.set(".founder-step-para, .signature-white", { opacity: 0 });

      // --- ACT 1: ENTRANCE (Portrait only, dead center, sitting higher) ---
      tl.to(portraitRef.current, { 
        y: "-5%", // Lifts higher on screen
        opacity: 1, 
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      })
      
      // --- ACT 2: SIGNATURE ---
      .to(".signature-white", { 
        opacity: 1, 
        y: -5, 
        duration: 0.8 
      })

      // --- ACT 3: SHIFT & BENTO REVEAL (Moves further left) ---
      .to(portraitRef.current, { 
        left: "8%", // Moved further left to clear text
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

      // --- ACT 4: SEQUENTIAL TEXT ---
      .to(".p1", { opacity: 1, y: 0, duration: 1 })
      .to(".quote-area", { opacity: 1, y: 0, duration: 1 })
      .to(".p2", { opacity: 1, y: 0, duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black flex items-center justify-center">
      <div ref={bentoRef} className="bento-container relative">
        
        {/* THE PORTRAIT */}
        <div ref={portraitRef} className="founder-portrait-card absolute">
          {/* Replace this span with your 780x1152 image tag */}
          <span className="text-zinc-800 uppercase tracking-widest text-xs font-bold">Founder Portrait</span>
          <div className="signature-white italic">Micky Dixit</div>
        </div>

        {/* THE TEXT COLUMN (Shifted Right) */}
        <div className="founder-text-column">
          <p className="founder-step-para p1">
            I am among the <b>lucky few</b> who have had the opportunity to learn and pursue music since childhood. 
            In 2003, when the <b>guitar entered my life</b>, my journey changed forever. In my <b>20+ years as a guitarist</b>, 
            I’ve learned, played, and performed—but teaching has always had my heart.
          </p>
          
          <div className="founder-step-para quote-area founder-quote text-xl">
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
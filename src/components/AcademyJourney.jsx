/* src/components/AcademyJourney.jsx */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AcademyJourney() {
  const containerRef = useRef(null);
  const assetRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=550%" : "+=750%", 
          pin: true,
          scrub: 1,
        }
      });

      // INITIAL STATE
      // PC is back to 14vh. Mobile is lowered to 35vh to prevent overlap.
      gsap.set(assetRef.current, { 
        y: isMobile ? "35vh" : "14vh", 
        scale: isMobile ? 0.4 : 1.1, 
        opacity: 0 
      });

      tl.to(".intro-group", { opacity: 1, duration: 2.5 })
        .to(assetRef.current, { opacity: 1, duration: 2.5 }, "<")

      .to(".intro-group", { opacity: 0, y: isMobile ? -100 : -100, duration: 2 })
      .to(assetRef.current, { 
        y: "0%", 
        scale: isMobile ? 0.35 : 0.75, 
        duration: 2.5,
        ease: "power2.inOut" 
      }, "<")
      .fromTo(".past-text", 
        { opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? 30 : 0 }, 
        { opacity: 1, x: isMobile ? 0 : 20, y: 0, duration: 1.5 }
      )

      .to(".past-text", { opacity: 0, duration: 1 })
      .to(assetRef.current, { 
        rotationY: 180, 
        backgroundColor: "#39FF14", 
        duration: 2 
      })
      .fromTo(".present-text", 
        { opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }, 
        { opacity: 1, x: 0, y: 0, duration: 1.5 }, 
        "<"
      )

      .to(".present-text", { opacity: 0, duration: 1 })
      .to(assetRef.current, { 
        y: isMobile ? "-15vh" : "-10vh", 
        // Fixed: Scale is not touched for Future section
        backgroundColor: "#fff", 
        duration: 2 
      })
      .fromTo(".future-group", 
        { opacity: 0, y: isMobile ? 20 : 30 }, 
        { opacity: 1, y: 0, duration: 1.5 }, 
        "<"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black relative overflow-hidden min-h-screen">
      
      {/* 1. INTRO GROUP - Locked to top: 15% for PC */}
      <div className="intro-group intro-text-centered px-6 absolute top-[10%] md:top-[15%] left-0 w-full z-30 text-center"> 
        <h2 className="mb-4 md:mb-12 text-white font-black tracking-tighter text-2xl md:text-7xl uppercase">
          About the Academy
        </h2>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
           <p className="text-zinc-300 text-[10px] md:text-xl leading-relaxed md:leading-[1.8] font-medium italic px-4">
            "Yangerila Creative Studio is a specialty academy providing carefully designed courses that transform passion into performance. We combine live interactive sessions with structured innovation, serving students across India and in 12+ countries worldwide."
          </p>
        </div>
      </div>

      {/* 2. MAIN JOURNEY LAYOUT - Restored to your original CSS column classes */}
      <div className="column-layout z-20">
        
        <div className="past-text opacity-0">
          <h3 className="text-zinc-500 font-bold mb-1 text-[10px] md:text-base">PAST</h3>
          <p className="max-w-[180px] md:max-w-[280px] text-zinc-400 text-[9px] md:text-base leading-tight">
            Founded in 2011 as <b>Rockford Academy Of Music</b>, born from Micky Dixit's vision to make guitar learning effective and progressive.
          </p>
        </div>
        
        <div className="flex justify-center items-center h-full">
          <div ref={assetRef} className="morph-engine-box">
            <span className="text-black font-black text-[6px] md:text-[10px] opacity-20 uppercase tracking-widest">
              YCS Asset
            </span>
          </div>
        </div>
        
        <div className="present-text opacity-0 text-right">
          <h3 className="text-neon font-bold mb-1 text-[10px] md:text-base">PRESENT</h3>
          <p className="text-zinc-400 text-[9px] md:text-base max-w-[180px] md:max-w-[280px] leading-tight">
            Rebranded in 2017 to Yangerila. Combining live interactive sessions with structured innovation.
          </p>
        </div>
      </div>

      {/* 3. FUTURE GROUP - Locked to bottom: 15% for PC */}
      <div className="future-group future-content-centered opacity-0 px-6 absolute bottom-[10%] md:bottom-[15%] left-0 w-full text-center z-30">
        <h3 className="text-white italic font-bold mb-2 text-sm md:text-2xl uppercase">Future</h3>
        <p className="future-paragraph text-[10px] md:text-xl font-medium text-zinc-300 max-w-[500px] mx-auto leading-tight">
          Transitioning to Yangerila Creative Studios, our upcoming app will bridge the gap between passion and performance for students worldwide.
        </p>
      </div>
    </section>
  );
}
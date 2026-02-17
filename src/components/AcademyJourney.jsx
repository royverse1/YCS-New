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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=750%", 
          pin: true,
          scrub: 1,
        }
      });

      // INITIAL STATE: Asset position and scale maintained from previous perfect setting.
      gsap.set(assetRef.current, { 
        y: "14vh", 
        scale: 1.1, 
        opacity: 0 
      });

      // 1. INTRO & ASSET APPEAR TOGETHER
      tl.to(".intro-group", { opacity: 1, duration: 2.5 })
        .to(assetRef.current, { opacity: 1, duration: 2.5 }, "<")

      // 2. INTRO FADE OUT & ASSET MOVES TO CENTER
      .to(".intro-group", { opacity: 0, y: -100, duration: 2 })
      .to(assetRef.current, { 
        y: "0%", 
        scale: 0.75, 
        duration: 2.5,
        ease: "power2.inOut" 
      }, "<")
      .fromTo(".past-text", 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 20, duration: 1.5 }
      )

      // 3. TRANSITION TO PRESENT
      .to(".past-text", { opacity: 0, x: 0, duration: 1 })
      .to(assetRef.current, { 
        rotationY: 180, 
        backgroundColor: "#39FF14", 
        duration: 2 
      })
      .fromTo(".present-text", 
        { opacity: 0, x: 50 }, 
        { opacity: 1, x: 0, duration: 1.5 }, 
        "<"
      )

      // 4. TRANSITION TO FUTURE
      .to(".present-text", { opacity: 0, x: 30, duration: 1 })
      .to(assetRef.current, { 
        y: "-10vh", 
        scale: 0.55, 
        backgroundColor: "#fff", 
        duration: 2 
      })
      .fromTo(".future-group", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.5 }, 
        "<"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black relative overflow-hidden">
      
      {/* 1. INTRO GROUP: Heading high and paragraph widened significantly past the heading width */}
      <div className="intro-group intro-text-centered px-6 !-mt-24"> 
        <h2 className="mb-12 text-white font-black tracking-tighter text-5xl md:text-7xl uppercase">
          About the Academy
        </h2>
        
        {/* Paragraph width increased to 1200px for maximum horizontal span */}
        <div style={{ maxWidth: '1200px', margin: '0 auto 4vh' }}>
           <p className="text-zinc-300 text-lg md:text-xl leading-[1.8] text-center font-medium italic">
            "Yangerila Creative Studio is a specialty academy providing carefully designed courses that transform passion into performance. We combine live interactive sessions with structured innovation, serving students across India and in 12+ countries worldwide."
          </p>
        </div>
      </div>

      <div className="column-layout z-20">
        <div className="past-text opacity-0">
          <h3 className="text-zinc-500 font-bold mb-2">PAST</h3>
          <p className="max-w-[280px] text-zinc-400">
            Founded in 2011 as <b>Rockford Academy Of Music</b>, born from Micky Dixit's vision to make guitar learning effective and progressive.
          </p>
        </div>
        
        {/* ASSET CONTAINER: Perfectly centered between the columns */}
        <div className="flex justify-center h-full items-center">
          <div ref={assetRef} className="morph-engine-box">
            <span className="text-black font-black text-[10px] opacity-20 uppercase tracking-widest">
              YCS Asset
            </span>
          </div>
        </div>
        
        <div className="present-text opacity-0 text-right">
          <h3 className="text-neon font-bold mb-2">PRESENT</h3>
          <p className="text-zinc-400">Rebranded in 2017 to Yangerila. Combining live interactive sessions with structured innovation.</p>
        </div>
      </div>

      <div className="future-group future-content-centered opacity-0 px-6">
        <h3 className="text-white italic font-bold mb-4">FUTURE</h3>
        <p className="future-paragraph text-lg md:text-xl font-medium text-zinc-300 max-w-5xl mx-auto">
          Transitioning to Yangerila Creative Studios, our upcoming app will bridge the gap between passion and performance for students worldwide.
        </p>
      </div>
    </section>
  );
}
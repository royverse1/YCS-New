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
          end: "+=700%", // Significantly longer scroll to let things stay
          pin: true,
          scrub: 1,
        }
      });

      gsap.set(assetRef.current, { y: "120%", scale: 1.2 });

      // 1. HOLD INTRO (Dead scroll space so text stays longer)
      tl.to(".intro-group", { opacity: 1, duration: 2.5 })

      // 2. INTRO FADE OUT (Higher exit)
      .to(".intro-group", { opacity: 0, y: -100, duration: 1.5 })
      .to(assetRef.current, { y: "0%", scale: 0.75, duration: 2 }, "<")
      .fromTo(".past-text", 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 20, duration: 1.5 }
      )

      // 3. TRANSITION TO PRESENT
      tl.to(".past-text", { opacity: 0, x: 0, duration: 1 })
        .to(assetRef.current, { rotationY: 180, backgroundColor: "#39FF14", duration: 2 })
        .fromTo(".present-text", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 }, "<")

      // 4. TRANSITION TO FUTURE
      tl.to(".present-text", { opacity: 0, x: 30, duration: 1 })
        .to(assetRef.current, { y: "-10vh", scale: 0.55, backgroundColor: "#fff", duration: 2 })
        .fromTo(".future-group", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.5 }, "<");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black">
      {/* Starting Higher via intro-text-centered CSS */}
      <div className="intro-group intro-text-centered">
        <h2 className="mb-4">About the Academy</h2>
        <p className="max-w-md text-zinc-400">A guitar-specialty academy redefining musical education.</p>
      </div>

      <div className="column-layout z-20">
        <div className="past-text opacity-0">
          <h3>PAST</h3>
          <p className="max-w-[280px]">
            Founded in 2011 as <b>Rockford Academy Of Music</b>, born from Micky Dixit's vision to make guitar learning effective and progressive.
          </p>
        </div>
        
        <div className="flex justify-center h-full">
          <div ref={assetRef} className="morph-engine-box">
            <span className="text-black font-black text-xs opacity-20 uppercase tracking-widest">3D Asset</span>
          </div>
        </div>
        
        <div className="present-text opacity-0 text-right">
          <h3>PRESENT</h3>
          <p>Rebranded in 2017 to Yangerila. Combining live interactive sessions with structured innovation.</p>
        </div>
      </div>

      <div className="future-group future-content-centered opacity-0">
        <h3 className="text-neon italic">FUTURE</h3>
        <p className="future-paragraph text-lg font-medium">
          Transitioning to Yangerila Creative Studios, our upcoming app will bridge the gap between passion and performance for students worldwide.
        </p>
      </div>
    </section>
  );
}
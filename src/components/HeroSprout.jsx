import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroSprout() {
  useEffect(() => {
    gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1.5, ease: "power4.out" });
  }, []);

  return (
    /* Added px-6 for mobile so text doesn't touch edges.
       Added min-h-[60vh] to give it presence on mobile screens.
    */
    <section className="flex flex-col items-center justify-center px-6 py-20 md:py-32 min-h-[50vh]">
      
      {/* text-5xl for mobile (~48px)
          md:text-8xl for PC (keeps your large original look)
          tracking-tighter to keep the "studio" feel 
      */}
      <h1 className="hero-title text-5xl md:text-8xl font-bold text-white text-center tracking-tighter uppercase">
        YANGERILA
      </h1>

      {/* The neon line: 
          h-12 for mobile, h-20 for PC 
      */}
      <div className="w-[1px] h-12 md:h-20 bg-neon mt-6 md:mt-10"></div>
      
    </section>
  );
}
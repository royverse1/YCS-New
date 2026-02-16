import { useEffect } from 'react';
import gsap from 'gsap';

export default function HeroSprout() {
  useEffect(() => {
    gsap.from(".hero-title", { y: 50, opacity: 0, duration: 1.5, ease: "power4.out" });
  }, []);
  return (
    <section className="flex-col">
      <h1 className="hero-title">YANGERILA</h1>
      <div className="w-[1px] h-20 bg-neon mt-10"></div>
    </section>
  );
}
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  { id: 1, title: "Acoustic Mastery", color: "#39FF14", desc: "Master the foundations of rhythm and fingerstyle." },
  { id: 2, title: "Electric Shred", color: "#7000ff", desc: "Advanced lead techniques and performance." },
  { id: 3, title: "Theory & Comp", color: "#ff00ff", desc: "Unlock the math behind the music." },
  { id: 4, title: "Performance Pro", color: "#00ffff", desc: "Stage presence and professional gear." },
];

export default function CourseFan() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [canCycle, setCanCycle] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            // Cycle only when visible
            setCanCycle(self.progress > 0.2 && self.progress < 0.8);
          }
        }
      });

      // 1. Initial Center Stack
      gsap.set(".course-card", { rotation: 0, x: 0, y: 0, opacity: 1 });

      // 2. Fan Animation
      tl.to(".course-card", {
        rotation: (i) => (i - 1.5) * 20,
        x: (i) => (i - 1.5) * 60,
        y: (i) => Math.abs(i - 1.5) * 15,
        duration: 1.5
      })
      // 3. 10% Open Exit (Stops cycling here)
      .to(".course-card", {
        rotation: (i) => (i - 1.5) * 3,
        x: (i) => (i - 1.5) * 10,
        opacity: 0.3,
        duration: 1
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isPaused && canCycle) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % courses.length);
      }, 3000);
    }
    return () => clearInterval(timerRef.current);
  }, [isPaused, canCycle]);

  useEffect(() => {
    if (!canCycle) return;
    courses.forEach((_, i) => {
      const card = `.card-${i}`;
      if (i === activeIdx) {
        gsap.to(card, { y: -80, scale: 1.1, zIndex: 100, duration: 0.5 });
      } else {
        const dist = Math.abs(i - activeIdx);
        gsap.to(card, { y: 0, scale: 0.9, zIndex: 10 - dist, duration: 0.5 });
      }
    });
  }, [activeIdx, canCycle]);

  return (
    <section ref={containerRef} className="curriculum-container bg-black">
      <div className="curriculum-header">
        <h2 className="font-black text-white">Our Curriculum</h2>
        <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2">Discover your path</p>
      </div>

      <div className="fan-stage">
        {courses.map((course, i) => (
          <div 
            key={course.id}
            className={`course-card card-${i} ${activeIdx === i && canCycle ? 'active-focus' : ''}`}
            onClick={() => { setIsPaused(true); setActiveIdx(i); }}
          >
            <div className="h-1.5 w-12 rounded-full mb-8" style={{ background: course.color }}></div>
            <h3 className="card-title text-white">{course.title}</h3>
            <p className="text-zinc-400 leading-relaxed mb-6">{course.desc}</p>
            <div className="mt-auto font-black text-white opacity-20 text-[11px] tracking-widest">
              COURSE 0{course.id}
            </div>
          </div>
        ))}
      </div>

      {isPaused && (
        <div className="glass-popup-overlay" onClick={() => setIsPaused(false)}>
          <div className="glass-popup" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-zinc-500 hover:text-white" onClick={() => setIsPaused(false)}>✕ Close</button>
            <h2 className="text-3xl font-black mb-6" style={{ color: courses[activeIdx].color }}>{courses[activeIdx].title}</h2>
            <p className="text-zinc-300 text-xl leading-relaxed">Detailed curriculum for {courses[activeIdx].title}. Designed to bridge the gap between passion and performance.</p>
            <button className="mt-12 bg-white text-black px-10 py-4 rounded-full font-bold">Enroll Now</button>
          </div>
        </div>
      )}
    </section>
  );
}
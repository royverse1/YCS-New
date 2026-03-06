import { useState } from 'react';

const courses = [
  { id: 1, title: "Acoustic Mastery", color: "#39FF14", desc: "Master the foundations of rhythm and fingerstyle guitar." },
  { id: 2, title: "Electric Shred", color: "#7000ff", desc: "Advanced lead techniques, speed, and stage performance." },
  { id: 3, title: "Theory & Comp", color: "#ff00ff", desc: "Unlock the math behind the music and start writing songs." },
  { id: 4, title: "Performance Pro", color: "#00ffff", desc: "Stage presence, professional gear management, and audio." },
];

export default function CourseFan() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <section className="curriculum-container bg-black flex items-center">
      <div className="curriculum-header">
        <h2 className="text-white">Our Curriculum</h2>
        <p className="text-zinc-500 uppercase tracking-widest text-xs mt-2">Precision & Passion</p>
      </div>

      <div className="curriculum-grid">
        {courses.map((course, i) => (
          <div 
            key={course.id}
            className="course-card-static"
            style={{ '--card-glow': `${course.color}44` }}
            onClick={() => { setSelectedIdx(i); setIsPopupOpen(true); }}
          >
            {/* Colored bar inside card */}
            <div className="card-accent-bar" style={{ background: course.color }}></div>
            
            <h3 className="text-white font-black text-2xl mb-4">{course.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{course.desc}</p>
            
            <div className="mt-auto">
              <span className="font-black text-white opacity-20 text-[11px] tracking-widest">
                MODULE 0{course.id}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="brochure-link">
        To know more about us and our courses, <a href="/brochure.pdf" target="_blank" rel="noreferrer">click here to download our brochure</a>.
      </div>

      {isPopupOpen && (
        <div className="glass-popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="glass-popup" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-8 right-8 text-zinc-500 hover:text-white" onClick={() => setIsPopupOpen(false)}>✕</button>
            <h2 className="text-3xl font-black mb-6" style={{ color: courses[selectedIdx].color }}>{courses[selectedIdx].title}</h2>
            <p className="text-zinc-300 text-lg leading-relaxed">Detailed curriculum for {courses[selectedIdx].title}. Designed to bridge the gap between passion and performance in a creative environment.</p>
            <button className="mt-12 bg-white text-black px-10 py-4 rounded-full font-bold">Enroll Now</button>
          </div>
        </div>
      )}
    </section>
  );
}
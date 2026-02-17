/* src/components/Testimonials.jsx */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Testimonials() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    { id: 1, name: "Amit Gulati", role: "Banker, Mati (UP)", text: "I work as a banker in a small rural town, and there are no proper music academies around here. I wanted to do something but it was impossible in my area. The online guitar classes helped me fill that gap. Now, I have something to do. I have wanted to learn guitar since college. I am happy to have joined. The group classes make me feel I am a part of something. I surprised my wife with a song when she visited me. It was nice. Honestly, I never thought this would be possible where I live.", color: "#39FF14" },
    { id: 2, name: "Maj. Amit Bhusan", role: "Indian Army", text: "I wanted my son to enroll for music classes but I had to relocate a lot due to transfers. It didn't work out for quite some time. Then I got him into Yangerila. That problem is gone. No matter where we move, the classes stay consistent. My son doesn't lose track anymore, and the backup classes are helpful too. I'm thankful that he can continue his learning smoothly without interruption. He enjoys the classes a lot. Many of my colleagues and their kids have also enrolled. Overall, a very satisfactory experience with Micky Sir and his team.", color: "#00ffff" },
    { id: 3, name: "Aarav Menon", role: "Student, Canada", text: "I joined during my uni break for about two months when I was visiting home. Didn't expect much in such a short time, but I had a blast. Since then I have continued my classes even after coming to campus. I tried taking classes here in Canada but couldn't connect with the western teaching style. The best part about these classes is the progress. Sir really pushed me but in a fun way. I look forward to joining again offline when I get back. But online classes work great too.", color: "#7000ff" },
    { id: 4, name: "Tanvi Verma", role: "Working Professional, Bangalore", text: "The demo class itself made me realize this was different. Micky Sir actually explained what to expect, the struggles, and how long it might take—it felt honest. Classes are super interactive, and everything's neatly organized for you. Sheets and recordings are shared. I usually don't stick to things for long, but here I've been consistent. I enjoy taking the guitar on trips and playing for others. I’ve started my own Instagram within a year of joining.", color: "#ff00ff" },
    { id: 5, name: "Saloni Sanjay Khanna", role: "Homemaker, Lucknow", text: "I'm a homemaker in my 30s and had plenty of free time during the day. I wanted to do something creative for myself, and learning guitar was always a dream. Yangerila's online classes fit perfectly into my routine. I can attend from home and practice in my free time. Now, I can confidently play and sing songs. It feels amazing. I'm also planning to start my son's classes soon. The easy monthly fee made me comfortable to begin, as I wasn't sure at first. I'm so glad I joined.", color: "#00ffff" }
  ];

  // Truly infinite duplication
  const infiniteReviews = [...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews, ...reviews];

  useEffect(() => {
    // CALIBRATED FOR ULTRA-SLOW CHRONICLE MOVEMENT
    const scroll1 = gsap.to(row1Ref.current, { xPercent: -50, repeat: -1, duration: 250, ease: "none" });
    const scroll2 = gsap.to(row2Ref.current, { xPercent: 50, repeat: -1, duration: 280, ease: "none" });

    const rows = document.querySelectorAll('.testi-row-active');
    rows.forEach(row => {
      row.onmouseenter = () => { scroll1.pause(); scroll2.pause(); };
      row.onmouseleave = () => { scroll1.play(); scroll2.play(); };
    });
    return () => { scroll1.kill(); scroll2.kill(); };
  }, []);

  const closeModal = () => {
    gsap.to(modalRef.current, { scale: 0.8, opacity: 0, duration: 0.3 });
    gsap.to(overlayRef.current, { opacity: 0, display: 'none', duration: 0.3, onComplete: () => setSelectedReview(null) });
  };

  const TestiCard = ({ item }) => {
    const summary = item.text.split(' ').slice(0, 18).join(' ') + "...";
    return (
      <div className="testi-item-container" onClick={() => {
        setSelectedReview(item);
        gsap.to(overlayRef.current, { display: 'flex', opacity: 1, duration: 0.3 });
        gsap.fromTo(modalRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 });
      }}>
        <div className="testi-card-inner">
          <div className="testi-border-glow" style={{ '--accent': item.color }}></div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ color: '#eee', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '25px', fontStyle: 'italic' }}>
              "{summary}" <span style={{ color: item.color, fontWeight: 900, fontSize: '0.7rem' }}>READ MORE</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#222' }}>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`} alt="avatar" style={{ width: '100%' }} />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>{item.name}</h4>
                <p style={{ color: item.color, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', margin: '4px 0 0' }}>{item.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonial-wall">
      <div className="testi-header-container">
        <h2 style={{ color: '#fff' }}>Testimonials.</h2>
        <p style={{ color: '#222', marginTop: '5px', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', width: '100%' }}>Real Artists. Real Progress.</p>
      </div>

      <div className="marquee-wrapper testi-row-active">
        <div ref={row1Ref} className="marquee-strip">
          {infiniteReviews.map((item, i) => <TestiCard key={i} item={item} />)}
        </div>
      </div>

      <div className="marquee-wrapper testi-row-active" style={{ marginTop: '0px' }}>
        <div ref={row2Ref} className="marquee-strip" style={{ transform: 'translateX(-50%)' }}>
          {infiniteReviews.map((item, i) => <TestiCard key={i} item={item} />)}
        </div>
      </div>

      <div ref={overlayRef} className="glass-popup-overlay" style={{ display: 'none', opacity: 0 }} onClick={closeModal}>
        <div ref={modalRef} className="glass-popup" onClick={(e) => e.stopPropagation()}>
          <button onClick={closeModal} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
          {selectedReview && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' }}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedReview.name}`} alt="avatar" style={{ width: '100%' }} />
                </div>
                <div>
                  <h3 style={{ color: '#fff', margin: 0, textTransform: 'uppercase', fontWeight: 900 }}>{selectedReview.name}</h3>
                  <p style={{ color: selectedReview.color, margin: '5px 0 0', fontWeight: 'bold', textTransform: 'uppercase' }}>{selectedReview.role}</p>
                </div>
              </div>
              <p style={{ color: '#ccc', fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>"{selectedReview.text}"</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
/* src/components/FAQ.jsx */
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(null);
  const answerRefs = useRef([]);

  const faqData = [
    {
      category: "Referral Reward",
      questions: [
        { q: "How do I claim my INR 1,000 Amazon Gift Card?", a: "Once your referred student completes their first month, the digital gift card is sent to your registered email." },
        { q: "Is there a limit to referrals?", a: "No limit. You receive a new card for every successful enrollment." },
        { q: "Can I refer family members?", a: "Yes, family referrals qualify as long as they are new students." },
        { q: "Do gift cards expire?", a: "Standard Amazon India terms apply, usually valid for one year." },
        { q: "How long does verification take?", a: "Verification usually takes 3-5 business days after the first month's fee is cleared." }
      ]
    },
    {
      category: "United We Stand",
      questions: [
        { q: "How many students qualify as a group?", a: "A group of 3 or more students joining together qualifies for the 30% discount." },
        { q: "Does the discount apply every month?", a: "Yes, as long as the group remains active, the discount stays." },
        { q: "Can we be in different courses?", a: "Yes. You just need to enroll at the same time to activate the benefit." },
        { q: "What if one member leaves?", a: "If the group falls below 3, the fee reverts to the standard individual rate." },
        { q: "Is this valid for online students?", a: "Yes, it applies to both physical and virtual classroom tracks." }
      ]
    },
    {
      category: "Student Referral",
      questions: [
        { q: "How is the 50% discount applied?", a: "It is applied to your very next monthly fee cycle after successful enrollment." },
        { q: "Can I refer two students in one month?", a: "Yes! You can get 100% off for one month or 50% off for two consecutive months." },
        { q: "Is this available for all instruments?", a: "Yes, this covers all musical and creative courses at Yangerila." },
        { q: "Does the referral need to stay long-term?", a: "The benefit unlocks as soon as their enrollment is finalized and the first fee is cleared." },
        { q: "Can I choose between the cash reward and the discount?", a: "Student Referral focuses on fee reduction; Referral Reward focuses on Amazon Gift cards." }
      ]
    },
    {
      category: "Festive Discount",
      questions: [
        { q: "When does the Diwali 2025 offer start?", a: "Festive enrollments usually open 15 days prior to the festival date." },
        { q: "Is this for new students only?", a: "It includes new enrollment waivers and sometimes loyalty bonuses for existing students." },
        { q: "Can I club this with Group Discounts?", a: "Festive offers are standalone specials and cannot be clubbed with other programs." },
        { q: "Are workshops covered?", a: "Seasonal discounts often cover both regular courses and short-term workshops." },
        { q: "How do I get the promo code?", a: "Follow our social media or check your email for early access codes." }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    const isOpening = openQuestion !== index;
    if (openQuestion !== null) {
      gsap.to(answerRefs.current[openQuestion], { height: 0, opacity: 0, duration: 0.4, ease: "power2.inOut" });
    }
    setOpenQuestion(isOpening ? index : null);
    if (isOpening) {
      gsap.to(answerRefs.current[index], { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" });
    }
  };

  useEffect(() => {
    setOpenQuestion(null);
    answerRefs.current.forEach(el => { if (el) gsap.set(el, { height: 0, opacity: 0 }); });
  }, [activeTab]);

  return (
    <section style={{ background: '#000', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '80px', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: '900' }}>QUESTIONS?</h2>
        
        {/* TABS (4 Categories) */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '60px', paddingBottom: '20px' }}>
          {faqData.map((item, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ background: 'none', border: 'none', color: activeTab === i ? '#fff' : '#666', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', position: 'relative', padding: '10px 15px', transition: 'color 0.3s' }}>
              {item.category}
              {activeTab === i && <div style={{ position: 'absolute', bottom: '-21px', left: 0, width: '100%', height: '2px', background: '#fff' }}></div>}
            </button>
          ))}
        </div>

        {/* ACCORDION (Centered) */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {faqData[activeTab].questions.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => toggleQuestion(i)} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
                <span style={{ color: '#fff', fontSize: '1.2rem', fontWeight: '600', opacity: openQuestion === i ? 1 : 0.7 }}>{item.q}</span>
              </button>
              <div ref={el => answerRefs.current[i] = el} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
                <div style={{ margin: '0 0 30px 0', padding: '40px', background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)', borderRadius: '24px', textAlign: 'center' }}>
                  <p style={{ color: '#999', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '80%', margin: '0 auto', lineHeight: '1.6' }}>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
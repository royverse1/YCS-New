/* src/components/ContactFooter.jsx */
export default function ContactFooter() {
  return (
    <section style={{ background: '#000', padding: '100px 0', height: 'auto', minHeight: '100vh' }}>
      <div className="contact-glass-card">
        {/* SUBTLE CLOUDY GRADIENT */}
        <div className="cloudy-bg"></div>

        {/* LEFT PANEL: READY? */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', marginBottom: '5px', letterSpacing: '-0.03em' }}>
            Ready?
          </h2>
          <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: '30px', fontWeight: 400 }}>
            Let's start your guitar journey.
          </p>
          
          <div className="contact-map-box">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14007.019881346336!2d77.36214500000001!3d28.637105!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54cb439dd9d%3A0xab7240728eab6db3!2sYangerila%20-%20A%20Guitar%20Specialty%20Academy!5e0!3m2!1sen!2sin!4v1771312370849!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)' }} 
              allowFullScreen="" 
              loading="lazy" 
            ></iframe>
          </div>

          <div className="contact-info-block">
            <div className="contact-icon-item">
              <span style={{ fontSize: '1.2rem' }}>📱</span> +91 8076 530 550
            </div>
            <div className="contact-icon-item">
              <span style={{ fontSize: '1.2rem' }}>📧</span> care@yangerila.com
            </div>
            <div className="contact-icon-item">
              <span style={{ fontSize: '1.2rem' }}>📍</span> Indirapuram, Ghaziabad
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: NEED HELP? FORM */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '40px', fontWeight: 700, textTransform: 'none' }}>
            Need help? Let us call you.
          </h3>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div style={{ marginBottom: '25px' }}>
              <p style={{ color: '#777', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Full Name *</p>
              <input type="text" className="apple-input-field" placeholder="Enter your full name" />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ color: '#777', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Phone number *</p>
              <input type="text" className="apple-input-field" placeholder="+91 98765 43210" />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ color: '#777', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Topic of Interest</p>
              <select className="apple-input-field" style={{ appearance: 'none', background: 'transparent', width: '100%' }}>
                <option value="" disabled selected>Select an option</option>
                <option value="admission">Admission Query</option>
                <option value="demo">Book Demo Session</option>
                <option value="other">General Support</option>
              </select>
            </div>

            <div style={{ marginBottom: '35px' }}>
              <p style={{ color: '#777', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>Message</p>
              <textarea className="apple-input-field" rows="1" placeholder="How can we help?"></textarea>
            </div>

            <button type="submit" className="apple-submit-btn">Submit Request</button>
          </form>
        </div>
      </div>
    </section>
  );
}
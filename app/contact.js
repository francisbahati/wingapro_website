'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setSubmitted(true);
  };
//mfuko
  return (
    <section className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>We’d love to hear from you</h3>
            <p>Reach out for support, inquiries, or feedback.</p>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>support@wingapro.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+255 762 040 592</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Dar es Salaam, Tanzania</span>
            </div>
          </div>
          <div className="contact-form">
            {submitted ? (
              <p className="success">✅ Your message has been sent. We’ll get back to you soon.</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <textarea
                  placeholder="Your Message *"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
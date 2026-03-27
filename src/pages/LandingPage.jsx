import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [patients, setPatients] = useState(0);
  const [matchTime, setMatchTime] = useState(0);
  const [rating, setRating] = useState(0);

  const featuresRef = useRef(null);
  const howRef = useRef(null);
  const doctorsRef = useRef(null);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Count up animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const patientsTarget = 50;
    const matchTarget = 2;
    const ratingTarget = 4.9;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      setPatients(Math.round(patientsTarget * progress));
      setMatchTime(Math.round(matchTarget * progress * 10) / 10);
      setRating(Math.round(ratingTarget * progress * 10) / 10);

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(
              ".feature-card, .doctor-card, .step",
            );
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 150);
            });

            if (
              entry.target.classList.contains("how-image-container") ||
              entry.target.classList.contains("testimonial-inner") ||
              entry.target.classList.contains("cta-content") ||
              entry.target.classList.contains("cta-image-container")
            ) {
              entry.target.classList.add("visible");
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howRef.current) {
      observer.observe(howRef.current.querySelector(".how-image-container"));
      observer.observe(howRef.current.querySelector(".steps"));
    }
    if (doctorsRef.current) observer.observe(doctorsRef.current);
    if (testimonialRef.current) observer.observe(testimonialRef.current);
    if (ctaRef.current) {
      observer.observe(ctaRef.current.querySelector(".cta-content"));
      observer.observe(ctaRef.current.querySelector(".cta-image-container"));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <a href="#" className="navbar-logo">
          CareLink
        </a>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#doctors">Doctors</a>
        </div>
        <div className="navbar-actions">
          <Link to="/login" className="btn-login">
            Login
          </Link>
          <Link to="/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="pulse-dot"></span>
            HIPAA COMPLIANT CARE
          </div>
          <h1 className="hero-title">
            Your Doctor is Just a <span className="highlight">Tap Away</span>
          </h1>
          <p className="hero-subtitle">
            Access urgent nighttime care and safe medical consultations from the
            comfort of your home. Connect with licensed professionals in
            minutes, anytime you need support.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">
              Get Started
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <button className="btn-secondary">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
              </svg>
              Watch Video
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">{patients}K+</div>
              <div className="stat-label">Patients Treated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{matchTime}min</div>
              <div className="stat-label">Avg. Match Time</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{rating}</div>
              <div className="stat-label">User Rating</div>
            </div>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80&fit=crop"
            alt="Doctor"
            className="hero-image"
          />
          <div className="floating-card floating-card-1">
            <div className="floating-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div className="floating-text">
              <strong>Connecting...</strong>
              <span>Dr. Sarah Jenkins is available now</span>
            </div>
          </div>
          <div className="floating-card floating-card-2">
            <div className="floating-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="floating-text">
              <strong>Verified Doctor</strong>
              <span>Board Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="trust-bar">
        <div className="trust-marquee">
          <div className="trust-items">
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              HIPAA Compliant
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Licensed Medical Professionals
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              ISO 27001 Certified
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
              4.9/5 User Rating
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" stroke="#061412" strokeWidth="2" />
              </svg>
              24/7 Availability
            </div>
          </div>
          <div className="trust-items">
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              HIPAA Compliant
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              Licensed Medical Professionals
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              ISO 27001 Certified
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
              4.9/5 User Rating
            </div>
            <div className="trust-item">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" stroke="#061412" strokeWidth="2" />
              </svg>
              24/7 Availability
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features" ref={featuresRef}>
        <div className="section-header">
          <div className="section-eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Features
          </div>
          <h2 className="section-title">Precision Care Built for You</h2>
          <p className="section-subtitle">
            Our technology bridge creates a seamless connection between your
            health needs and professional medical advice.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop"
              alt="AI Nurse"
              className="feature-image"
            />
            <div className="feature-content">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z" />
                  <path d="M19 10v2a7 7 0 01-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </div>
              <h3 className="feature-title">AI Nurse Intake</h3>
              <p className="feature-description">
                Voice-based symptom collection that understands you naturally,
                summarizing your needs for the doctor instantly.
              </p>
              <a href="#" className="feature-link">
                Learn more
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80&fit=crop"
              alt="24/7 Matching"
              className="feature-image"
            />
            <div className="feature-content">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h3 className="feature-title">24/7 Matching</h3>
              <p className="feature-description">
                Skip the waiting room. Connect with board-certified doctors in
                under 15 minutes, day or night.
              </p>
              <a href="#" className="feature-link">
                See availability
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          <div className="feature-card">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80&fit=crop"
              alt="Smart Prescriptions"
              className="feature-image"
            />
            <div className="feature-content">
              <div className="feature-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z" />
                </svg>
              </div>
              <h3 className="feature-title">Smart Prescriptions</h3>
              <p className="feature-description">
                Automated medication management with reminders and direct
                pharmacy fulfillment integration.
              </p>
              <a href="#" className="feature-link">
                View pharmacy network
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how-it-works" ref={howRef}>
        <div className="how-it-works-inner">
          <div className="how-image-container">
            <img
              src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80&fit=crop"
              alt="How it works"
              className="how-image"
            />
            <div className="live-badge">
              <span className="live-dot"></span>
              Dr. Sarah is available
            </div>
          </div>
          <div className="how-content">
            <h2 className="section-title">Simple, Seamless, Secure</h2>
            <div className="steps">
              <div className="step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h4>Tell the AI Nurse</h4>
                  <p>
                    Explain your symptoms via voice or text. Our secure AI
                    organizes your info for the physician.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4>Match with a Doctor</h4>
                  <p>
                    Get paired with a licensed professional specialized in your
                    specific health concerns within minutes.
                  </p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4>Receive Care</h4>
                  <p>
                    Consult via high-quality video call and receive your
                    treatment plan and digital prescriptions immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="doctors" id="doctors" ref={doctorsRef}>
        <div className="section-header">
          <div className="section-eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Our Doctors
          </div>
          <h2 className="section-title">Meet Our Top Specialists</h2>
          <p className="section-subtitle">
            Board-certified physicians ready to provide you with expert care
            anytime, anywhere.
          </p>
        </div>
        <div className="doctors-grid">
          <div className="doctor-card">
            <div className="doctor-image-container">
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80&fit=crop&crop=faces"
                alt="Dr. James Wilson"
                className="doctor-image"
              />
              <span className="doctor-specialty">Cardiologist</span>
            </div>
            <div className="doctor-content">
              <h3 className="doctor-name">Dr. James Wilson</h3>
              <div className="doctor-info">
                <span>15 years exp.</span>
                <span className="doctor-rating">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  4.9
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>₦70,000</strong>/session
                </div>
                <button className="btn-book">Book Now</button>
              </div>
            </div>
          </div>
          <div className="doctor-card">
            <div className="doctor-image-container">
              <img
                src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&fit=crop&crop=faces"
                alt="Dr. Sarah Chen"
                className="doctor-image"
              />
              <span className="doctor-specialty">Dermatologist</span>
            </div>
            <div className="doctor-content">
              <h3 className="doctor-name">Dr. Sarah Chen</h3>
              <div className="doctor-info">
                <span>12 years exp.</span>
                <span className="doctor-rating">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  4.8
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>₦80,000</strong>/session
                </div>
                <button className="btn-book">Book Now</button>
              </div>
            </div>
          </div>
          <div className="doctor-card">
            <div className="doctor-image-container">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&fit=crop&crop=faces"
                alt="Dr. Michael Park"
                className="doctor-image"
              />
              <span className="doctor-specialty">General Practice</span>
            </div>
            <div className="doctor-content">
              <h3 className="doctor-name">Dr. Michael Park</h3>
              <div className="doctor-info">
                <span>10 years exp.</span>
                <span className="doctor-rating">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  4.9
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>₦55,000</strong>/session
                </div>
                <button className="btn-book">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial" ref={testimonialRef}>
        <div className="testimonial-inner">
          <p className="testimonial-quote">
            "CareLink connected me with a specialist at 2 AM when my daughter
            had a high fever. Within 15 minutes, we had a diagnosis and
            prescription sent to our local pharmacy. This service is a
            lifesaver."
          </p>
          <div className="testimonial-author">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=faces"
              alt="Emily Rodriguez"
              className="testimonial-avatar"
            />
            <div className="testimonial-info">
              <div className="testimonial-name">Emily Rodriguez</div>
              <div className="testimonial-role">
                Mother of two, San Francisco
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" ref={ctaRef}>
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready for Better Health?
              <br />
              Join CareLink Today.
            </h2>
            <p className="cta-subtitle">
              Thousands of patients trust CareLink for their immediate health
              needs. Secure your first consultation now.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn-primary">
                Get Started Now
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#" className="btn-outline-dark">
                View Pricing
              </a>
            </div>
          </div>
          <div className="cta-image-container">
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&fit=crop"
              alt="Healthcare"
              className="cta-image"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-logo">CareLink</div>
            <div className="footer-links">
              <div className="footer-column">
                <h5>Product</h5>
                <a href="#">Features</a>
                <a href="#">Pricing</a>
                <a href="#">For Doctors</a>
                <a href="#">For Patients</a>
              </div>
              <div className="footer-column">
                <h5>Company</h5>
                <a href="#">About Us</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
                <a href="#">Contact</a>
              </div>
              <div className="footer-column">
                <h5>Support</h5>
                <a href="#">Help Center</a>
                <a href="#">Safety</a>
                <a href="#">Community</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2024 CareLink Health. All rights reserved.
            </div>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
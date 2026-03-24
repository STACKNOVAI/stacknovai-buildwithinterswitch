import { useState, useEffect, useRef } from 'react'

const css = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #FAFDFB;
    color: #0A1628;
    overflow-x: hidden;
  }

  .landing-page {
    overflow-x: hidden;
  }

  /* Navbar */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    background: transparent;
  }

  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
  }

  .navbar-logo {
    font-family: 'Instrument Serif', serif;
    font-size: 28px;
    color: #16A34A;
    text-decoration: none;
    font-weight: 400;
  }

  .navbar-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .navbar-links a {
    color: #0A1628;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    transition: color 0.2s;
  }

  .navbar-links a:hover {
    color: #16A34A;
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .btn-login {
    color: #0A1628;
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 20px;
    transition: color 0.2s;
  }

  .btn-login:hover {
    color: #16A34A;
  }

  .btn-primary {
    background: #16A34A;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 50px;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .btn-primary:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(22, 163, 74, 0.3);
  }

  .btn-primary:active {
    transform: scale(0.98);
  }

  .btn-secondary {
    background: transparent;
    color: #0A1628;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    padding: 12px 24px;
    border-radius: 50px;
    border: 1.5px solid #E5E7EB;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .btn-secondary:hover {
    border-color: #16A34A;
    color: #16A34A;
  }

  .btn-outline-dark {
    background: transparent;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }

  .btn-outline-dark:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  /* Global fallback for scroll animations - ensures content always shows */
  .features-grid,
  .how-it-works-inner,
  .doctors-grid,
  .testimonial-inner,
  .cta-card {
    animation: forceVisible 0.8s ease 0.6s both;
  }
  
  @keyframes forceVisible {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Hero Section */
  .hero {
    min-height: auto;
    padding: 120px 24px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    max-width: 1280px;
    margin: 0 auto;
    align-items: center;
  }

  .hero-content {
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #F0FDF4;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    color: #16A34A;
    margin-bottom: 24px;
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background: #16A34A;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  .hero-title {
    font-family: 'Instrument Serif', serif;
    font-size: 56px;
    line-height: 1.1;
    margin-bottom: 24px;
    font-weight: 400;
  }

  .hero-title .highlight {
    color: #16A34A;
    font-style: italic;
  }

  .hero-subtitle {
    font-size: 18px;
    color: #6B7280;
    line-height: 1.7;
    margin-bottom: 32px;
    max-width: 480px;
  }

  .hero-buttons {
    display: flex;
    gap: 16px;
    margin-bottom: 48px;
  }

  .hero-stats {
    display: flex;
    gap: 48px;
  }

  .stat-item {
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .stat-item:nth-child(1) { animation-delay: 0.3s; }
  .stat-item:nth-child(2) { animation-delay: 0.4s; }
  .stat-item:nth-child(3) { animation-delay: 0.5s; }

  .stat-number {
    font-family: 'Instrument Serif', serif;
    font-size: 36px;
    color: #16A34A;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 14px;
    color: #6B7280;
  }

  .hero-image-container {
    position: relative;
    opacity: 0;
    animation: fadeUp 0.8s ease 0.2s forwards;
    border-radius: 24px;
    overflow: hidden;
    background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
  }

  .hero-image {
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 24px;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.15);
    display: block;
    background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);
  }

  .hero-image::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 40%;
    background: linear-gradient(to right, #FAFDFB, transparent);
    pointer-events: none;
  }

  .floating-card {
    position: absolute;
    background: white;
    border-radius: 16px;
    padding: 16px 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    gap: 12px;
    animation: float 4s ease-in-out infinite;
  }

  .floating-card-1 {
    bottom: 80px;
    left: -40px;
    animation-delay: 0s;
  }

  .floating-card-2 {
    top: 100px;
    right: -30px;
    animation-delay: 2s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  .floating-icon {
    width: 44px;
    height: 44px;
    background: #F0FDF4;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16A34A;
  }

  .floating-text strong {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .floating-text span {
    font-size: 13px;
    color: #6B7280;
  }

  /* Trust Bar */
  .trust-bar {
    background: #061412;
    padding: 24px 0;
    overflow: hidden;
  }

  .trust-marquee {
    display: flex;
    animation: marquee 30s linear infinite;
  }

  .trust-items {
    display: flex;
    gap: 48px;
    padding: 0 24px;
    flex-shrink: 0;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .trust-item svg {
    color: #16A34A;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* Features Section */
  .features {
    padding: 100px 24px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #F0FDF4;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
    color: #16A34A;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .section-title {
    font-family: 'Instrument Serif', serif;
    font-size: 44px;
    margin-bottom: 16px;
    font-weight: 400;
  }

  .section-subtitle {
    font-size: 18px;
    color: #6B7280;
    max-width: 600px;
    margin: 0 auto;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .feature-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
    position: relative;
  }

  .feature-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .feature-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .feature-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #16A34A;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .feature-card:hover::after {
    transform: scaleX(1);
  }

  .feature-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .feature-content {
    padding: 28px;
  }

  .feature-icon {
    width: 52px;
    height: 52px;
    background: #F0FDF4;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #16A34A;
    margin-bottom: 20px;
  }

  .feature-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .feature-description {
    font-size: 15px;
    color: #6B7280;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .feature-link {
    color: #16A34A;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s;
  }

  .feature-link:hover {
    gap: 10px;
  }

  /* How it Works */
  .how-it-works {
    background: #061412;
    padding: 100px 24px;
  }

  .how-it-works-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .how-image-container {
    position: relative;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
  }

  .how-image-container.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .how-image {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 24px;
  }

  .live-badge {
    position: absolute;
    top: 24px;
    left: 24px;
    background: white;
    padding: 10px 16px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .live-dot {
    width: 10px;
    height: 10px;
    background: #16A34A;
    border-radius: 50%;
    animation: pulse 1.5s ease-in-out infinite;
  }

  .how-content {
    color: white;
  }

  .how-content .section-title {
    color: white;
    text-align: left;
    margin-bottom: 48px;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .step {
    display: flex;
    gap: 24px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
  }

  .step.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .step-number {
    width: 52px;
    height: 52px;
    background: rgba(22, 163, 74, 0.15);
    border: 2px solid #16A34A;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Instrument Serif', serif;
    font-size: 22px;
    color: #16A34A;
    flex-shrink: 0;
  }

  .step-content h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .step-content p {
    font-size: 15px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.6;
  }

  /* Doctors Section */
  .doctors {
    padding: 100px 24px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .doctors-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .doctor-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(30px);
  }

  .doctor-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .doctor-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .doctor-image-container {
    position: relative;
    overflow: hidden;
  }

  .doctor-image {
    width: 100%;
    height: 280px;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .doctor-card:hover .doctor-image {
    transform: scale(1.05);
  }

  .doctor-specialty {
    position: absolute;
    top: 16px;
    left: 16px;
    background: white;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    color: #16A34A;
  }

  .doctor-content {
    padding: 24px;
  }

  .doctor-name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .doctor-info {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #6B7280;
  }

  .doctor-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #F59E0B;
  }

  .doctor-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid #F3F4F6;
  }

  .doctor-price {
    font-size: 14px;
    color: #6B7280;
  }

  .doctor-price strong {
    font-size: 18px;
    color: #0A1628;
  }

  .btn-book {
    background: #F0FDF4;
    color: #16A34A;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-book:hover {
    background: #16A34A;
    color: white;
  }

  /* Testimonial */
  .testimonial {
    background: #061412;
    padding: 100px 24px;
  }

  .testimonial-inner {
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }

  .testimonial-inner.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Fallback: if JS fails to add visible class, show content after delay */
  .testimonial-inner {
    animation: forceVisible 0.8s ease 0.5s forwards;
  }
  
  @keyframes forceVisible {
    to { opacity: 1; transform: translateY(0); }
  }

  .testimonial-quote {
    font-family: 'Instrument Serif', serif;
    font-size: 36px;
    color: white;
    line-height: 1.4;
    margin-bottom: 40px;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .testimonial-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    object-fit: cover;
  }

  .testimonial-info {
    text-align: left;
  }

  .testimonial-name {
    font-size: 16px;
    font-weight: 600;
    color: white;
    margin-bottom: 4px;
  }

  .testimonial-role {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
  }

  /* CTA Section */
  .cta {
    padding: 100px 24px;
    max-width: 1280px;
    margin: 0 auto;
  }

  .cta-card {
    background: #061412;
    border-radius: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }

  .cta-content {
    padding: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    opacity: 0;
    transform: translateX(-30px);
    transition: all 0.8s ease;
  }

  .cta-content.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .cta-title {
    font-family: 'Instrument Serif', serif;
    font-size: 40px;
    color: white;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .cta-subtitle {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
    line-height: 1.6;
  }

  .cta-buttons {
    display: flex;
    gap: 16px;
  }

  .cta-image-container {
    opacity: 0;
    transform: translateX(30px);
    transition: all 0.8s ease;
  }

  .cta-image-container.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .cta-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Footer */
  .footer {
    background: #F8F9FA;
    padding: 60px 24px 24px;
  }

  .footer-inner {
    max-width: 1280px;
    margin: 0 auto;
  }

  .footer-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 48px;
    flex-wrap: wrap;
    gap: 32px;
  }

  .footer-logo {
    font-family: 'Instrument Serif', serif;
    font-size: 28px;
    color: #16A34A;
  }

  .footer-links {
    display: flex;
    gap: 48px;
  }

  .footer-column h5 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
    color: #0A1628;
  }

  .footer-column a {
    display: block;
    font-size: 14px;
    color: #6B7280;
    text-decoration: none;
    margin-bottom: 12px;
    transition: color 0.2s;
  }

  .footer-column a:hover {
    color: #16A34A;
  }

  .footer-bottom {
    padding-top: 24px;
    border-top: 1px solid #E5E7EB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-copyright {
    font-size: 14px;
    color: #6B7280;
  }

  .footer-legal {
    display: flex;
    gap: 24px;
  }

  .footer-legal a {
    font-size: 14px;
    color: #6B7280;
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-legal a:hover {
    color: #16A34A;
  }

  /* Animations */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Mobile Responsive */
  /* ── TABLET (max 1024px) ── */
  @media (max-width: 1024px) {
    .hero {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 100px 20px 60px;
    }

    .hero-image {
      height: 460px;
    }

    .hero-title {
      font-size: 42px;
      letter-spacing: -1.5px;
    }

    .features-grid,
    .doctors-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .how-it-works-inner {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .cta-card {
      grid-template-columns: 1fr 1fr;
    }

    .cta-image-container {
      height: auto;
    }

    .section-title {
      font-size: 36px;
    }
  }

  /* ── MOBILE (max 768px) ── */
  @media (max-width: 768px) {
    /* Navbar */
    .navbar-links {
      display: none;
    }

    .navbar {
      padding: 14px 16px;
    }

    /* Hero — keep two columns, scale down */
    .hero {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      padding: 80px 14px 48px;
      align-items: center;
    }

    .hero-eyebrow {
      font-size: 10px;
      padding: 5px 10px;
      margin-bottom: 14px;
    }

    .hero-title {
      font-size: 22px;
      letter-spacing: -0.8px;
      margin-bottom: 12px;
    }

    .hero-subtitle {
      font-size: 12px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .hero-buttons {
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .btn-primary, .btn-outline {
      padding: 10px 18px;
      font-size: 12px;
    }

    .hero-stats {
      gap: 12px;
      flex-wrap: wrap;
    }

    .stat-number {
      font-size: 20px;
    }

    .stat-label {
      font-size: 10px;
    }

    .hero-image {
      height: 280px;
      border-radius: 14px;
    }

    .hero-image-container {
      display: block;
    }

    .floating-card {
      padding: 8px 10px;
      border-radius: 10px;
      gap: 6px;
    }

    .floating-card-1 {
      bottom: 10px;
      left: -4px;
      right: auto;
    }

    .floating-card-2 {
      top: 10px;
      right: -4px;
    }

    .floating-icon {
      width: 28px;
      height: 28px;
      font-size: 12px;
    }

    .floating-text strong {
      font-size: 10px;
    }

    .floating-text span {
      font-size: 9px;
    }

    /* Trust bar */
    .trust-bar {
      padding: 14px 16px;
      gap: 16px;
    }

    .trust-item {
      font-size: 11px;
      gap: 6px;
    }

    /* Sections */
    .section {
      padding: 56px 16px;
    }

    .section-title {
      font-size: 28px;
      letter-spacing: -1px;
    }

    .section-subtitle {
      font-size: 13px;
    }

    /* Features */
    .features-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .feature-card {
      padding: 20px 16px;
    }

    .feature-icon {
      width: 40px;
      height: 40px;
      font-size: 18px;
      margin-bottom: 12px;
    }

    .feature-card h3 {
      font-size: 14px;
      margin-bottom: 6px;
    }

    .feature-card p {
      font-size: 12px;
      line-height: 1.6;
    }

    .feature-image {
      height: 120px;
      border-radius: 8px;
      margin-bottom: 14px;
    }

    /* How it works */
    .how-it-works-inner {
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .how-image {
      height: 260px;
      border-radius: 14px;
    }

    .step {
      gap: 10px;
    }

    .step-number {
      width: 36px;
      height: 36px;
      font-size: 14px;
      flex-shrink: 0;
    }

    .step h3 {
      font-size: 13px;
      margin-bottom: 4px;
    }

    .step p {
      font-size: 11px;
      line-height: 1.6;
    }

    /* Doctors */
    .doctors-grid {
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .doctor-card img {
      height: 160px;
    }

    .doctor-card-body {
      padding: 14px 12px;
    }

    .doctor-card-name {
      font-size: 14px;
    }

    .doctor-card-specialty {
      font-size: 10px;
    }

    .doctor-card-meta {
      font-size: 11px;
    }

    .doctor-card-footer {
      padding-top: 10px;
    }

    /* Testimonial */
    .testimonial {
      padding: 56px 16px;
    }

    .testimonial-quote {
      font-size: 18px;
      line-height: 1.5;
      margin-bottom: 24px;
    }

    .testimonial-avatar {
      width: 40px;
      height: 40px;
    }

    .testimonial-name {
      font-size: 13px;
    }

    .testimonial-role {
      font-size: 11px;
    }

    /* CTA */
    .cta {
      padding: 48px 16px;
    }

    .cta-card {
      grid-template-columns: 1fr 1fr;
      border-radius: 20px;
    }

    .cta-content {
      padding: 28px 20px;
    }

    .cta-title {
      font-size: 22px;
      letter-spacing: -0.8px;
      margin-bottom: 10px;
    }

    .cta-subtitle {
      font-size: 12px;
      margin-bottom: 20px;
    }

    .cta-buttons {
      flex-direction: column;
      gap: 8px;
    }

    .cta-image-container {
      min-height: 200px;
    }

    /* Footer */
    .footer {
      padding: 40px 16px 24px;
    }

    .footer-top {
      flex-direction: column;
      gap: 32px;
    }

    .footer-links {
      flex-wrap: wrap;
      gap: 24px;
    }

    .footer-bottom {
      flex-direction: column;
      text-align: center;
      gap: 8px;
    }

    .footer-logo-text {
      font-size: 20px;
    }
  }

  /* ── SMALL MOBILE (max 480px) ── */
  @media (max-width: 480px) {
    .hero {
      gap: 12px;
      padding: 72px 12px 40px;
    }

    .hero-title {
      font-size: 18px;
    }

    .hero-subtitle {
      font-size: 11px;
    }

    .hero-image {
      height: 220px;
    }

    .features-grid,
    .doctors-grid,
    .how-it-works-inner {
      grid-template-columns: 1fr 1fr;
    }

    .section-title {
      font-size: 24px;
    }

    .cta-title {
      font-size: 18px;
    }
  }
`

function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [patients, setPatients] = useState(0)
  const [matchTime, setMatchTime] = useState(0)
  const [rating, setRating] = useState(0)

  const featuresRef = useRef(null)
  const howRef = useRef(null)
  const doctorsRef = useRef(null)
  const testimonialRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Count up animation
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const patientsTarget = 50
    const matchTarget = 2
    const ratingTarget = 4.9

    let step = 0
    const interval = setInterval(() => {
      step++
      const progress = step / steps
      setPatients(Math.round(patientsTarget * progress))
      setMatchTime(Math.round(matchTarget * progress * 10) / 10)
      setRating(Math.round(ratingTarget * progress * 10) / 10)

      if (step >= steps) clearInterval(interval)
    }, duration / steps)

    return () => clearInterval(interval)
  }, [])

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card, .doctor-card, .step')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('visible')
              }, index * 150)
            })

            if (entry.target.classList.contains('how-image-container') ||
                entry.target.classList.contains('testimonial-inner') ||
                entry.target.classList.contains('cta-content') ||
                entry.target.classList.contains('cta-image-container')) {
              entry.target.classList.add('visible')
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (featuresRef.current) observer.observe(featuresRef.current)
    if (howRef.current) {
      observer.observe(howRef.current.querySelector('.how-image-container'))
      observer.observe(howRef.current.querySelector('.steps'))
    }
    if (doctorsRef.current) observer.observe(doctorsRef.current)
    if (testimonialRef.current) observer.observe(testimonialRef.current)
    if (ctaRef.current) {
      observer.observe(ctaRef.current.querySelector('.cta-content'))
      observer.observe(ctaRef.current.querySelector('.cta-image-container'))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="landing-page">
      <style>{css}</style>

      {/* Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">CareLink</a>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#doctors">Doctors</a>
        </div>
        <div className="navbar-actions">
          <a href="#login" className="btn-login">Login</a>
          <a href="#signup" className="btn-primary">Sign Up</a>
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
            Access urgent nighttime care and safe medical consultations from the comfort of your home. Connect with licensed professionals in minutes, anytime you need support.
          </p>
          <div className="hero-buttons">
            <a href="#signup" className="btn-primary">
              Get Started
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </div>
            <div className="floating-text">
              <strong>Connecting...</strong>
              <span>Dr. Sarah Jenkins is available now</span>
            </div>
          </div>
          <div className="floating-card floating-card-2">
            <div className="floating-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              HIPAA Compliant
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Licensed Medical Professionals
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              ISO 27001 Certified
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
              </svg>
              4.9/5 User Rating
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2" stroke="#061412" strokeWidth="2"/>
              </svg>
              24/7 Availability
            </div>
          </div>
          <div className="trust-items">
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              HIPAA Compliant
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Licensed Medical Professionals
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              ISO 27001 Certified
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
              </svg>
              4.9/5 User Rating
            </div>
            <div className="trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2" stroke="#061412" strokeWidth="2"/>
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
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Features
          </div>
          <h2 className="section-title">Precision Care Built for You</h2>
          <p className="section-subtitle">
            Our technology bridge creates a seamless connection between your health needs and professional medical advice.
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/>
                  <path d="M19 10v2a7 7 0 01-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </div>
              <h3 className="feature-title">AI Nurse Intake</h3>
              <p className="feature-description">
                Voice-based symptom collection that understands you naturally, summarizing your needs for the doctor instantly.
              </p>
              <a href="#" className="feature-link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <h3 className="feature-title">24/7 Matching</h3>
              <p className="feature-description">
                Skip the waiting room. Connect with board-certified doctors in under 15 minutes, day or night.
              </p>
              <a href="#" className="feature-link">
                See availability
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7 7-7z"/>
                </svg>
              </div>
              <h3 className="feature-title">Smart Prescriptions</h3>
              <p className="feature-description">
                Automated medication management with reminders and direct pharmacy fulfillment integration.
              </p>
              <a href="#" className="feature-link">
                View pharmacy network
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
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
                  <p>Explain your symptoms via voice or text. Our secure AI organizes your info for the physician.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4>Match with a Doctor</h4>
                  <p>Get paired with a licensed professional specialized in your specific health concerns within minutes.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4>Receive Care</h4>
                  <p>Consult via high-quality video call and receive your treatment plan and digital prescriptions immediately.</p>
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
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Our Doctors
          </div>
          <h2 className="section-title">Meet Our Top Specialists</h2>
          <p className="section-subtitle">
            Board-certified physicians ready to provide you with expert care anytime, anywhere.
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  4.9
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>$45</strong>/session
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  4.8
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>$50</strong>/session
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  4.9
                </span>
              </div>
              <div className="doctor-footer">
                <div className="doctor-price">
                  From <strong>$35</strong>/session
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
            "CareLink connected me with a specialist at 2 AM when my daughter had a high fever. Within 15 minutes, we had a diagnosis and prescription sent to our local pharmacy. This service is a lifesaver."
          </p>
          <div className="testimonial-author">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=faces"
              alt="Emily Rodriguez"
              className="testimonial-avatar"
            />
            <div className="testimonial-info">
              <div className="testimonial-name">Emily Rodriguez</div>
              <div className="testimonial-role">Mother of two, San Francisco</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" ref={ctaRef}>
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Ready for Better Health?<br/>Join CareLink Today.</h2>
            <p className="cta-subtitle">
              Thousands of patients trust CareLink for their immediate health needs. Secure your first consultation now.
            </p>
            <div className="cta-buttons">
              <a href="#signup" className="btn-primary">
                Get Started Now
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#" className="btn-outline-dark">View Pricing</a>
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
  )
}

export default LandingPage
'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#" className="footer-logo">
            <img src="/assets/triverse_vision_logo.png" alt="Triverse Vision Logo" className="footer-logo-img" />
            <span>Triverse Vision</span>
          </a>
          <nav className="footer-nav">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="LinkedIn">LI</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Triverse Vision. All rights reserved.</p>
          <p>Crafted for the bold.</p>
        </div>
      </div>
    </footer>
  );
}

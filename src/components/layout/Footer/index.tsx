'use client';

import React from 'react';
import Image from 'next/image';
import { SITE_CONFIG } from '@/constants';
import { Icons } from '@/components/common/Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <a href="#" className="footer-logo">
            <Image src="/assets/triverse_vision_logo.png" alt="Triverse Vision Logo" width={260} height={56} className="footer-logo-img" />
            <span>Triverse Vision</span>
          </a>
          <nav className="footer-nav">
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="footer-socials">
            <a 
              href={SITE_CONFIG.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="social-btn social-btn--linkedin"
            >
              <Icons.Linkedin className="social-icon" />
            </a>
            <a 
              href={SITE_CONFIG.socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="social-btn social-btn--facebook"
            >
              <Icons.Facebook className="social-icon" />
            </a>
            <a 
              href={SITE_CONFIG.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="social-btn social-btn--instagram"
            >
              <Icons.Instagram className="social-icon" />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Triverse Vision. All rights reserved.</p>
          <p>Crafted for the bold.</p>
        </div>
      </div>
    </footer>
  );
}

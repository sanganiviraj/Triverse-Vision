'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_CONFIG } from '@/constants';
import { Icons } from '@/components/common/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-creative">
      <div className="container">
        {/* ── Main 4-Column Grid ────────────────────────── */}
        <div className="footer-grid">
          {/* ── Column 1: Brand & Strategic Pillars ───── */}
          <div className="footer-col footer-col-brand">
            <Link href="/" className="footer-brand-header">
              <Image 
                src="/assets/triverse_vision_logo.png" 
                alt="Triverse Vision Logo" 
                width={220} 
                height={50} 
                className="footer-brand-logo-img"
                priority={false}
              />
            </Link>

            <p className="footer-brand-bio">
              India&apos;s premier personal branding and media production powerhouse. We engineer high-retention video storytelling, viral authority, and turnkey growth.
            </p>

            {/* Strategic Pillars Highlighted */}
            <div className="footer-pillars-list">
              <div className="footer-pillar-badge">
                <span className="pillar-icon">✨</span>
                <span className="pillar-text">Building Personal Brands That Matter</span>
              </div>
              <div className="footer-pillar-badge">
                <span className="pillar-icon">🎬</span>
                <span className="pillar-text">Content • Strategy • Growth</span>
              </div>
              <div className="footer-pillar-badge">
                <span className="pillar-icon">👤</span>
                <span className="pillar-text">Helping Founders & Creators Stand Out</span>
              </div>
            </div>

            {/* Social Media Rounded Cards */}
            <div className="footer-social-deck">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @triverse.vision"
                className="footer-social-card"
              >
                <Icons.Instagram className="social-svg-icon" />
              </a>

              <a
                href={SITE_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn @triverse-vision"
                className="footer-social-card"
              >
                <Icons.Linkedin className="social-svg-icon" />
              </a>

              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Us"
                className="footer-social-card"
              >
                <Icons.WhatsApp className="social-svg-icon" />
              </a>

              {SITE_CONFIG.socials.facebook && (
                <a
                  href={SITE_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="footer-social-card"
                >
                  <Icons.Facebook className="social-svg-icon" />
                </a>
              )}
            </div>
          </div>

          {/* ── Column 2: Media Solutions ─────────────── */}
          <div className="footer-col">
            <h3 className="footer-col-title">Media Solutions</h3>
            <ul className="footer-nav-links">
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">👑</span>
                  <span>Personal Branding</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">📢</span>
                  <span>Commercial Video Ads</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">✂️</span>
                  <span>High-Attention Editing</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">👥</span>
                  <span>Influencer Marketing</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 3: Agency & Proof ──────────────── */}
          <div className="footer-col">
            <h3 className="footer-col-title">Agency & Proof</h3>
            <ul className="footer-nav-links">
              <li>
                <Link href="/#work" className="footer-link-item">
                  <span className="link-emoji">📈</span>
                  <span>Client Transformations</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">📉</span>
                  <span>Commercial Ads & ROAS</span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="footer-link-item">
                  <span className="link-emoji">🎬</span>
                  <span>Influencer Results</span>
                </Link>
              </li>
              <li>
                <Link href="/#services" className="footer-link-item">
                  <span className="link-emoji">🛡️</span>
                  <span>Why Triverse Vision</span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="footer-link-item">
                  <span className="link-emoji">📰</span>
                  <span>Growth Blog & Insights</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="footer-link-item">
                  <span className="link-emoji">📞</span>
                  <span>Contact & Studios</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Studio Hubs & Direct Contact ── */}
          <div className="footer-col footer-col-hub">
            <h3 className="footer-col-title">Studio Production Hubs</h3>

            {/* Surat Headquarters Location Card */}
            <div className="footer-studio-card">
              <div className="studio-card-head">
                <Icons.MapPin className="studio-pin-icon" />
                <a
                  href="https://maps.google.com/?q=Karma+Business+Center,+Yamuna+Chowk,+Mota+Varachha,+Surat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-title-link"
                >
                  Surat Headquarters:
                </a>
              </div>
              <p className="studio-address-text">
                507, Karma Business Center, Yamuna Chowk, Mota Varachha, Surat
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="footer-direct-rows">
              <a href={`mailto:${SITE_CONFIG.email}`} className="footer-direct-item">
                <Icons.Mail className="direct-icon" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, '')}`} className="footer-direct-item">
                <Icons.Phone className="direct-icon" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>

            {/* Big WhatsApp CTA Pill */}
            <a
              href={`https://wa.me/918238787327?text=${encodeURIComponent("Hi Triverse Vision, I'd like to discuss personal branding and content production.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-whatsapp-button"
            >
              <Icons.WhatsApp className="wa-btn-icon" />
              <span>Chat On WhatsApp</span>
            </a>
          </div>
        </div>

        {/* ── Bottom Bar: Copyright & Legal ─────────────── */}
        <div className="footer-bottom-bar">
          <div className="footer-copy-left">
            <p>&copy; {currentYear} Triverse Vision. All rights reserved.</p>
          </div>

          <div className="footer-copy-center">
            <p>Crafted in Surat, India • Built for High-Impact Founders Worldwide</p>
          </div>

          <div className="footer-copy-right">
            <Link href="/#services">Services</Link>
            <span className="copy-sep">•</span>
            <Link href="/portfolio">Portfolio</Link>
            <span className="copy-sep">•</span>
            <Link href="/#contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

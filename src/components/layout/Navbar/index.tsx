'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { generateLiquidGlassFilterMaps } from '@/lib/liquidGlass';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // Set scrolled state (for the glassmorphism padding shrink effect)
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Set hidden state: hide if scrolling down and past 150px, show if scrolling up
    if (latest > 150 && latest > previous && !isOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Helper to safely get element by ID (e.g. #work or #process) without throwing DOMException
  const getElementByHashSafe = useCallback((hash: string) => {
    if (!hash || hash === '#') return null;
    try {
      const cleanId = hash.replace(/^#/, '').replace(/\/$/, '');
      return document.getElementById(cleanId);
    } catch (err) {
      console.error("Failed to find element safely:", hash, err);
      return null;
    }
  }, []);

  // Intercept all hash link clicks to prevent them from showing in the URL address bar, pushing clean paths instead
  useEffect(() => {
    const handleHashLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href;
        if (targetId === '#') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveLink('#hero');
          window.history.pushState(null, '', '/');
          return;
        }

        const element = getElementByHashSafe(targetId);
        if (element) {
          e.preventDefault();

          // Set active state in Navbar
          setActiveLink(targetId);

          // Update browser history with clean path (no #)
          const cleanPath = '/' + targetId.replace('#', '').replace(/\/$/, '');
          window.history.pushState(null, '', cleanPath);

          // Calculate offset (fixed navbar height)
          const header = document.querySelector('.glass-navbar');
          const headerOffset = header ? header.getBoundingClientRect().height : 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleHashLinkClick);
    return () => {
      document.removeEventListener('click', handleHashLinkClick);
    };
  }, [getElementByHashSafe]);

  // Handle clean path scroll on initial load (e.g. going directly to /process)
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname && pathname !== '/') {
      const targetId = `#${pathname.substring(1)}`;
      const element = getElementByHashSafe(targetId);
      if (element) {
        setActiveLink(targetId.replace(/\/$/, ''));

        // Wait for preloader animation to complete and clear
        const timer = setTimeout(() => {
          const header = document.querySelector('.glass-navbar');
          const headerOffset = header ? header.getBoundingClientRect().height : 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 1100);

        return () => clearTimeout(timer);
      }
    }
  }, [getElementByHashSafe]);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleLinkClick = useCallback((href: string) => {
    setActiveLink(href);
    setIsOpen(false);
  }, []);

  const navInnerRef = useRef<HTMLDivElement>(null);
  const [glassMaps, setGlassMaps] = useState({ dispUrl: '', specUrl: '', w: 0, h: 0 });

  useEffect(() => {
    // Generate glass maps when scrolled state changes (since size changes) or on resize
    const updateGlass = () => {
      if (!navInnerRef.current) return;
      const rect = navInnerRef.current.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w === 0 || h === 0) return;

      const maps = generateLiquidGlassFilterMaps(w, h, 25);
      setGlassMaps({ dispUrl: maps.dispUrl, specUrl: maps.specUrl, w, h });
    };

    // Small timeout to allow CSS transition of width/height to finish before calculating
    const t = setTimeout(updateGlass, 450);
    window.addEventListener('resize', updateGlass);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', updateGlass);
    };
  }, [isScrolled]);

  return (
    <>
      {isOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            background: 'rgba(3, 4, 94, 0.04)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        />
      )}
      <motion.nav
        className={`glass-navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'open' : ''}`}
        animate={{ y: isHidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {glassMaps.dispUrl && (
          <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
            <filter id="liquid-glass-filter" x="0%" y="0%" width="100%" height="100%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="48" result="blurred_source" />
              <feImage href={glassMaps.dispUrl} x="0" y="0" width={glassMaps.w} height={glassMaps.h} result="disp_map" />
              <feDisplacementMap in="blurred_source" in2="disp_map" scale="10" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              <feColorMatrix in="displaced" type="saturate" values="4" result="displaced_sat" />
              <feImage href={glassMaps.specUrl} x="0" y="0" width={glassMaps.w} height={glassMaps.h} result="spec_layer" />
              <feComposite in="displaced_sat" in2="spec_layer" operator="in" result="spec_masked" />
              <feComponentTransfer in="spec_layer" result="spec_faded">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feBlend in="spec_masked" in2="displaced" mode="normal" result="with_sat" />
              <feBlend in="spec_faded" in2="with_sat" mode="normal" />
            </filter>
          </svg>
        )}
        <div className="navbar-inner" ref={navInnerRef}>

          {/* Brand Logo */}
          <a href="#hero" className="nav-logo" onClick={() => handleLinkClick('#hero')}>
            <Image src="/assets/triverse_vision_logo.png" alt="Triverse Vision Logo" width={260} height={56} className="nav-logo-img" />
            <span className="logo-text">Triverse Vision</span>
          </a>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link ${activeLink === href ? 'active' : ''}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {label}
                </a>
              </li>
            ))}
            {/* Mobile CTA Button inside dropdown */}
            <li className="mobile-cta-item">
              <a
                href="#contact"
                className="cta-button-glass mobile-cta"
                onClick={() => handleLinkClick('#contact')}
              >
                Get Started
              </a>
            </li>
          </ul>

          {/* Premium Glass CTA Button */}
          <a href="#contact" className="cta-button-glass" onClick={() => handleLinkClick('#contact')}>
            Get Started
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="hamburger-btn"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>

        </div>
      </motion.nav>

      {/* Embedded CSS styles for standalone plug-and-play capability */}
      <style>{`
        /* Root encapsulation */
        .glass-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 12px 0;
          transition: padding 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: var(--font-body), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Triggered scroll padding shrink */
        .glass-navbar.scrolled {
          padding: 12px 0;
        }

        /* Container styling */
        .navbar-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 50px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        /* Scrolled Glassmorphism State */
        .glass-navbar.scrolled .navbar-inner {
          max-width: 900px;
          padding: 8px 20px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: url(#liquid-glass-filter), blur(48px) saturate(180%);
          -webkit-backdrop-filter: url(#liquid-glass-filter), blur(48px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 10px 30px rgba(2, 62, 138, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        /* Logo Configuration */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--deep-twilight, #03045e);
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: -0.2px;
          transition: opacity 0.2s ease;
        }

        .nav-logo:hover {
          opacity: 0.9;
        }

        .nav-logo-img {
          height: 56px;
          width: auto;
          object-fit: contain;
          display: block;
          transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-navbar.scrolled .nav-logo-img {
          height: 44px;
        }

        /* Navigation Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
          transition: gap 0.4s ease;
        }

        .glass-navbar.scrolled .nav-links {
          gap: 6px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--gray-700, #2d4a5c);
          font-size: 14.5px;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 100px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--french-blue, #023e8a);
          background: rgba(2, 62, 138, 0.06);
        }

        .nav-link.active {
          color: var(--french-blue, #023e8a);
          font-weight: 600;
          background: rgba(2, 62, 138, 0.08);
        }

        /* Premium CTA Button with Liquid Glass aesthetic */
        .cta-button-glass {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          padding: 10px 24px;
          border-radius: 100px;
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff !important;
          background: var(--grad-main, linear-gradient(135deg, #023e8a 0%, #00b4d8 100%));
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 20px rgba(0, 119, 182, 0.25),
                      inset 0 1.5px 0 rgba(255, 255, 255, 0.35);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .cta-button-glass:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px rgba(0, 119, 182, 0.4),
                      inset 0 1.5px 0 rgba(255, 255, 255, 0.5);
          color: #ffffff !important;
        }

        .nav-links .cta-button-glass {
          color: #ffffff !important;
        }

        /* Mobile Hamburger Configuration */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          z-index: 1010;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
          -webkit-user-select: none;
        }

        .hamburger-btn .bar {
          width: 24px;
          height: 2px;
          background: var(--deep-twilight, #03045e);
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
          user-select: none;
          -webkit-user-select: none;
        }

        .glass-navbar.open .hamburger-btn .bar:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .glass-navbar.open .hamburger-btn .bar:nth-child(2) {
          opacity: 0;
        }

        .glass-navbar.open .hamburger-btn .bar:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* Mobile CTA Specifics */
        .mobile-cta-item {
          display: none;
          margin-top: 8px;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 119, 182, 0.1);
          width: 100%;
          text-align: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .glass-navbar {
            padding: 12px 16px !important; /* 12px gap above and below, 16px gap on sides */
          }

          .navbar-inner {
            padding: 8px 20px !important;
          }

          .cta-button-glass {
            display: none !important;
          }

          .hamburger-btn {
            display: flex;
          }

          /* Mobile Menu Overlay - Smooth Cupertino-style spring transition */
          .glass-navbar .nav-links {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            margin-top: 10px; /* 10px gap between header and dropdown */
            left: -20px;
            right: -20px;
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(32px) saturate(180%);
            -webkit-backdrop-filter: blur(32px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.45);
            border-radius: 24px;
            padding: 24px 20px;
            gap: 6px;
            box-shadow: 0 30px 60px rgba(2, 62, 138, 0.12),
                        inset 0 1px 0 rgba(255, 255, 255, 0.6);
            opacity: 0;
            transform: translateY(-12px) scale(0.96);
            pointer-events: none;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1000;
          }

          /* Open state */
          .glass-navbar.open .nav-links {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
            margin: 20px;
          }

          /* Mobile list item adjustments */
          .glass-navbar .nav-links li {
            width: 100%;
            text-align: center;
          }

          /* Mobile navigation link formatting */
          .glass-navbar .nav-link {
            display: block;
            font-size: 15px;
            font-weight: 500;
            padding: 10px 16px;
            border-radius: 12px;
            color: var(--gray-700, #2d4a5c);
            transition: all 0.25s ease;
            border: 1px solid transparent;
          }

          /* Mobile hover states */
          .glass-navbar .nav-link:hover {
            color: var(--french-blue, #023e8a);
            background: rgba(2, 62, 138, 0.05);
          }

          /* Mobile active indicator style (sleek, glowy glass look) */
          .glass-navbar .nav-link.active {
            color: var(--french-blue, #023e8a);
            font-weight: 600;
            background: linear-gradient(135deg, rgba(2, 62, 138, 0.06) 0%, rgba(0, 180, 216, 0.06) 100%);
            border: 1px solid rgba(2, 62, 138, 0.08);
            box-shadow: 0 4px 15px rgba(2, 62, 138, 0.03),
                        inset 0 1px 0 rgba(255, 255, 255, 0.8);
          }

          .mobile-cta-item {
            display: block;
            margin-top: 6px;
            padding-top: 14px;
            border-top: 1px solid rgba(2, 62, 138, 0.08);
            width: 100%;
            text-align: center;
          }
          
          .mobile-cta {
            display: inline-flex !important;
            justify-content: center;
            width: 100%;
            max-width: 240px;
            padding: 12px 30px;
            font-size: 14.5px;
            border-radius: 100px;
          }
        }
      `}</style>
    </>
  );
}

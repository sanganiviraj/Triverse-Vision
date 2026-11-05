'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { reelsData, ReelItem } from '@/data/reels';
import './Hero.css';

export default function Hero() {
  const [activeReel, setActiveReel] = useState<ReelItem | null>(null);
  const [currentReelIdx, setCurrentReelIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stage viewport detection for initial scroll entrance
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { once: true, amount: 0.25 });
  const [hasEntered, setHasEntered] = useState(false);
  const [switchTrigger, setSwitchTrigger] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Once first scroll entrance finishes, mark as entered so subsequent reel changes trigger bouncy pop-outs
  useEffect(() => {
    if (isInView && !hasEntered) {
      const timer = setTimeout(() => {
        setHasEntered(true);
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasEntered]);

  const switchReel = useCallback((newIdx: number) => {
    setCurrentReelIdx(newIdx);
    setSwitchTrigger((prev) => prev + 1);
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentReelIdx((prev) => {
      const nextIdx = (prev + 1) % reelsData.length;
      return nextIdx;
    });
    setSwitchTrigger((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentReelIdx((prev) => {
      const prevIdx = (prev - 1 + reelsData.length) % reelsData.length;
      return prevIdx;
    });
    setSwitchTrigger((prev) => prev + 1);
  }, []);

  // Touch swipe support on the phone frame
  const touchStartXRef = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Trackpad / mouse wheel scroll on phone frame to switch reels
  const wheelLockRef = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 25) {
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      if (e.deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 450);
    }
  };

  const currentReel = reelsData[currentReelIdx] || reelsData[0];

  // Open full-screen reel modal and immediately pause the background phone video
  const handleOpenModal = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveReel(currentReel);
  }, [currentReel]);

  // Close full-screen reel modal and resume background phone video
  const handleCloseModal = useCallback(() => {
    setActiveReel(null);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Ensure background video pauses when modal is open and only autoplays when modal is closed
  useEffect(() => {
    if (!videoRef.current) return;
    if (activeReel) {
      videoRef.current.pause();
    } else {
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [currentReelIdx, activeReel]);

  return (
    <section id="hero" ref={sectionRef} className="hero-editorial">
      {/* Ambient Ocean Blue Meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: 'absolute',
            top: '-5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(144, 224, 239, 0.45) 0%, rgba(202, 240, 248, 0.2) 50%, transparent 75%)',
            filter: 'blur(100px)',
            borderRadius: '50%'
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: '600px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(72, 202, 228, 0.25) 0%, transparent 70%)',
            filter: 'blur(120px)',
            borderRadius: '50%'
          }}
        />
      </div>

      {/* Floating Ambient Creator & Social Icons */}
      <div className="hero-floating-icons">
        <div className="hero-float-item float-camera" title="Video Production">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 8 5-3v14l-5-3" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <circle cx="8" cy="12" r="2.5" />
          </svg>
        </div>

        <div className="hero-float-item float-edit" title="Video Editing">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </div>

        <div className="hero-float-item float-ig" title="Instagram Growth">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>

        <div className="hero-float-item float-reels" title="Short-Form Reels">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="m9 3 3 6" />
            <path d="m15 3 3 6" />
            <path d="M3 9h18" />
            <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" />
          </svg>
        </div>

        <div className="hero-float-item float-clapper" title="Cinematic Storytelling">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 6 3 11l-.9-2.4c-.5-1.1.1-2.4 1.2-2.9l13.5-5c1.1-.4 2.4.2 2.8 1.3l.6 2Z" />
            <path d="m6.2 5.3 3.1 4" />
            <path d="m12.1 2.8 3.1 4" />
            <rect x="2" y="11" width="20" height="10" rx="2" />
          </svg>
        </div>

        <div className="hero-float-item float-fb" title="Facebook Reach">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </div>
      </div>

      {/* Centered Editorial Header Content */}
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Badge */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="hero-editorial-badge">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0077b6' }} />
            <span>Triverse Vision Studio</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="hero-editorial-title">
          <span style={{ display: 'block' }}>We Create Content That</span>
          <span style={{ display: 'block', marginTop: '6px' }}>
            <span className="serif-italic">Commands</span> Attention.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-editorial-sub">
          Cinematic reels, brand films, and viral short-form content built for ambitious founders who want to lead their industry online.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <a
            href="#work"
            className="hero-editorial-btn"
            onClick={(e) => {
              e.preventDefault();
              const workElem = document.getElementById('work');
              if (workElem) workElem.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Explore Our Work</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── INSPIRE CENTERPIECE PHONE SHOWCASE ──────────────── */}
      <div className="hero-phone-showcase">
        <div className="hero-phone-stage" ref={stageRef}>
          {/* Side Navigation Prev Arrow */}
          <button
            type="button"
            className="hero-stage-nav-btn hero-stage-nav-prev"
            onClick={handlePrev}
            aria-label="Previous reel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Side Navigation Next Arrow */}
          <button
            type="button"
            className="hero-stage-nav-btn hero-stage-nav-next"
            onClick={handleNext}
            aria-label="Next reel"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Floating Reaction 1: Views (Top-Left) */}
          <motion.div
            key={`rx-tl-${switchTrigger}`}
            className="hero-reaction-wrapper hero-reaction-wrapper-top-left"
            initial={
              !hasEntered
                ? { x: isMobile ? 60 : 220, y: isMobile ? 25 : 70, scale: 0.2, opacity: 0 }
                : { x: isMobile ? 20 : 50, y: isMobile ? 8 : 16, scale: 0.82, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, y: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? 60 : 220, y: isMobile ? 25 : 70, scale: 0.2, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 220, damping: 18, delay: 0.22 }
                : { type: 'spring', stiffness: 320, damping: 16, delay: 0.05 }
            }
          >
            <div className="hero-reaction-sticker hero-sticker-top-left" title="Organic Reach">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" fill="#00b4d8" fillOpacity="0.25" />
              </svg>
            </div>
          </motion.div>

          {/* Floating Reaction 2: Heart (Top-Right) */}
          <motion.div
            key={`rx-tr-${switchTrigger}`}
            className="hero-reaction-wrapper hero-reaction-wrapper-top-right"
            initial={
              !hasEntered
                ? { x: isMobile ? -60 : -220, y: isMobile ? 25 : 70, scale: 0.2, opacity: 0 }
                : { x: isMobile ? -20 : -50, y: isMobile ? 8 : 16, scale: 0.82, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, y: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? -60 : -220, y: isMobile ? 25 : 70, scale: 0.2, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 220, damping: 18, delay: 0.22 }
                : { type: 'spring', stiffness: 320, damping: 16, delay: 0.05 }
            }
          >
            <div className="hero-reaction-sticker hero-sticker-top-right hero-sticker-heart" title="Audience Engagement">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </motion.div>

          {/* Floating Reaction 3: Comment (Bottom-Left) */}
          <motion.div
            key={`rx-bl-${switchTrigger}`}
            className="hero-reaction-wrapper hero-reaction-wrapper-bottom-left"
            initial={
              !hasEntered
                ? { x: isMobile ? 60 : 230, y: isMobile ? -20 : -60, scale: 0.2, opacity: 0 }
                : { x: isMobile ? 20 : 55, y: isMobile ? -8 : -16, scale: 0.82, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, y: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? 60 : 230, y: isMobile ? -20 : -60, scale: 0.2, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }
                : { type: 'spring', stiffness: 320, damping: 16, delay: 0.08 }
            }
          >
            <div className="hero-reaction-sticker hero-sticker-bottom-left" title="Community Conversations">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                <circle cx="9" cy="10" r="1.1" fill="#0077b6" />
                <circle cx="12" cy="10" r="1.1" fill="#0077b6" />
                <circle cx="15" cy="10" r="1.1" fill="#0077b6" />
              </svg>
            </div>
          </motion.div>

          {/* Floating Reaction 4: Share (Bottom-Right) */}
          <motion.div
            key={`rx-br-${switchTrigger}`}
            className="hero-reaction-wrapper hero-reaction-wrapper-bottom-right"
            initial={
              !hasEntered
                ? { x: isMobile ? -60 : -230, y: isMobile ? -20 : -60, scale: 0.2, opacity: 0 }
                : { x: isMobile ? -20 : -55, y: isMobile ? -8 : -16, scale: 0.82, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, y: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? -60 : -230, y: isMobile ? -20 : -60, scale: 0.2, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 220, damping: 18, delay: 0.3 }
                : { type: 'spring', stiffness: 320, damping: 16, delay: 0.08 }
            }
          >
            <div className="hero-reaction-sticker hero-sticker-bottom-right" title="Viral Shares">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b4d8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 17 5-5-5-5" />
                <path d="M4 19v-2a7 7 0 0 1 7-7h9" />
              </svg>
            </div>
          </motion.div>

          {/* Left Floating Stat Card: Likes */}
          <motion.div
            key={`card-left-${switchTrigger}`}
            className="hero-floating-stat-wrapper hero-stat-wrapper-left"
            initial={
              !hasEntered
                ? { x: isMobile ? 80 : 280, scale: 0.35, opacity: 0 }
                : { x: isMobile ? 30 : 85, scale: 0.88, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? 80 : 280, scale: 0.35, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 210, damping: 20, delay: 0.1 }
                : { type: 'spring', stiffness: 300, damping: 17, delay: 0.02 }
            }
          >
            <div className="hero-floating-stat-card hero-stat-card-left">
              {/* Subtle Triverse Growth Wave Chart */}
              <svg className="hero-stat-card-chart" viewBox="0 0 120 48" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cardChartGradLikes" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00b4d8" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#0077b6" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="cardChartFillLikes" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00b4d8" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#00b4d8" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,42 Q20,38 35,26 T70,22 T95,12 L120,4 L120,48 L0,48 Z" fill="url(#cardChartFillLikes)" />
                <path d="M0,42 Q20,38 35,26 T70,22 T95,12 L120,4" stroke="url(#cardChartGradLikes)" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              <div className="hero-stat-card-inner">
                <div className="hero-stat-card-header">
                  <span className="hero-stat-card-icon-svg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="1.2">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </span>
                  <span className="hero-stat-card-label">Likes</span>
                </div>
                <h3 className="hero-stat-card-value">{currentReel.likes || '2,200'}</h3>
                <span className="hero-stat-card-badge badge-likes">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  <span>+348% growth</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Stat Card: Views */}
          <motion.div
            key={`card-right-${switchTrigger}`}
            className="hero-floating-stat-wrapper hero-stat-wrapper-right"
            initial={
              !hasEntered
                ? { x: isMobile ? -80 : -280, scale: 0.35, opacity: 0 }
                : { x: isMobile ? -35 : -85, scale: 0.88, opacity: 0.65 }
            }
            animate={
              isInView
                ? { x: 0, scale: 1, opacity: 1 }
                : { x: isMobile ? -80 : -280, scale: 0.35, opacity: 0 }
            }
            transition={
              !hasEntered
                ? { type: 'spring', stiffness: 210, damping: 20, delay: 0.16 }
                : { type: 'spring', stiffness: 300, damping: 17, delay: 0.04 }
            }
          >
            <div className="hero-floating-stat-card hero-stat-card-right">
              {/* Subtle Triverse Growth Wave Chart */}
              <svg className="hero-stat-card-chart" viewBox="0 0 120 48" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cardChartGradViews" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0077b6" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#00b4d8" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id="cardChartFillViews" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0077b6" stopOpacity="0.2" />
                    <stop offset="1" stopColor="#0077b6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,40 Q25,35 45,28 T80,16 T105,10 L120,2 L120,48 L0,48 Z" fill="url(#cardChartFillViews)" />
                <path d="M0,40 Q25,35 45,28 T80,16 T105,10 L120,2" stroke="url(#cardChartGradViews)" strokeWidth="2.2" strokeLinecap="round" />
              </svg>

              <div className="hero-stat-card-inner">
                <div className="hero-stat-card-header">
                  <span className="hero-stat-card-icon-svg">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" fill="#0077b6" fillOpacity="0.25" />
                    </svg>
                  </span>
                  <span className="hero-stat-card-label">Views</span>
                </div>
                <h3 className="hero-stat-card-value">{currentReel.views || '78,926'}</h3>
                <span className="hero-stat-card-badge badge-views">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Scroll-Stopping</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Central Hand-held Phone Mockup */}
          <div
            className="hero-phone-frame"
            onClick={handleOpenModal}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            title="Click to view reel in full screen"
          >
            {/* Screen Viewport with Video underneath the mask */}
            <div className="hero-phone-screen">
              {/* Dynamic Island */}
              <div className="hero-phone-island">
                <span className="hero-phone-island-lens" />
                <span className="hero-phone-island-sensor" />
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                className="hero-phone-audio-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((prev) => !prev);
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                  }
                }}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                title={isMuted ? 'Unmute audio' : 'Mute audio'}
              >
                {isMuted ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              {/* Reel Video */}
              <video
                key={currentReel.video}
                ref={videoRef}
                src={currentReel.video}
                poster={currentReel.img}
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />

              {/* Glass Glare Layer */}
              <div className="hero-phone-glare" />

              {/* Tap to expand hint on hover */}
              <div className="hero-phone-expand-hint">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                </svg>
                <span>Tap to Expand</span>
              </div>

              {/* Home Indicator Bar */}
              <div className="hero-phone-home-bar" />
            </div>

            {/* Hand & Phone Bezel Overlay PNG */}
            <Image
              src="/images/hero-phone/phone-hand-mask.png"
              alt="Hand holding phone displaying client reel"
              width={1139}
              height={1170}
              priority
              className="hero-phone-mask"
            />
          </div>
        </div>

        {/* Reel Switcher Info Pill & Pagination Dots */}
        <div className="hero-stage-controls">
          <div className="hero-reel-active-pill">
            <span className="hero-reel-tag-badge">{currentReel.tag}</span>
            <span className="hero-reel-title-text">{currentReel.title}</span>
          </div>

          <div className="hero-reel-dots">
            {reelsData.slice(0, 8).map((reel, idx) => (
              <button
                key={reel.id}
                type="button"
                className={`hero-reel-dot ${idx === currentReelIdx ? 'active' : ''}`}
                onClick={() => switchReel(idx)}
                aria-label={`Switch to reel ${idx + 1}: ${reel.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Reel Lightbox Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '420px',
                aspectRatio: '9 / 16',
                maxHeight: '88vh',
                backgroundColor: '#000000',
                borderRadius: '32px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0, 0, 0, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Header / Info inside Modal */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: '16px 20px',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
                  zIndex: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pointerEvents: 'none'
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#00b4d8'
                    }}
                  >
                    {activeReel.tag}
                  </span>
                  <h4 style={{ margin: '2px 0 0', fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                    {activeReel.title}
                  </h4>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 35,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer'
                }}
                aria-label="Close modal"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Video with native controls */}
              <div style={{ position: 'relative', width: '100%', height: '100%', flex: 1 }}>
                <video
                  src={activeReel.video}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

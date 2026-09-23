'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { reelsData } from '@/data/reels';

interface ReelVideo {
  id: number;
  title: string;
  desc: string;
  tag: string;
  img: string;
  video: string;
}

export default function Hero() {
  const [activeReel, setActiveReel] = useState<ReelVideo | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax scroll: left and right reels scroll towards the top, center stays anchored
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const yOuter = useTransform(scrollYProgress, [0, 1], [0, -85]);
  const yInner = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, 0]);

  const getParallaxY = (idx: number) => {
    switch (idx % 5) {
      case 0:
      case 4:
        return yOuter;
      case 1:
      case 3:
        return yInner;
      case 2:
      default:
        return yCenter;
    }
  };

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
        {/* 1. Video Shooting / Cinema Camera */}
        <div className="hero-float-item float-camera" title="Video Production">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m16 8 5-3v14l-5-3" />
            <rect x="2" y="6" width="14" height="12" rx="2" />
            <circle cx="8" cy="12" r="2.5" />
          </svg>
        </div>

        {/* 2. Video Editing / Cut */}
        <div className="hero-float-item float-edit" title="Video Editing">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" />
            <circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
          </svg>
        </div>

        {/* 3. Instagram */}
        <div className="hero-float-item float-ig" title="Instagram Growth">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </div>

        {/* 4. Reels */}
        <div className="hero-float-item float-reels" title="Short-Form Reels">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="m9 3 3 6" />
            <path d="m15 3 3 6" />
            <path d="M3 9h18" />
            <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" />
          </svg>
        </div>

        {/* 5. Clapperboard / Filmmaking */}
        <div className="hero-float-item float-clapper" title="Cinematic Storytelling">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 6 3 11l-.9-2.4c-.5-1.1.1-2.4 1.2-2.9l13.5-5c1.1-.4 2.4.2 2.8 1.3l.6 2Z" />
            <path d="m6.2 5.3 3.1 4" />
            <path d="m12.1 2.8 3.1 4" />
            <rect x="2" y="11" width="20" height="10" rx="2" />
          </svg>
        </div>

        {/* 6. Facebook */}
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

        {/* Main Title (Clean 2-Line Structure) */}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
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

      {/* Staggered iPhone Mockup Reel Cards Arc (Substantial Real-Phone Presence, Dynamic Island, 9:16 Ratio) */}
      <div className="hero-reels-grid">
        {reelsData.slice(0, 5).map((reel, idx) => {
          const isHovered = hoveredIdx === idx;
          const parallaxY = getParallaxY(idx);

          return (
            <motion.div
              key={reel.id}
              style={{ y: parallaxY }}
              className="hero-reel-col"
            >
              <div
                className={`hero-reel-card card-${idx}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setActiveReel(reel)}
              >
                {/* iPhone Hardware Side Buttons */}
                <div className="iphone-hardware-btn iphone-btn-action" />
                <div className="iphone-hardware-btn iphone-btn-vol-up" />
                <div className="iphone-hardware-btn iphone-btn-vol-down" />
                <div className="iphone-hardware-btn iphone-btn-power" />

                {/* iPhone Screen */}
                <div className="iphone-screen">
                  {/* Dynamic Island */}
                  <div className="iphone-dynamic-island">
                    <span className="iphone-island-lens" />
                    <span className="iphone-island-sensor" />
                  </div>

                  {/* Video Element */}
                  <video
                    src={reel.video}
                    poster={reel.img}
                    muted
                    loop
                    playsInline
                    autoPlay
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)',
                      backgroundColor: '#1c1917'
                    }}
                  />

                  {/* Glass Glare Sheen */}
                  <div className="iphone-screen-glare" />

                  {/* Bottom Home Indicator Bar */}
                  <div className="iphone-home-bar" />

                  {/* Hover overlay + Play button */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isHovered ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                      transition: 'background 0.3s ease',
                      pointerEvents: 'none',
                      zIndex: 15
                    }}
                  >
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(2, 62, 138, 0.75)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1.5px solid rgba(144, 224, 239, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        transform: isHovered ? 'scale(1)' : 'scale(0.7)',
                        opacity: isHovered ? 1 : 0,
                        transition: 'all 0.3s cubic-bezier(0.2, 1, 0.3, 1)',
                        boxShadow: '0 8px 28px rgba(0, 119, 182, 0.45)'
                      }}
                    >
                      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" style={{ marginLeft: '2px' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Reel Lightbox Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReel(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
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
                maxWidth: '400px',
                aspectRatio: '9 / 16',
                maxHeight: '85vh',
                backgroundColor: '#000000',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReel(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  zIndex: 30,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer'
                }}
                aria-label="Close modal"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Video */}
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

'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';

const features = [
  {
    title: 'Viral-Ready Reels',
    desc: 'We craft short-form content engineered for the algorithm — hook, story, and CTA built for maximum reach across Instagram and YouTube.',
  },
  {
    title: 'Brand Storytelling',
    desc: 'Your brand has a story worth telling. We translate your vision into cinematic films that connect with audiences on an emotional level.',
  },
  {
    title: 'Content That Converts',
    desc: 'Every frame we deliver is built with conversion in mind — from the first second to the last, designed to turn viewers into clients.',
  },
  {
    title: 'Consistent Growth Engine',
    desc: 'We become your long-term creative partner, delivering a steady stream of premium content that keeps your brand top-of-mind.',
  },
];

export default function Work() {
  return (
    <section id="work" className="work-bento section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Floating Ambient Creator & Personal Branding Icons */}
      <div 
        className="hero-floating-icons work-floating-icons"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Left Side: Shooting, Editing, Personal Branding */}
        <div
          className="hero-float-item work-float-item float-aperture"
          title="Cinematic Shooting Optics"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '48px',
            height: '48px',
            top: '15%',
            left: '3.5%',
            animation: 'heroFloatA 6.4s ease-in-out infinite alternate',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
            <line x1="9.69" y1="8" x2="21.17" y2="8" />
            <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
            <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
            <line x1="14.31" y1="16" x2="2.83" y2="16" />
            <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
          </svg>
        </div>

        <div
          className="hero-float-item work-float-item float-filmstrip"
          title="Reel Footage Editing"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '46px',
            height: '46px',
            top: '48%',
            left: '2.5%',
            animation: 'heroFloatB 5.8s ease-in-out infinite alternate 0.8s',
          }}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2.5" />
            <path d="M7 2v20" />
            <path d="M17 2v20" />
            <path d="M2 12h20" />
            <path d="M2 7h5" />
            <path d="M2 17h5" />
            <path d="M17 17h5" />
            <path d="M17 7h5" />
          </svg>
        </div>

        <div
          className="hero-float-item work-float-item float-verified"
          title="Personal Brand Authority"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '48px',
            height: '48px',
            top: '80%',
            left: '4%',
            animation: 'heroFloatC 6.6s ease-in-out infinite alternate 1.4s',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        {/* Right Side: Studio Audio, Post-Production, Instagram Virality */}
        <div
          className="hero-float-item work-float-item float-mic"
          title="Studio Voice & Shoots"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '48px',
            height: '48px',
            top: '15%',
            right: '3.5%',
            animation: 'heroFloatB 6.2s ease-in-out infinite alternate 0.4s',
          }}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="8" y1="22" x2="16" y2="22" />
          </svg>
        </div>

        <div
          className="hero-float-item work-float-item float-sliders"
          title="Audio & Color Mastering"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '46px',
            height: '46px',
            top: '49%',
            right: '2.5%',
            animation: 'heroFloatA 6.0s ease-in-out infinite alternate 1.1s',
          }}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </div>

        <div
          className="hero-float-item work-float-item float-share"
          title="Viral Instagram Distribution"
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.72)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 119, 182, 0.18)',
            boxShadow: '0 8px 24px rgba(2, 62, 138, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.85)',
            color: '#0077b6',
            opacity: 0.7,
            width: '46px',
            height: '46px',
            top: '80%',
            right: '4%',
            animation: 'heroFloatC 7.0s ease-in-out infinite alternate 1.8s',
          }}
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>

      <div className="container">

        {/* Heading */}
        <FadeIn direction="up" className="work-bento__header">
          <h2 className="work-bento__title">How Could Content <span className="text-gradient">Help You?</span></h2>
          <p className="work-bento__sub">
            Since day one, we've helped ambitious founders and brands build authority,<br />
          </p>
        </FadeIn>

        {/* Bento Grid */}
        <div className="work-bento__grid">

          {/* Left Column */}
          <div className="work-bento__col">
            {features.slice(0, 2).map((f, i) => (
              <FadeIn direction="up" delay={i * 0.15} duration={0.8} className="work-bento__card" key={i}>
                <h3 className="work-bento__card-title">{f.title}</h3>
                <p className="work-bento__card-desc">{f.desc}</p>
                <div className="work-bento__arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Center Image Card */}
          <FadeIn direction="up" delay={0.2} duration={0.8} className="work-bento__center">
            <div className="relative w-full h-full min-h-[300px]">
              <Image
                className="work-bento__video object-cover"
                src="https://res.cloudinary.com/dufzjnj9b/video/upload/w_800,c_fill,q_auto,f_auto,so_6/v1790060308/SaveClip.App_AQMv157mL6idWHevalof4AjKMTmV83RcGsllvueOsSSki4vs7g8t_c4ZPM_crQ107vy8LDvaZ22mV-akgewnyEUgORZvGhFUt1oPaFM_1_wc4rai.jpg"
                alt="Triverse Vision Reel"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="work-bento__center-overlay">
              <p className="work-bento__center-text">We deal in<br /><strong>measurable results</strong></p>
            </div>
          </FadeIn>

          {/* Right Column */}
          <div className="work-bento__col">
            {features.slice(2, 4).map((f, i) => (
              <FadeIn direction="up" delay={0.3 + (i * 0.15)} duration={0.8} className="work-bento__card" key={i}>
                <h3 className="work-bento__card-title">{f.title}</h3>
                <p className="work-bento__card-desc">{f.desc}</p>
                <div className="work-bento__arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .work-float-item.float-filmstrip,
          .work-float-item.float-sliders {
            display: none !important;
          }
          .work-float-item {
            transform: scale(0.85);
          }
        }
        @media (max-width: 768px) {
          .work-floating-icons {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

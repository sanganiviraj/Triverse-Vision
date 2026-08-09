'use client';

import React from 'react';
import FadeIn from '@/components/common/FadeIn';

export default function Services() {
  const services = [
    {
      num: "01",
      title: "Reel & Video Production",
      desc: "From scripting to final edit — cinematic vertical content designed to stop the scroll on every platform.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <path d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12v8H3a1 1 0 01-1-1V9a1 1 0 011-1z" />
        </svg>
      )
    },
    {
      num: "02",
      title: "Strategy & Scripting",
      desc: "We research your niche, develop your messaging, and write scripts that sound authentically you — not AI.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      num: "03",
      title: "Social Media Management",
      desc: "Full account management: scheduling, community engagement, hashtag strategy and monthly reporting.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      )
    },
    {
      num: "04",
      title: "Motion Graphics & Design",
      desc: "Logo animations, lower thirds, brand kits, and motion ads that elevate the visual perception of your brand.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28">
          <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    }
  ];

  return (
    <section id="services" className="services section section-blue">
      <div className="container">
        <FadeIn direction="up" className="section-label light">What We Do</FadeIn>
        <FadeIn direction="up" delay={0.1}><h2 className="section-title light">Built Around <span className="text-gradient-light">Your Vision</span></h2></FadeIn>

        <div className="services-grid">
          {services.map((service, index) => (
            <FadeIn direction="up" delay={0.2 + (index * 0.1)} duration={0.6} key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <div className="service-num">{service.num}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

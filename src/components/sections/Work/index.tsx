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
    <section id="work" className="work-bento section">
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
                src="https://res.cloudinary.com/dufzjnj9b/video/upload/q_auto,f_auto,so_2/%E0%AA%A4%E0%AA%AE%E0%AB%87_%E0%AA%A7%E0%AA%BE%E0%AA%B0%E0%AB%8B_%E0%AA%8F_%E0%AA%AC%E0%AA%A7%E0%AB%81%E0%AA%82_%E0%AA%A5%E0%AA%88_%E0%AA%B6%E0%AA%95%E0%AB%87_%E0%AA%9B%E0%AB%87_%E0%AA%AC%E0%AA%B8_%E0%AA%AA%E0%AB%82%E0%AA%B0%E0%AA%BE_%E0%AA%B5%E0%AA%BF%E0%AA%B6%E0%AB%8D%E0%AA%B5%E0%AA%BE%E0%AA%B8_%E0%AA%85%E0%AA%A8%E0%AB%87_%E0%AA%A6%E0%AA%BF%E0%AA%B2_%E0%AA%A5%E0%AB%80_%E0%AA%95%E0%AA%BE%E0%AA%B0%E0%AB%8D%E0%AA%AF_%E0%AA%95%E0%AA%B0%E0%AB%8B_%E0%AA%B8%E0%AA%AB%E0%AA%B3_%E0%AA%9C_%E0%AA%9C%E0%AA%BE%E0%AA%B6%E0%AB%87.._%EF%B8%8F_kesvik_stories_mtdd6v.jpg"
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
    </section>
  );
}

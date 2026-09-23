'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/common/FadeIn';
import { Icons } from '@/components/common/Icons';

interface FeatureItem {
  text: string;
  included: boolean;
  isUpgrade?: boolean;
}

interface PackageTier {
  id: string;
  name: string;
  badge?: string;
  badgeType?: 'popular' | 'essential' | 'complete';
  subtitle: string;
  description: string;
  features: FeatureItem[];
  isPopular?: boolean;
}

const PACKAGES: PackageTier[] = [
  {
    id: 'only-editing',
    name: 'Only Editing Package',
    badge: 'Editing Only',
    badgeType: 'essential',
    subtitle: 'Client provides raw video footage & script.',
    description: 'Focuses purely on high-end video editing, color grading, and audio polish for your existing raw videos.',
    features: [
      { text: 'Professional Video Editing & Pacing', included: true },
      { text: 'Dynamic Transitions & Sound Design', included: true },
      { text: 'Cinematic Color Grading', included: true },
      { text: 'Subtitles & Audio Mastering', included: true },
      { text: 'Script Writing & Research', included: false },
      { text: 'Professional Motion Graphics', included: false },
      { text: 'Video Shooting (On-site / Remote)', included: false },
      { text: 'Social Media Management & Posting', included: false },
    ],
  },
  {
    id: 'editing-scripting',
    name: 'Editing + Scripting Package',
    badge: 'Most Popular ⚡',
    badgeType: 'popular',
    isPopular: true,
    subtitle: 'Includes Script Writing + On-Site Video Shooting + Motion Graphics.',
    description: 'We research your niche, write authentic scripts, handle on-site video shooting, and apply professional motion graphics.',
    features: [
      { text: 'In-Depth Research & Script Writing', included: true, isUpgrade: true },
      { text: 'On-Site Video Shooting Production', included: true, isUpgrade: true },
      { text: 'Professional Motion Graphics & Visual FX', included: true, isUpgrade: true },
      { text: 'Professional Video Editing & Pacing', included: true },
      { text: 'Dynamic Transitions & Sound Design', included: true },
      { text: 'Cinematic Color Grading & Subtitles', included: true },
      { text: 'Remote Video Shooting', included: false },
      { text: 'Full Social Media Handling & Posting', included: false },
    ],
  },
  {
    id: 'complete-management',
    name: 'Complete Social Media Management',
    badge: 'All-Inclusive 🚀',
    badgeType: 'complete',
    subtitle: 'Includes Both On-Site & Remote Video Shooting + Full Social Handling.',
    description: 'Complete hands-off solution. Includes professional on-site & remote video shooting, scriptwriting, editing, and full social posting.',
    features: [
      { text: 'On-Site & Remote Video Shooting Production', included: true, isUpgrade: true },
      { text: 'Full Social Media Account Handling & Posting', included: true, isUpgrade: true },
      { text: 'Hashtag Strategy, Captions & Scheduling', included: true, isUpgrade: true },
      { text: 'In-Depth Research & Script Writing', included: true },
      { text: 'Professional Motion Graphics & Visual FX', included: true },
      { text: 'Cinematic Editing, Color Grading & Sound Design', included: true },
      { text: 'Monthly Performance Analytics & Growth Strategy', included: true },
    ],
  },
];

export default function Packages() {
  const [selectedPlan, setSelectedPlan] = useState<'8' | '15'>('8');

  return (
    <section id="packages" className="packages-section section">
      <div className="container">
        {/* Header */}
        <div className="packages-header text-center">
          <FadeIn direction="up" className="section-label">
            Content Packages Comparison
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="section-title packages-title">
              Instagram (8–15 Reels)
              <span className="text-gradient"> Social Media Content Packages</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="packages-subtitle">
              Clear deliverable breakdown: see exactly what is included vs excluded in each tier. Click Continue on any package to receive tailored pricing and details directly on WhatsApp.
            </p>
          </FadeIn>

          {/* Toggle Switcher */}
          <FadeIn direction="up" delay={0.2} className="packages-toggle-wrapper">
            <div className="packages-toggle-pill">
              <button
                type="button"
                className={`toggle-btn ${selectedPlan === '8' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('8')}
              >
                <span>⚡ 8 Reels Plan</span>
              </button>
              <button
                type="button"
                className={`toggle-btn ${selectedPlan === '15' ? 'active' : ''}`}
                onClick={() => setSelectedPlan('15')}
              >
                <span>🔥 15 Reels Plan <small className="savings-tag">Best Value</small></span>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Pricing Cards Grid */}
        <div className="packages-grid">
          {PACKAGES.map((pkg, index) => {
            const whatsappMessage = `Hi Triverse Vision! I am interested in the ${pkg.name} (${selectedPlan} Reels Plan). Could you please share the pricing and package details with me?`;
            const whatsappUrl = `https://wa.me/918238787327?text=${encodeURIComponent(whatsappMessage)}`;

            return (
              <FadeIn
                key={pkg.id}
                direction="up"
                delay={0.2 + index * 0.1}
                className={`pkg-card ${pkg.isPopular ? 'pkg-card--featured' : ''}`}
              >
                {pkg.isPopular && <div className="pkg-card-glow" />}
                
                <div className="pkg-card-header">
                  {pkg.badge && (
                    <span className={`pkg-badge pkg-badge--${pkg.badgeType}`}>
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="pkg-title">{pkg.name}</h3>
                  <p className="pkg-subtitle-tag">{pkg.subtitle}</p>
                  <p className="pkg-desc">{pkg.description}</p>
                </div>

                {/* Deliverable Scope & Pricing on Request Box */}
                <div className="pkg-scope-box">
                  <div className="pkg-scope-header">
                    <div className="pkg-scope-deliverable">
                      <span className="pkg-scope-count">{selectedPlan} Reels</span>
                      <span className="pkg-scope-cycle">/ Month</span>
                    </div>
                    <span className="pkg-scope-quote-badge">
                      Pricing on Request
                    </span>
                  </div>
                  <p className="pkg-scope-hint">
                    Tailored quote customized for your brand vision & production requirements.
                  </p>
                  <div className="pkg-scope-chips">
                    <span className={`pkg-chip ${selectedPlan === '8' ? 'pkg-chip--active' : ''}`}>
                      8 Reels Plan
                    </span>
                    <span className={`pkg-chip ${selectedPlan === '15' ? 'pkg-chip--active' : ''}`}>
                      15 Reels Plan
                    </span>
                  </div>
                </div>

                {/* Feature Comparison List */}
                <div className="pkg-features">
                  <p className="pkg-features-title">Feature Checklist:</p>
                  <ul className="pkg-features-list">
                    {pkg.features.map((item, idx) => (
                      <li
                        key={idx}
                        className={`pkg-feature-item ${!item.included ? 'pkg-feature-item--excluded' : ''} ${item.isUpgrade ? 'pkg-feature-item--upgrade' : ''}`}
                      >
                        {item.included ? (
                          <span className="feature-icon feature-icon--check">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="feature-icon feature-icon--cross">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                        )}
                        <div className="feature-text-wrap">
                          <span>{item.text}</span>
                          {item.isUpgrade && <span className="upgrade-tag">+ NEW</span>}
                          {!item.included && <span className="not-included-tag">Not Included</span>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Continue to WhatsApp Button */}
                <div className="pkg-cta-wrap">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pkg-cta-btn ${pkg.isPopular ? 'pkg-cta-btn--primary' : 'pkg-cta-btn--secondary'}`}
                    aria-label={`Continue to WhatsApp for pricing on ${pkg.name}`}
                  >
                    <Icons.WhatsApp style={{ width: 19, height: 19, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }} />
                    <span>Continue</span>
                    <Icons.ArrowRight style={{ width: 16, height: 16, marginLeft: 8, display: 'inline-block', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Closing Goal & CTA Banner */}
        <FadeIn direction="up" delay={0.5} className="packages-footer-banner">
          <div className="banner-glow" />
          <div className="banner-content">
            <div className="banner-quote-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="banner-statement">
              Our goal is not just to create reels, but to build a strong personal brand with high-quality and engaging content.
            </p>
            <p className="banner-substatement">
              Please let us know which package suits your requirement, or if you'd like to schedule a quick discussion to understand your goals better. Looking forward to working together.
            </p>
            <div className="banner-actions">
              <a
                href={`https://wa.me/918238787327?text=${encodeURIComponent("Hi Triverse Vision! I'd like to schedule a quick discussion to understand packages and pricing for my brand.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="banner-btn banner-btn--primary"
              >
                <Icons.WhatsApp style={{ width: 18, height: 18, marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }} />
                Schedule a Quick Discussion
              </a>
              <a href="#contact" className="banner-btn banner-btn--outline">
                Get In Touch
              </a>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Embedded CSS for guaranteed instant styling */}
      <style>{`
        .packages-section {
          background: var(--off-white, #f7fbff);
          position: relative;
          overflow: hidden;
          padding: 100px 0;
        }

        .packages-section::before {
          content: '';
          position: absolute;
          top: -150px;
          left: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .packages-section::after {
          content: '';
          position: absolute;
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(2, 62, 138, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .packages-header {
          max-width: 840px;
          margin: 0 auto 56px auto;
          text-align: center;
        }

        .packages-title {
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.2;
          margin-top: 12px;
          font-family: var(--font-head), 'Poppins', sans-serif;
          font-weight: 700;
        }

        .packages-subtitle {
          font-size: 16px;
          color: var(--gray-700, #2d4a5c);
          margin-top: 16px;
          line-height: 1.6;
        }

        .packages-toggle-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 36px;
        }

        .packages-toggle-pill {
          display: inline-flex;
          background: #ffffff;
          padding: 6px;
          border-radius: 100px;
          border: 1px solid var(--gray-200, #d6eaf4);
          box-shadow: 0 4px 20px rgba(0, 119, 182, 0.08);
          gap: 6px;
        }

        .toggle-btn {
          padding: 10px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          color: var(--gray-700, #2d4a5c);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .toggle-btn:hover {
          color: var(--french-blue, #023e8a);
        }

        .toggle-btn.active {
          background: linear-gradient(135deg, #023e8a 0%, #00b4d8 100%);
          color: #ffffff;
          box-shadow: 0 4px 16px rgba(0, 119, 182, 0.3);
        }

        .savings-tag {
          background: rgba(255, 255, 255, 0.25);
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-items: stretch;
          position: relative;
          z-index: 1;
        }

        .pkg-card {
          background: #ffffff;
          border: 1px solid var(--gray-200, #d6eaf4);
          border-radius: 28px;
          padding: 40px 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 24px rgba(0, 119, 182, 0.12);
          transition: transform 0.4s ease, box-shadow 0.4s, border-color 0.4s;
        }

        .pkg-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 80px rgba(2, 62, 138, 0.2);
          border-color: #00b4d8;
        }

        .pkg-card--featured {
          border: 2px solid #00b4d8;
          background: linear-gradient(180deg, #ffffff 0%, #f4fbfe 100%);
          box-shadow: 0 12px 48px rgba(0, 180, 216, 0.18);
        }

        .pkg-card-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 260px;
          height: 260px;
          background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .pkg-card-header {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
        }

        .pkg-badge {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }

        .pkg-badge--essential {
          background: #eef6fb;
          color: #023e8a;
          border: 1px solid #d6eaf4;
        }

        .pkg-badge--popular {
          background: linear-gradient(135deg, #023e8a 0%, #00b4d8 100%);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(0, 180, 216, 0.3);
        }

        .pkg-badge--complete {
          background: #03045e;
          color: #ade8f4;
        }

        .pkg-title {
          font-size: 22px;
          font-weight: 700;
          color: #03045e;
          margin-bottom: 6px;
          font-family: var(--font-head), 'Poppins', sans-serif;
          min-height: 64px;
          display: flex;
          align-items: flex-start;
        }

        .pkg-subtitle-tag {
          font-size: 13px;
          font-weight: 600;
          color: #0077b6;
          margin-bottom: 8px;
          line-height: 1.4;
          min-height: 38px;
          display: flex;
          align-items: flex-start;
        }

        .pkg-desc {
          font-size: 13.5px;
          color: #2d4a5c;
          line-height: 1.5;
          min-height: 64px;
        }

        .pkg-scope-box {
          background: linear-gradient(135deg, #f0f7fc 0%, #e8f4fb 100%);
          border-radius: 20px;
          padding: 18px 20px;
          margin-bottom: 24px;
          border: 1px solid rgba(0, 119, 182, 0.12);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pkg-scope-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pkg-scope-deliverable {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .pkg-scope-count {
          font-size: 26px;
          font-weight: 800;
          color: #023e8a;
          letter-spacing: -0.5px;
          font-family: var(--font-head), 'Poppins', sans-serif;
        }

        .pkg-scope-cycle {
          font-size: 14px;
          font-weight: 600;
          color: #0077b6;
        }

        .pkg-scope-quote-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #00b4d8;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0, 180, 216, 0.25);
        }

        .pkg-scope-hint {
          font-size: 12.5px;
          color: #2d4a5c;
          line-height: 1.45;
          margin: 0;
        }

        .pkg-scope-chips {
          display: flex;
          gap: 8px;
          margin-top: 2px;
        }

        .pkg-chip {
          font-size: 11px;
          padding: 4px 10px;
          border-radius: 100px;
          background: #ffffff;
          color: #2d4a5c;
          border: 1px solid #d6eaf4;
          font-weight: 500;
          transition: all 0.3s;
        }

        .pkg-chip--active {
          border-color: #00b4d8;
          background: #caf0f8;
          color: #023e8a;
          font-weight: 700;
        }

        .pkg-features {
          flex-grow: 1;
          margin-bottom: 32px;
        }

        .pkg-features-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          color: #03045e;
          letter-spacing: 0.8px;
          margin-bottom: 16px;
        }

        .pkg-features-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pkg-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: #2d4a5c;
          line-height: 1.4;
        }

        .pkg-feature-item--excluded {
          opacity: 0.55;
        }

        .feature-icon {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .feature-icon--check {
          background: #eef6fb;
          color: #0096c7;
        }

        .feature-icon--check svg {
          width: 14px;
          height: 14px;
        }

        .feature-icon--cross {
          background: #fde8e8;
          color: #e63946;
        }

        .feature-icon--cross svg {
          width: 12px;
          height: 12px;
        }

        .feature-text-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pkg-feature-item--excluded .feature-text-wrap span:first-child {
          text-decoration: line-through;
        }

        .upgrade-tag {
          font-size: 10px;
          font-weight: 700;
          background: #00b4d8;
          color: #ffffff;
          padding: 2px 6px;
          border-radius: 6px;
          letter-spacing: 0.5px;
        }

        .not-included-tag {
          font-size: 10px;
          font-weight: 600;
          background: #fde8e8;
          color: #e63946;
          padding: 2px 6px;
          border-radius: 6px;
        }

        .pkg-cta-wrap {
          margin-top: auto;
        }

        .pkg-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 52px;
          padding: 0 24px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.3s ease;
          font-family: var(--font-head), 'Poppins', sans-serif;
        }

        .pkg-cta-btn--primary {
          background: linear-gradient(135deg, #023e8a 0%, #00b4d8 100%);
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 119, 182, 0.25);
        }

        .pkg-cta-btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 119, 182, 0.4);
        }

        .pkg-cta-btn--secondary {
          background: #ffffff;
          color: #023e8a;
          border: 1px solid #d6eaf4;
        }

        .pkg-cta-btn--secondary:hover {
          border-color: #023e8a;
          background: #eef6fb;
        }

        .packages-footer-banner {
          margin-top: 72px;
          background: linear-gradient(135deg, #03045e 0%, #023e8a 100%);
          border-radius: 32px;
          padding: 56px 48px;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(2, 62, 138, 0.25);
          text-align: center;
        }

        .banner-glow {
          position: absolute;
          top: -50%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(0, 180, 216, 0.25) 0%, transparent 70%);
          pointer-events: none;
        }

        .banner-content {
          position: relative;
          z-index: 1;
          max-width: 860px;
          margin: 0 auto;
        }

        .banner-quote-icon {
          color: #48cae4;
          margin-bottom: 20px;
          opacity: 0.8;
          display: flex;
          justify-content: center;
        }

        .banner-statement {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 16px;
          color: #ffffff;
          font-family: var(--font-head), 'Poppins', sans-serif;
        }

        .banner-substatement {
          font-size: 15px;
          color: #90e0ef;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .banner-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .banner-btn {
          padding: 14px 32px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: var(--font-head), 'Poppins', sans-serif;
        }

        .banner-btn--primary {
          background: #00b4d8;
          color: #03045e;
          font-weight: 700;
          box-shadow: 0 4px 20px rgba(0, 180, 216, 0.4);
        }

        .banner-btn--primary:hover {
          transform: translateY(-2px);
          background: #48cae4;
          box-shadow: 0 8px 30px rgba(0, 180, 216, 0.6);
        }

        .banner-btn--outline {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .banner-btn--outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
        }

        @media (max-width: 1024px) {
          .packages-grid {
            grid-template-columns: 1fr;
            max-width: 560px;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .packages-footer-banner {
            padding: 36px 24px;
            border-radius: 24px;
          }
          .banner-actions {
            flex-direction: column;
            width: 100%;
          }
          .banner-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

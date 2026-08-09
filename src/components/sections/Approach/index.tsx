'use client';

import React from 'react';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';

export default function Approach() {
  return (
    <section id="approach" className="two-ways section">
      <div className="container">
        {/* Section Header */}
        <div className="two-ways-header">
          <FadeIn direction="up" className="section-label">Our Approach</FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="section-title two-ways-title">
              Same Value. Same Price.
              <span className="text-gradient"> Two Ways to Create.</span>
            </h2>
          </FadeIn>
        </div>

        {/* Split Layout */}
        <div className="two-ways-split">
          {/* LEFT: AI CLONE */}
          <FadeIn direction="left" delay={0.2} duration={0.8} className="way-card way-card--ai">
            <div className="way-card-glow"></div>
            <div className="way-badge way-badge--ai">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              AI-Powered
            </div>
            <h3 className="way-title">AI Clone Creation</h3>
            <p className="way-subtitle">Your face, your voice — scaled infinitely without you showing up.</p>

            <div className="way-visual way-visual--ai">
              <div className="ai-input-stack">
                <p className="ai-stack-label">Inputs</p>
                <div className="ai-input-chip ai-input-chip--photo">
                  <div className="ai-chip-avatar">
                    <Image src="/assets/sampleimage.png" alt="Your photo" width={48} height={48} />
                  </div>
                  <div className="ai-chip-info">
                    <span className="ai-chip-title">Your Photo</span>
                    <span className="ai-chip-sub">✓ face_photo.jpg</span>
                  </div>
                </div>
                <div className="ai-input-chip ai-input-chip--voice">
                  <div className="ai-chip-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    </svg>
                  </div>
                  <div className="ai-chip-info">
                    <span className="ai-chip-title">Voice Sample</span>
                    <div className="ai-mini-wave">
                      <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ai-flow-arrow">
                <div className="ai-flow-dot"></div>
                <div className="ai-flow-line"></div>
                <div className="ai-flow-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  AI
                </div>
                <div className="ai-flow-line"></div>
                <div className="ai-flow-dot ai-flow-dot--end"></div>
              </div>

              <div className="ai-phone-wrap">
                <div className="ai-phone-mockup">
                  <div className="phone-btn phone-btn--vol-up"></div>
                  <div className="phone-btn phone-btn--vol-down"></div>
                  <div className="phone-btn phone-btn--power"></div>
                  <div className="ai-phone-screen">
                    <div className="phone-status-bar">
                      <span className="phone-time">9:41</span>
                      <div className="phone-status-icons">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                        </svg>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10">
                          <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                        </svg>
                      </div>
                    </div>
                    <video autoPlay muted loop playsInline poster="/assets/sampleimage.png" className="ai-phone-video">
                      <source src="https://res.cloudinary.com/dufzjnj9b/video/upload/w_320,h_568,c_fill,q_auto,f_auto/v1775669495/New_Project_6_1EA079D_q91u0a.mp4" type="video/mp4" />
                    </video>
                    <div className="phone-video-overlay">
                      <div className="phone-sound-bars">
                        <span></span><span></span><span></span><span></span><span></span>
                      </div>
                      <span className="phone-live-tag">
                        <i className="live-blink"></i> LIVE AI
                      </span>
                    </div>
                    <div className="phone-home-pill"></div>
                  </div>
                </div>
                <div className="ai-phone-glow"></div>
              </div>
            </div>

            <ul className="way-steps">
              <li className="way-step">
                <div className="way-step-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <div>
                  <strong>Upload Your Photo</strong>
                  <span>One clear facial image is all we need</span>
                </div>
              </li>
              {/* Other steps simplified for brevity */}
            </ul>
          </FadeIn>

          <div className="way-divider">
            <p className="way-center-message">Different Process.<br /><strong>Same Powerful Result.</strong></p>
            <div className="way-divider-line"></div>
            <div className="way-divider-badge">
              <span>OR</span>
            </div>
            <div className="way-divider-line"></div>
          </div>

          <FadeIn direction="right" delay={0.4} duration={0.8} className="way-card way-card--real">
            <div className="way-card-glow way-card-glow--real"></div>
            <div className="way-badge way-badge--real">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12v8H3a1 1 0 01-1-1V9a1 1 0 011-1z" />
              </svg>
              Real Production
            </div>
            <h3 className="way-title">Real Video Production</h3>
            <p className="way-subtitle">Professional cameras, elite editing, and a dedicated team at your service.</p>

            <div className="way-visual way-visual--real">
              <div className="filming-scene">
                <div className="film-rig">
                  <div className="film-camera">
                    <div className="camera-body">
                      <div className="camera-lens"><div className="lens-inner"></div></div>
                      <div className="camera-viewfinder"></div>
                      <div className="camera-record-btn"></div>
                    </div>
                    <div className="camera-tripod">
                      <div className="tripod-leg"></div>
                      <div className="tripod-leg"></div>
                      <div className="tripod-leg"></div>
                    </div>
                  </div>
                  <div className="studio-light studio-light--left">
                    <div className="light-head"></div>
                    <div className="light-beam"></div>
                  </div>
                  <div className="rec-indicator"><span className="rec-dot"></span>REC</div>
                </div>
                <div className="film-waveform">
                  <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>

            <ul className="way-steps">
              <li className="way-step">
                <div className="way-step-icon way-step-icon--real">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <path d="M15 10l4.553-2.069A1 1 0 0121 8.87V15.13a1 1 0 01-1.447.9L15 14M3 8h12v8H3a1 1 0 01-1-1V9a1 1 0 011-1z" />
                  </svg>
                </div>
                <div>
                  <strong>Camera Shooting</strong>
                  <span>On-site or remote-directed production</span>
                </div>
              </li>
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

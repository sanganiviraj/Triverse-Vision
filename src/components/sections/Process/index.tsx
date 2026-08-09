'use client';

import React from 'react';
import FadeIn from '@/components/common/FadeIn';

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Discovery Call",
      desc: "We start by understanding your brand, audience, and goals. A 30-minute strategy session that maps out your entire content direction."
    },
    {
      num: "02",
      title: "Script & Concept",
      desc: "Our team develops hooks, scripts, and a visual storyboard tailored to your unique voice and target niche."
    },
    {
      num: "03",
      title: "Shoot & Edit",
      desc: "Remote direction or on-site production. Elite editing with custom motion graphics, sound design, and precise pacing."
    },
    {
      num: "04",
      title: "Publish & Grow",
      desc: "We handle posting, platform optimisation, and monthly performance reviews to keep your content improving."
    }
  ];

  return (
    <section id="process" className="process section">
      <div className="container">
        <FadeIn direction="up" className="section-label">How It Works</FadeIn>
        <FadeIn direction="up" delay={0.1}><h2 className="section-title">Our <span className="text-gradient">Simple</span> Process</h2></FadeIn>

        <div className="process-timeline">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <FadeIn direction={index % 2 === 0 ? 'left' : 'right'} delay={0.2 + (index * 0.1)} className="process-step">
                <div className="step-number">{step.num}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </FadeIn>
              {index < steps.length - 1 && <div className="process-connector"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

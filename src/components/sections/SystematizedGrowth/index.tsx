'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Search, PenTool, Video, Scissors, Send, Users } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Deep-Dive Research',
    description: 'We analyze your competitors, niche gaps, and viral patterns to build a data-backed content strategy.',
    image: '/images/growth/step1.png',
    icon: <Search className="w-5 h-5 text-white" />
  },
  {
    number: '02',
    title: 'Viral Scripting',
    description: 'Our expert scriptwriters craft high-retention hooks and narratives optimized for platform algorithms.',
    image: '/images/growth/step2.png',
    icon: <PenTool className="w-5 h-5 text-white" />
  },
  {
    number: '03',
    title: 'Guided Shooting',
    description: 'Receive professional guidance on lighting, framing, and delivery to ensure premium content quality.',
    image: '/images/growth/step3.png',
    icon: <Video className="w-5 h-5 text-white" />
  },
  {
    number: '04',
    title: 'High-Retention Editing',
    description: 'Advanced editing with custom motion graphics and precise pacing to keep viewers hooked.',
    image: '/images/growth/step4.png',
    icon: <Scissors className="w-5 h-5 text-white" />
  },
  {
    number: '05',
    title: 'Strategic Posting',
    description: 'Optimization and posting at peak times to maximize reach and engagement across platforms.',
    image: '/images/growth/step5.png',
    icon: <Send className="w-5 h-5 text-white" />
  },
  {
    number: '06',
    title: 'Growth Management',
    description: 'Continuous tracking and community management to scale your brand and build loyalty.',
    image: '/images/growth/step6.png',
    icon: <Users className="w-5 h-5 text-white" />
  }
];

export default function SystematizedGrowth() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="growth" className="growth-section" ref={containerRef}>
      <div className="container">
        {/* Header Section */}
        <div className="growth-header">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="growth-label"
          >
            Systematized Growth
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="growth-title"
          >
            Our Proven <br />
            <span className="text-gradient">Personal Branding Agency Protocol</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="growth-subtitle"
          >
            We Don’t Guess. Our Personal Branding Expert follows a proven scientific process to scale your brand.
          </motion.p>
        </div>

        {/* Timeline Section */}
        <div className="growth-timeline-wrapper">
          {/* Vertical Timeline Line */}
          <div className="growth-line-bg hidden-mobile" />
          <motion.div 
            className="growth-line-fill hidden-mobile"
            style={{ scaleY, x: "-50%" }}
          />

          <div className="growth-steps">
            {steps.map((step, index) => (
              <div key={index} className={`growth-step-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'}`}>
                
                {/* Content Side */}
                <div className="growth-content-col">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="growth-card"
                  >
                    <div className={`ghost-number ${index % 2 === 0 ? 'ghost-right' : 'ghost-left'}`}>
                      {step.number}
                    </div>

                    <div className={`card-inner ${index % 2 === 0 ? 'align-end text-right' : 'align-start text-left'}`}>
                      <div className="icon-box">
                        {step.icon}
                      </div>
                      <h3 className="card-title">
                        {step.title}
                      </h3>
                      <p className="card-desc">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Center Circle */}
                <div className="growth-dot-wrapper hidden-mobile">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="growth-dot"
                  />
                </div>

                {/* Image Side */}
                <div className="growth-image-col">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="growth-image-wrapper"
                  >
                    <Image 
                      src={step.image} 
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="growth-img"
                    />
                    <div className="image-overlay" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="growth-ambience">
        <div className="ambience-blob blob-top" />
        <div className="ambience-blob blob-bottom" />
      </div>
    </section>
  );
}

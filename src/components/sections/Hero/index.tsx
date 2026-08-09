'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

import { reelsData } from '@/data/reels';
import Magnetic from '@/components/common/Magnetic';

function useTilt(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let lerpAmount = 0.06;
    let rotX = 0;
    let rotY = 0;
    let bgPosX = 0;
    let bgPosY = 0;

    let targetRotX = 0;
    let targetRotY = 0;
    let targetBgPosX = 0;
    let targetBgPosY = 0;

    let rafId = 0;

    const inner = node.querySelector('.slide__inner') as HTMLElement;
    if (!inner) return;

    function ticker() {
      rotX = lerp(rotX, targetRotX, lerpAmount);
      rotY = lerp(rotY, targetRotY, lerpAmount);
      bgPosX = lerp(bgPosX, targetBgPosX, lerpAmount);
      bgPosY = lerp(bgPosY, targetBgPosY, lerpAmount);

      inner.style.setProperty("--rotX", rotX.toFixed(2) + "deg");
      inner.style.setProperty("--rotY", rotY.toFixed(2) + "deg");
      inner.style.setProperty("--bgPosX", bgPosX.toFixed(2) + "%");
      inner.style.setProperty("--bgPosY", bgPosY.toFixed(2) + "%");

      rafId = requestAnimationFrame(ticker);
    }

    const onMouseMove = (e: MouseEvent) => {
      lerpAmount = 0.1;
      const rect = node.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
      const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);

      targetRotX = oy;
      targetRotY = ox;
      targetBgPosX = -ox * 0.3;
      targetBgPosY = oy * 0.3;
    };

    const onMouseLeave = () => {
      lerpAmount = 0.06;
      targetRotX = 0;
      targetRotY = 0;
      targetBgPosX = 0;
      targetBgPosY = 0;
    };

    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(ticker);

    return () => {
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

interface ReelVideo {
  id: number;
  title: string;
  desc: string;
  tag: string;
  img: string;
  video: string;
}

const SlideItem = ({ video, stateProp, zIndex }: { video: ReelVideo; stateProp: string; zIndex: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useTilt(ref);

  const isCurrent = stateProp === 'data-current';

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isCurrent) {
      videoEl.play().catch(() => {
        // Safe catch for browsers blocking autoplay
      });
    } else {
      videoEl.pause();
    }
  }, [isCurrent]);

  return (
    <div
      ref={ref}
      className="slide"
      {...(stateProp ? { [stateProp]: true } : {})}
      style={{ zIndex }}
    >
      <div className="slide__inner">
        <div className="slide--image__wrapper">
          <video
            ref={videoRef}
            className="slide--image"
            muted
            loop
            playsInline
            preload={isCurrent ? "auto" : "metadata"}
            poster={video.img}
          >
            <source src={video.video} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIdx((prev) => (prev + 1) % reelsData.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + reelsData.length) % reelsData.length);
  };

  const getSlideState = (index: number) => {
    if (index === currentIdx) return 'data-current';
    if (index === (currentIdx + 1) % reelsData.length) return 'data-next';
    if (index === (currentIdx - 1 + reelsData.length) % reelsData.length) return 'data-previous';
    return '';
  };

  const getZIndex = (index: number) => {
    const state = getSlideState(index);
    if (state === 'data-current') return 30;
    if (state === 'data-previous') return 20;
    if (state === 'data-next') return 20;
    return 10;
  };

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 1.0, // Wait for preloader to start sliding up
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 40, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number]
      }
    }
  };

  return (
    <section ref={containerRef} id="hero" className="hero relative overflow-hidden bg-white">
      <motion.div style={{ y: yBackground }} className="hero-bg">
        <div className="hero-particles" id="particles">
          <div className="particle" style={{ top: '20%', left: '10%', width: '4px', height: '4px', animationDelay: '0s' }}></div>
          <div className="particle" style={{ top: '60%', left: '15%', width: '6px', height: '6px', animationDelay: '1s' }}></div>
          <div className="particle" style={{ top: '30%', left: '80%', width: '5px', height: '5px', animationDelay: '2s' }}></div>
          <div className="particle" style={{ top: '80%', left: '70%', width: '4px', height: '4px', animationDelay: '1.5s' }}></div>
          <div className="particle" style={{ top: '15%', left: '50%', width: '3px', height: '3px', animationDelay: '0.5s' }}></div>
        </div>
      </motion.div>
      <div className="container hero-container relative z-10">
        {/* LEFT: Text Content */}
        <motion.div 
          className="hero-content"
          style={{ opacity: opacityText, y: yText }}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp} className="hero-tag">
            <span className="dot"></span>
            Cinematic &middot; Reel-Focused &middot; Brand-First
          </motion.div>
          <motion.h1 variants={fadeInUp} className="hero-title">
            We Create Content That
            <span className="text-gradient"> Commands</span> Attention.
          </motion.h1>
          <motion.p variants={fadeInUp} className="hero-sub">
            Cinematic reels, brand films, and social content built for founders who want to lead their industry online.
          </motion.p>
          <motion.div variants={fadeInUp} className="hero-actions flex gap-4 mt-8">
            <Magnetic strength={0.4}>
              <a href="#work" className="btn btn-primary">
                <span>View Our Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="#contact" className="btn btn-ghost">Start a Project</a>
            </Magnetic>
          </motion.div>
        </motion.div>
        
        {/* RIGHT: Slider */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.95, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="slider">
            <button className="slider--btn slider--btn__prev" aria-label="Previous reel" onClick={prevSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <div className="slides__wrapper">
              <div className="slides">
                {reelsData.map((video, index) => {
                  const stateProp = getSlideState(index);
                  if (!stateProp) return null;
                  const zIndex = getZIndex(index);
                  return <SlideItem key={video.id} video={video} stateProp={stateProp} zIndex={zIndex} />;
                })}
              </div>
            </div>

            <button className="slider--btn slider--btn__next" aria-label="Next reel" onClick={nextSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <motion.div 
          className="w-[1px] h-[60px] bg-gray-300 relative overflow-hidden"
        >
          <motion.div 
            className="absolute top-0 left-0 w-full h-[20px] bg-bright-teal"
            animate={{ y: [0, 60] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <span className="text-xs font-bold tracking-widest text-gray-400">SCROLL</span>
      </motion.div>
    </section>
  );
}

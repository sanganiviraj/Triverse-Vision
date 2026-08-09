'use client';

import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap
} from 'framer-motion';

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Increase speed based on scroll velocity
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax-marquee overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="scroller flex whitespace-nowrap flex-nowrap" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

export default function MarqueeStrip() {
  const items = [
    "Brand Films", "Reels", "Motion Graphics", "Social Content",
    "Brand Identity", "Scripting", "Visual Strategy"
  ];

  return (
    <div className="marquee-strip py-8 bg-deep-twilight text-white relative">
      <ParallaxText baseVelocity={-2}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="text-2xl md:text-4xl font-bold uppercase tracking-wider mx-8">{item}</span>
            <span className="dot-sep text-bright-teal text-4xl">•</span>
          </React.Fragment>
        ))}
      </ParallaxText>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide the static HTML loader defined in layout immediately
    const staticLoader = document.getElementById('loader');
    if (staticLoader) {
      staticLoader.style.display = 'none';
    }

    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    // Show splash screen for 1 second before hiding
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 1000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image 
                src="/assets/triverse_vision_logo.png" 
                alt="Triverse Vision Logo" 
                width={240} 
                height={53} 
                className="w-[200px] md:w-[240px] h-auto object-contain" 
                priority
              />
            </motion.div>
            
            {/* Premium Double Concentric Spinner */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Outer Ring - Clockwise */}
              <motion.div
                className="absolute inset-0 border-[2px] border-transparent rounded-full"
                style={{
                  borderTopColor: 'var(--turquoise-surf)',
                  borderBottomColor: 'var(--turquoise-surf)',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              
              {/* Inner Ring - Counter Clockwise */}
              <motion.div
                className="absolute w-10 h-10 border-[3px] border-transparent rounded-full"
                style={{
                  borderLeftColor: 'var(--bright-teal)',
                  borderRightColor: 'var(--bright-teal)',
                }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />

              {/* Center Glowing Pulsating Dot */}
              <motion.div
                className="w-3.5 h-3.5 rounded-full bg-deep-twilight"
                style={{ boxShadow: '0 0 12px var(--turquoise-surf)' }}
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

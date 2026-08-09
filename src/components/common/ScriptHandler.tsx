'use client';

import { useEffect } from 'react';

export default function ScriptHandler() {
  useEffect(() => {
    // Force scroll to top on refresh
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    // ── REEL CARD HOVER VIDEO ─────────────────
    document.querySelectorAll('.reel-card').forEach(cardEl => {
      const card = cardEl as HTMLElement;
      const video = card.querySelector('.reel-video') as HTMLVideoElement;
      
      card.addEventListener('mouseenter', () => {
        if (!video) return;
        video.play().catch(() => { });
      });

      card.addEventListener('mouseleave', () => {
        if (!video) return;
        video.pause();
        video.currentTime = 0;
      });
    });

    // ── SMOOTH ANCHOR SCROLL ───────────────────────────
    const handleAnchorClick = (e: MouseEvent) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (href && href.startsWith('#') && href !== '#') {
        try {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } catch (err) {
          // Ignore syntax errors for invalid selectors safely
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', handleAnchorClick as any);
    });

    return () => {
      // Cleanup event listeners
    };
  }, []);

  return null;
}

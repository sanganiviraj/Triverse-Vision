'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScroller({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, wheelMultiplier: 1.0 }}>
      {children}
    </ReactLenis>
  );
}

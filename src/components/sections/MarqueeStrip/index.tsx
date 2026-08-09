'use client';

import React from 'react';

export default function MarqueeStrip() {
  const items = ["Brand Films", "Reels", "Motion Graphics", "Social Content", "Brand Identity", "Scripting", "Visual Strategy"];
  
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <span className="dot-sep">·</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

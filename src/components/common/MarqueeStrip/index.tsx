import React from 'react';

const TAGS = [
  'Brand Films', 'Reels', 'Motion Graphics', 'Social Content', 'Brand Identity', 'Scripting', 'Visual Strategy'
];

export default function MarqueeStrip() {
  const repeatedTags = [...TAGS, ...TAGS, ...TAGS, ...TAGS];

  return (
    <div className="bg-[var(--deep-twilight)] py-8 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {repeatedTags.map((tag, i) => (
          <React.Fragment key={i}>
            <span className="text-white font-display font-extrabold text-xl lg:text-3xl uppercase tracking-wider mx-8 opacity-90">
              {tag}
            </span>
            <span className="text-[var(--sky-aqua)] text-2xl lg:text-3xl mx-4">•</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

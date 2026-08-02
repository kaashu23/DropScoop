import React from 'react';

export default function TickerBanner() {
  const items = Array(10).fill('BUY YOURS NOW');

  return (
    <div className="bg-[#3d2826] text-white py-4 overflow-hidden shadow-inner">
      <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_20s_linear_infinite]">
        {items.map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <span>🍦</span>
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

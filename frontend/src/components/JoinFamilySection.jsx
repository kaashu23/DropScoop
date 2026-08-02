import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function JoinFamilySection() {
  return (
    <section className="bg-[#faf5ef] py-20 overflow-hidden border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Image with Left/Right Carousel Controls */}
          <div className="lg:col-span-6 flex items-center justify-center gap-4 sm:gap-6">
            
            {/* Left Circular Arrow */}
            <button className="w-12 h-12 rounded-full bg-[#3d2826] text-white flex items-center justify-center shadow-lg hover:bg-[#523734] transition-colors shrink-0">
              <ChevronLeft className="w-6 h-6 stroke-[2]" />
            </button>

            {/* Vertical Image */}
            <div className="w-full max-w-xs sm:max-w-sm h-[400px] sm:h-[480px] rounded-[2rem] overflow-hidden shadow-2xl bg-white border-4 border-white/80">
              <img 
                src="/images/hero_cones.png" 
                alt="Milky Scoops Catering & Family" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Right Circular Arrow */}
            <button className="w-12 h-12 rounded-full bg-[#3d2826] text-white flex items-center justify-center shadow-lg hover:bg-[#523734] transition-colors shrink-0">
              <ChevronRight className="w-6 h-6 stroke-[2]" />
            </button>

          </div>

          {/* Right Column: Title, Subtitle, CTA */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#3d2826] leading-tight tracking-tight">
              Join The Milky <br />
              Scoops Family Today!
            </h2>

            <p className="text-xs sm:text-sm text-[#7a6663] leading-relaxed max-w-lg">
              Celebrate life's sweetest moments with Milky Scoops. Whether it's a birthday party, a wedding, or a corporate event, our ice cream catering services are designed to elevate any gathering.
            </p>

            <div className="pt-4">
              <button className="btn-brown-pill px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-md">
                TAKE A SPLASH
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

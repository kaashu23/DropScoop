import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-[#faf5ef] pt-8 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          
          {/* Left Column: Heading & Flavors pill */}
          <div className="lg:col-span-4 space-y-8">
            <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl text-[#3d2826] leading-[1.1] tracking-tight">
              Welcome <br />
              To <br />
              Milky <br />
              Scoops!
            </h1>

            <div>
              <button className="btn-brown-pill px-7 py-3.5 text-sm font-semibold tracking-wide shadow-md hover:shadow-lg">
                Symphony Of Flavours
              </button>
            </div>

            {/* Circular Thumbnail Previews */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src="/images/hazelnut.png" alt="Flavor 1" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src="/images/mint_chocolate.png" alt="Flavor 2" className="w-full h-full object-cover" />
              </div>
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img src="/images/strawberry.png" alt="Flavor 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Middle Column: Hero Main Vertical Image + Pink Accent Blob */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Pink Background Circle Blob */}
            <div className="absolute -top-6 right-4 sm:right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#ff8eb2] -z-0" />

            {/* Main Rounded Image Frame */}
            <div className="relative z-10 w-full max-w-sm sm:max-w-md h-[460px] sm:h-[540px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/60">
              <img 
                src="/images/hero_cones.png" 
                alt="Milky Scoops Ice Cream Cones" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Right Column: Features & Buy Now */}
          <div className="lg:col-span-3 space-y-8 pl-0 lg:pl-4">
            
            {/* Feature 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#3d2826] flex items-center justify-center text-[#3d2826]">
                  <CheckCircle2 className="w-5 h-5 stroke-[1.75]" />
                </div>
                <span className="font-serif font-bold text-3xl text-[#3d2826]">100%</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7a6663] leading-relaxed font-normal">
                Our ice creams are masterfully made in small batches, ensuring the utmost attention to detail and quality.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-[#3d2826] flex items-center justify-center text-[#3d2826]">
                  <span className="text-lg font-bold">🍦</span>
                </div>
                <span className="font-serif font-bold text-3xl text-[#3d2826]">10+</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7a6663] leading-relaxed font-normal">
                We have different different amazing flavor's to satisfy every craving.
              </p>
            </div>

            {/* Buy Now Button */}
            <div className="pt-2">
              <button className="btn-brown-pill px-8 py-3.5 text-xs uppercase tracking-widest font-bold">
                BUY NOW
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

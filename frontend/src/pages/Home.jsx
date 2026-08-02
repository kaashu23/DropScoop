import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, IceCream2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const popularFlavors = [
    { name: "Hazelnut Flavour Icecream", price: 149, img: "/images/hazelnut.png", bg: "bg-[#fbece4]" },
    { name: "Mint & Chocolate Flavour Icecream", price: 149, img: "/images/mint_chocolate.png", bg: "bg-[#e5f0e6]" },
    { name: "Orange Flavour Icecream", price: 149, img: "/images/orange.png", bg: "bg-[#fcf0dc]" }
  ];

  const categories = [
    { name: "Butterscotch Flavour", bg: "bg-[#fcf0dc]", img: "/images/orange.png" },
    { name: "Strawberry Flavour", bg: "bg-[#fde6e8]", img: "/images/strawberry.jpg" },
    { name: "Chocolate Flavour", bg: "bg-[#f5ebd9]", img: "/images/chocolate.jpg" },
    { name: "Vanilla Flavour", bg: "bg-[#fcf8e6]", img: "/images/vanilla.jpg" }
  ];

  return (
    <div className="w-full font-sans bg-[#fdfbf7] text-[#4a3531] overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-20 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center min-h-[90vh]">
        {/* Left Column */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-8 md:space-y-10">
          <h1 className="text-5xl sm:text-6xl lg:text-[76px] font-serif text-[#4a3531] leading-[1.1] md:leading-[1.05]">
            Welcome <br className="hidden md:block"/> To <br className="hidden md:block"/> DropScoop!
          </h1>
          <button className="bg-[#5c433e] text-white px-8 py-3.5 rounded-2xl italic font-serif text-lg sm:text-xl shadow-lg w-full sm:w-auto">
            Symphony Of Flavours
          </button>
          
          <div className="flex -space-x-4 pt-4 justify-center md:justify-start">
            <img src="/images/hazelnut.png" alt="flavor" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#fdfbf7] object-cover shadow-sm bg-white" />
            <img src="/images/mint_chocolate.png" alt="flavor" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#fdfbf7] object-cover shadow-sm bg-white" />
            <img src="/images/strawberry.png" alt="flavor" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[#fdfbf7] object-cover shadow-sm bg-white" />
          </div>
        </div>

        {/* Center Column */}
        <div className="md:col-span-4 relative flex justify-center w-full mt-8 md:mt-0">
          <div className="absolute -top-6 -right-2 md:-top-10 md:-right-6 w-24 h-24 md:w-36 md:h-36 bg-[#ff7fb3] rounded-full -z-10" />
          <div className="w-full max-w-[280px] sm:max-w-[360px] aspect-[3/4] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-2xl border-4 border-white">
            <img 
              src="/images/hero_cones.png" 
              alt="Assorted Ice Creams" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 flex flex-col space-y-12 md:space-y-16 md:pl-10 mt-12 md:mt-0 items-center md:items-start text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#4a3531] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#4a3531]" />
              </div>
              <h3 className="text-3xl md:text-[40px] font-serif text-[#4a3531]">100%</h3>
            </div>
            <p className="text-[#8c7875] leading-relaxed text-sm md:text-[15px] max-w-sm">
              Our ice creams are masterfully made in small batches, ensuring the utmost attention to detail and quality.
            </p>
            <div className="w-full h-px bg-[#4a3531]/10 mt-8 hidden md:block" />
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full border border-[#4a3531] flex items-center justify-center">
                <IceCream2 className="w-6 h-6 text-[#4a3531]" />
              </div>
              <h3 className="text-3xl md:text-[40px] font-serif text-[#4a3531]">10+</h3>
            </div>
            <p className="text-[#8c7875] leading-relaxed text-sm md:text-[15px] mb-8 max-w-sm">
              We have different amazing flavors to satisfy every craving.
            </p>
            <Link to="/flavors">
              <button className="bg-black text-white font-bold tracking-widest text-[13px] px-10 py-4 rounded-xl hover:bg-gray-800 transition-colors w-full sm:w-auto">
                BUY NOW
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Popular Icecreams */}
      <section className="w-full bg-white relative py-16 md:py-24 overflow-hidden">
        {/* Watermark text */}
        <div className="absolute top-10 right-[-10%] md:right-20 text-[120px] md:text-[200px] font-serif font-bold text-[#faf5ef] -z-0 select-none leading-none tracking-tighter opacity-50 md:opacity-100">
          100%
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-[56px] font-serif text-[#4a3531] mb-6 leading-tight">
              Our Popular Icecreams
            </h2>
            <p className="text-[#8c7875] max-w-2xl mx-auto text-sm md:text-[15px] leading-relaxed">
              Check out the new Summer spring Collection, a twist on the classic that makes every bite super duper scrumptious!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-8">
            {popularFlavors.map((flavor, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className={`w-full max-w-[280px] md:max-w-full aspect-[2/1] ${flavor.bg} rounded-t-full relative flex items-center justify-center mb-8 mt-16`}>
                  <img src={flavor.img} alt={flavor.name} className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover shadow-2xl absolute -bottom-10 bg-white border-[6px] border-white" />
                </div>
                <div className="mt-12 md:mt-14 w-full flex flex-col items-center md:items-start">
                  <h3 className="text-xl md:text-[22px] font-serif text-[#4a3531] mb-1">
                    {flavor.name}
                  </h3>
                  <p className="text-[#8c7875] text-[15px] mb-6">₹{flavor.price.toFixed(2)}</p>
                  <Link to="/flavors">
                    <button className="bg-black text-white font-bold tracking-widest text-[12px] px-8 py-3.5 rounded-lg hover:bg-gray-800 transition-colors w-max">
                      BUY NOW
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Marquee & Categories */}
      <section className="bg-[#fdfbf7]">
        {/* Marquee */}
        <div className="bg-[#4a3531] text-white py-4 overflow-hidden relative flex">
          <div className="whitespace-nowrap flex items-center w-max animate-custom-marquee">
            {[...Array(15)].map((_, i) => (
              <div key={`orig-${i}`} className="flex items-center mx-6">
                <IceCream2 className="w-5 h-5 mr-6 opacity-80" />
                <span className="tracking-widest font-bold text-[13px] uppercase">BUY YOURS NOW</span>
              </div>
            ))}
            {[...Array(15)].map((_, i) => (
              <div key={`dup-${i}`} className="flex items-center mx-6">
                <IceCream2 className="w-5 h-5 mr-6 opacity-80" />
                <span className="tracking-widest font-bold text-[13px] uppercase">BUY YOURS NOW</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left mb-16 md:mb-24 gap-6 md:gap-8">
            <h2 className="text-4xl md:text-[56px] font-serif text-[#4a3531] max-w-sm leading-[1.1]">
              Explore Our Best Categories
            </h2>
            <p className="text-[#8c7875] max-w-md text-sm md:text-[15px] leading-relaxed">
              Are you ready to experience a heavenly treat that will tantalize your taste buds? DropScoop is here to transport you to a world of frozen delights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
            {categories.map((cat, idx) => (
              <div key={idx} className={`${cat.bg} rounded-[24px] p-6 flex flex-col items-center text-center relative pb-12`}>
                <div className="w-[80%] aspect-square -mt-16 mb-6 overflow-hidden shadow-lg bg-white p-2 rounded-xl">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <h3 className="text-lg md:text-[20px] font-serif text-[#4a3531] leading-tight mb-2">{cat.name}</h3>
                
                <button className="absolute -bottom-6 w-12 h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-lg">
                  <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Join Family CTA */}
      <section className="bg-white py-16 md:py-24 border-b border-[#4a3531]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 justify-center">
            
            <div className="flex items-center justify-center gap-4 md:gap-6 w-full md:w-auto">
              <button className="hidden sm:flex w-10 h-10 md:w-14 md:h-14 bg-black rounded-full items-center justify-center text-white hover:bg-gray-800 shrink-0">
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <div className="w-[280px] md:w-[340px] max-w-[80vw] aspect-[3/4] overflow-hidden rounded-[30px] md:rounded-[40px] shadow-xl">
                <img 
                  src="/images/hero_cones.png" 
                  alt="CTA Ice Creams" 
                  className="w-full h-full object-cover"
                />
              </div>

              <button className="hidden sm:flex w-10 h-10 md:w-14 md:h-14 bg-black rounded-full items-center justify-center text-white hover:bg-gray-800 shrink-0">
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            <div className="max-w-md text-center md:text-left">
              <h2 className="text-4xl md:text-[56px] font-serif text-[#4a3531] mb-6 leading-[1.1]">
                Join The <br className="hidden md:block"/> DropScoop Family Today!
              </h2>
              <p className="text-[#8c7875] text-sm md:text-[15px] leading-relaxed mb-8 md:mb-10">
                Celebrate life's sweetest moments with DropScoop. Whether it's a birthday party, a wedding, or a corporate event, our ice cream catering services are designed to elevate any gathering.
              </p>
              <button className="bg-black text-white font-bold tracking-widest text-[13px] px-10 py-4 rounded-xl hover:bg-gray-800 transition-colors uppercase w-full sm:w-auto">
                Take A Splash
              </button>
            </div>

          </div>
        </div>
      </section>
      
    </div>
  );
}

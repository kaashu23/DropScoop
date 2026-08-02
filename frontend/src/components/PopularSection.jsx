import React from 'react';

export default function PopularSection() {
  const popularItems = [
    {
      id: 'hazelnut',
      title: 'Hazelnut Flavour Icecream',
      price: '$5.90',
      bgColor: 'bg-[#fcece4]',
      image: '/images/hazelnut.png'
    },
    {
      id: 'mint',
      title: 'Mint & Chocolate Flavour Icecream',
      price: '$5.90',
      bgColor: 'bg-[#e4f0e5]',
      image: '/images/mint_chocolate.png'
    },
    {
      id: 'orange',
      title: 'Orange Flavour Icecream',
      price: '$5.90',
      bgColor: 'bg-[#fcf0dc]',
      image: '/images/orange.png'
    }
  ];

  return (
    <section className="bg-[#faf5ef] py-20 relative overflow-hidden">
      
      {/* Background Watermark 100% Text */}
      <div className="absolute top-10 right-10 text-[180px] sm:text-[240px] font-serif font-bold text-stone-200/40 select-none pointer-events-none -z-0 leading-none">
        100%
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#3d2826] tracking-tight mb-4">
            Our Popular Icecreams
          </h2>
          <p className="text-xs sm:text-sm text-[#7a6663] leading-relaxed">
            Check out the new Summer spring Collection, a twist on the classic that makes every bite super duper scrumptious!
          </p>
        </div>

        {/* 3 Arch Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center group">
              
              {/* Arch Top Banner Container */}
              <div className={`w-full h-[320px] ${item.bgColor} rounded-t-[140px] flex items-center justify-center p-6 relative overflow-hidden transition-transform duration-300 group-hover:-translate-y-2`}>
                
                {/* Center Circle Image Frame */}
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>

              </div>

              {/* Below Card Details */}
              <div className="w-full text-left pt-5 space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#3d2826]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#7a6663] font-medium">
                  {item.price}
                </p>

                <div className="pt-2">
                  <button className="btn-brown-pill px-6 py-2.5 text-[11px] uppercase tracking-wider font-bold">
                    BUY NOW
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

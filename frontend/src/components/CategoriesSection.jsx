import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function CategoriesSection() {
  const categories = [
    {
      id: 'butterscotch',
      title: 'Butterscotch Flavour',
      bgColor: 'bg-[#fcf0dc]',
      image: '/images/orange.png'
    },
    {
      id: 'strawberry',
      title: 'Strawberry Flavour',
      bgColor: 'bg-[#fde6e8]',
      image: '/images/strawberry.png'
    },
    {
      id: 'chocolate',
      title: 'Chocolate Flavour',
      bgColor: 'bg-[#f5ebd9]',
      image: '/images/mint_chocolate.png'
    },
    {
      id: 'vanilla',
      title: 'Vanilla Flavour',
      bgColor: 'bg-[#fcece4]',
      image: '/images/hazelnut.png'
    }
  ];

  return (
    <section className="bg-[#faf5ef] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <div className="lg:col-span-6">
            <h2 className="font-serif font-bold text-4xl sm:text-5xl text-[#3d2826] tracking-tight leading-tight">
              Explore Our Best <br />
              Categories
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm text-[#7a6663] leading-relaxed max-w-md">
              Are you ready to experience a heavenly treat that will tantalize your taste buds? Milky Scoops is here to transport you to a world of frozen delights.
            </p>
          </div>
        </div>

        {/* 4 Category Column Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className={`${cat.bgColor} rounded-3xl p-6 flex flex-col items-center justify-between min-h-[380px] shadow-sm hover:shadow-md transition-shadow group relative`}
            >
              {/* Square Image Box */}
              <div className="w-full h-44 rounded-2xl overflow-hidden shadow-md bg-white mb-6">
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Title & Action */}
              <div className="text-center space-y-4 w-full">
                <h3 className="font-serif font-bold text-base text-[#3d2826]">
                  {cat.title}
                </h3>

                {/* Black Circular Shopping Bag Button */}
                <button className="w-11 h-11 rounded-full bg-[#3d2826] text-white flex items-center justify-center mx-auto hover:bg-[#523734] transition-colors shadow-md">
                  <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

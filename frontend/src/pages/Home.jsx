import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, IceCream2, ShoppingBag } from 'lucide-react';
import flavorsData from '../utils/flavorsData';
import Flavor3DViewer from '../components/three/Flavor3DViewer';

export default function Home() {
  // Ensure we start at top when navigating to home
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const popularFlavors = useMemo(() => {
    return flavorsData.slice(0, 3);
  }, []);

  const categories = [
    { name: "Butterscotch Flavour", bg: "bg-[#f5ebd9]", img: "https://images.unsplash.com/photo-1570197781417-0a52376c0534?auto=format&fit=crop&q=80&w=400" },
    { name: "Strawberry Flavour", bg: "bg-[#fde6e8]", img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400" },
    { name: "Chocolate Flavour", bg: "bg-[#e8dec7]", img: "https://images.unsplash.com/photo-1563805042-7684c8e9e9cb?auto=format&fit=crop&q=80&w=400" },
    { name: "Vanilla Flavour", bg: "bg-[#fdf5e6]", img: "https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&q=80&w=400" }
  ];

  const archColors = ["bg-[#fcece4]", "bg-[#e4f0e5]", "bg-[#fcf0dc]"];

  return (
    <div className="w-full font-sans bg-[#fdfbf7] text-brown overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24 grid grid-cols-1 md:grid-cols-3 gap-12 items-center min-h-[90vh]">
        {/* Left Column */}
        <div className="flex flex-col items-start space-y-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl lg:text-7xl font-serif font-bold text-[#4a3531] leading-tight"
          >
            Welcome <br/> To <br/> Milky Scoops!
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#5c433e] text-white px-8 py-3 rounded-full italic font-serif hover:bg-[#4a3531] transition-colors"
          >
            Symphony Of Flavours
          </motion.button>
          
          <div className="flex -space-x-4 pt-6">
            <img src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=100" alt="flavor" className="w-16 h-16 rounded-full border-2 border-[#fdfbf7] object-cover" />
            <img src="https://images.unsplash.com/photo-1563805042-7684c8e9e9cb?w=100" alt="flavor" className="w-16 h-16 rounded-full border-2 border-[#fdfbf7] object-cover" />
            <img src="https://images.unsplash.com/photo-1557142046-c704a3adf364?w=100" alt="flavor" className="w-16 h-16 rounded-full border-2 border-[#fdfbf7] object-cover" />
          </div>
        </div>

        {/* Center Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute -top-10 -right-6 w-32 h-32 bg-pinkAccent rounded-full -z-10" />
          <div className="w-full max-w-[340px] aspect-[4/5] overflow-hidden rounded-t-[100px] rounded-b-3xl shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800" 
              alt="Assorted Ice Creams" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col space-y-16 pl-0 md:pl-10">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <CheckCircle className="w-8 h-8 text-[#4a3531]" />
              <h3 className="text-4xl font-serif text-[#4a3531]">100%</h3>
            </div>
            <p className="text-[#8c7875] leading-relaxed">
              Our ice creams are masterfully made in small batches, ensuring the utmost attention to detail and quality.
            </p>
            <div className="w-full h-px bg-[#4a3531]/10 mt-8" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="flex items-center gap-4 mb-4">
              <IceCream2 className="w-8 h-8 text-[#4a3531]" />
              <h3 className="text-4xl font-serif text-[#4a3531]">10+</h3>
            </div>
            <p className="text-[#8c7875] leading-relaxed mb-8">
              We have different different amazing flavor's to satisfy every craving.
            </p>
            <Link to="/flavors">
              <button className="bg-black text-white font-bold tracking-wider text-sm px-10 py-4 rounded-full hover:bg-gray-800 transition-colors">
                BUY NOW
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Marquee */}
      <div className="bg-[#4a3531] text-white py-4 overflow-hidden relative">
        <div className="whitespace-nowrap flex items-center animate-[marquee_20s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center mx-8">
              <IceCream2 className="w-5 h-5 mr-8 opacity-70" />
              <span className="tracking-widest font-bold">BUY YOURS NOW</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Popular Icecreams */}
      <section className="max-w-7xl mx-auto px-6 py-32 bg-white">
        <div className="text-center mb-24 relative">
          <h2 className="text-5xl md:text-6xl font-serif text-[#4a3531] mb-6 relative z-10">
            Our Popular Icecreams
          </h2>
          <p className="text-[#8c7875] max-w-2xl mx-auto text-lg z-10 relative">
            Check out the new Summer spring Collection, a twist on the classic that makes every bite super duper scrumptious!
          </p>
          {/* Watermark text */}
          <div className="absolute -top-16 right-0 text-[180px] font-serif font-black text-[#faf5ef] -z-0 select-none leading-none">
            100%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularFlavors.map((flavor, idx) => (
            <div key={flavor._id} className="flex flex-col group">
              <div className={`w-full aspect-square ${archColors[idx % 3]} rounded-t-full relative flex items-center justify-center mb-8`}>
                {/* Embedded 3D Viewer instead of static image! */}
                <div className="absolute inset-0 top-12 bottom-12 rounded-full overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-500 group-hover:scale-110 shadow-2xl bg-white/20">
                   <Flavor3DViewer color={flavor.modelColorTint} autoRotate={true} />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-[#4a3531] mb-2 group-hover:text-pinkAccent transition-colors">
                {flavor.name}
              </h3>
              <p className="text-xl text-[#8c7875] mb-6">${flavor.basePrice.toFixed(2)}</p>
              <Link to="/flavors">
                <button className="bg-black text-white font-bold text-sm px-8 py-3 rounded-md hover:bg-gray-800 transition-colors w-max">
                  BUY NOW
                </button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Categories */}
      <section className="bg-[#fdfbf7] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4a3531] max-w-sm leading-tight">
              Explore Our Best Categories
            </h2>
            <p className="text-[#8c7875] max-w-md text-lg leading-relaxed">
              Are you ready to experience a heavenly treat that will tantalize your taste buds? Milky Scoops is here to transport you to a world of frozen delights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className={`${cat.bg} rounded-[40px] p-6 flex flex-col items-center text-center pt-10 pb-8`}>
                <div className="w-48 h-48 mb-8 overflow-hidden rounded-2xl shadow-lg transform -translate-y-16 group-hover:-translate-y-20 transition-transform">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-serif text-[#4a3531] mb-8 -mt-10">{cat.name}</h3>
                <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors mt-auto">
                  <ShoppingBag className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 flex items-center justify-center gap-6">
             <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 shrink-0">
               <ArrowRight className="w-5 h-5 rotate-180" />
             </button>
             <div className="w-full max-w-[340px] aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800" 
                alt="CTA Ice Creams" 
                className="w-full h-full object-cover"
              />
            </div>
             <button className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 shrink-0">
               <ArrowRight className="w-5 h-5" />
             </button>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl md:text-6xl font-serif text-[#4a3531] mb-8 leading-tight">
              Join The Milky <br/> Scoops Family Today!
            </h2>
            <p className="text-[#8c7875] text-lg leading-relaxed mb-12">
              Celebrate life's sweetest moments with Milky Scoops. Whether it's a birthday party, a wedding, or a corporate event, our ice cream catering services are designed to elevate any gathering.
            </p>
            <button className="bg-black text-white font-bold tracking-wider text-sm px-10 py-4 rounded-md hover:bg-gray-800 transition-colors uppercase">
              Take A Splash
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

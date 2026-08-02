import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-32 px-6 pb-24 overflow-hidden relative min-h-screen">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#fbece4]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-[#ff7fb3]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold mb-6 text-[#4a3531]">
            Our Story
          </h1>
          <p className="text-[#8c7875] text-lg max-w-2xl mx-auto leading-relaxed">
            From a tiny kitchen experiment to your favorite neighborhood parlor, we believe in making memories one scoop at a time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-square rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white"
          >
            <img src="/images/hero_cones.png" alt="Making Ice Cream" className="w-full h-full object-cover" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#4a3531] leading-tight">
              Masterfully <br/> Small-Batch
            </h2>
            <p className="text-[#8c7875] text-[15px] leading-relaxed">
              Every single flavor at DropScoop is developed from scratch in our own kitchen. We don't use pre-made bases or artificial flavorings. Instead, we pasteurize our own sweet cream and slowly fold in real, whole ingredients.
            </p>
            <p className="text-[#8c7875] text-[15px] leading-relaxed">
              Whether it's roasting our own pistachios, baking the brownies that go into our chocolate fudge, or hand-swirling fresh strawberry compote, we believe that the extra effort is something you can truly taste.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

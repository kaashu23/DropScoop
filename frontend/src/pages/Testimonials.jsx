import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reviews = [
    { name: "Sarah L.", role: "Local Guide", text: "The hazelnut flavor is absolutely to die for! DropScoop always hits the spot on a warm summer evening.", rating: 5, bg: "bg-[#fbece4]" },
    { name: "Michael T.", role: "Food Blogger", text: "I've tried ice cream all over the country, and their small-batch process really shines through. Incredibly creamy and rich.", rating: 5, bg: "bg-[#e5f0e6]" },
    { name: "Emma R.", role: "Regular Customer", text: "Mint chocolate chip like you've never tasted before. It tastes like real mint leaves, not artificial syrup. 10/10!", rating: 5, bg: "bg-[#fcf0dc]" },
    { name: "David K.", role: "Dessert Enthusiast", text: "The waffle cones are made fresh in-house, and you can smell them from down the block. A must-visit.", rating: 4, bg: "bg-[#fde6e8]" },
    { name: "Jessica W.", role: "Local Resident", text: "Vegan options that actually taste good! The strawberry sorbet is refreshing and perfectly sweet.", rating: 5, bg: "bg-[#f5ebd9]" },
    { name: "Chris P.", role: "Parent", text: "Great atmosphere, friendly staff, and the kids love the giant scoops. Our favorite weekend tradition.", rating: 5, bg: "bg-[#fcf8e6]" },
  ];

  return (
    <div className="w-full pt-32 px-6 pb-24 relative min-h-screen bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold mb-6 text-[#4a3531]">
            Sweet Words
          </h1>
          <p className="text-[#8c7875] text-lg max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what our community has to say about their DropScoop experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`${review.bg} p-8 rounded-[30px] shadow-lg border-4 border-white relative mt-8`}
            >
              <div className="absolute -top-8 left-8 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md font-serif text-3xl text-[#4a3531]">
                "
              </div>
              <div className="flex gap-1 mb-4 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-[#ff7fb3] text-[#ff7fb3]' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <p className="text-[#8c7875] leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              <div className="mt-auto">
                <h4 className="font-bold text-[#4a3531]">{review.name}</h4>
                <p className="text-sm text-[#4a3531]/60">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

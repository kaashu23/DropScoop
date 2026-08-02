import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Blogs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      title: "The Secret Behind Our Hazelnut Crunch",
      excerpt: "Discover the journey of sourcing the perfect hazelnuts from Italy to create our signature flavor.",
      date: "August 12, 2026",
      img: "/images/hazelnut.png",
      bg: "bg-[#fbece4]",
      category: "Behind the Scenes"
    },
    {
      title: "Why Small-Batch Matters",
      excerpt: "Not all ice cream is created equal. Learn why taking our time makes a world of difference in texture.",
      date: "July 28, 2026",
      img: "/images/vanilla.jpg",
      bg: "bg-[#fcf8e6]",
      category: "Education"
    },
    {
      title: "Summer 2026 Flavor Drops",
      excerpt: "Get a sneak peek at the refreshing sorbets and exotic new swirls coming to the menu this season.",
      date: "July 10, 2026",
      img: "/images/mint_chocolate.png",
      bg: "bg-[#e5f0e6]",
      category: "Announcements"
    }
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
            The Scoop Blog
          </h1>
          <p className="text-[#8c7875] text-lg max-w-2xl mx-auto leading-relaxed">
            Stories from the kitchen, flavor announcements, and all things ice cream.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className={`${post.bg} rounded-[30px] overflow-hidden aspect-video mb-6 relative border-4 border-white shadow-lg`}>
                <img 
                  src={post.img} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-[#4a3531] uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="px-2">
                <p className="text-sm text-[#4a3531]/60 mb-3">{post.date}</p>
                <h3 className="text-2xl font-serif text-[#4a3531] mb-3 group-hover:text-[#ff7fb3] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-[#8c7875] mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-[#5c433e] font-bold text-sm tracking-widest uppercase">
                  Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

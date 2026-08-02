import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { flavorsData } from '../utils/flavorsData';
import FlavorCard from '../components/FlavorCard';

const categories = ["All", "Classic", "Sorbet", "Vegan", "Sundaes", "Novelty"];

export default function Flavors() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFlavors = useMemo(() => {
    return flavorsData.filter(flavor => {
      const matchesSearch = flavor.name.toLowerCase().includes(search.toLowerCase()) || 
                            flavor.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || flavor.categoryName === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="w-full pt-32 px-6 pb-24 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brown-dark/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-pinkAccent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] bg-pinkAccent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-brown dark:text-white">
            Our Flavors
          </h1>
          <p className="text-brown-light dark:text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Browse our complete collection of meticulously crafted ice creams. 
            Hover over any flavor to interact with its 3D scoop.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-white/50 dark:bg-white/5 p-6 rounded-3xl backdrop-blur-md border border-brown/10 dark:border-white/10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-brown dark:bg-white text-white dark:text-brown shadow-lg transform scale-105' 
                    : 'bg-white/50 dark:bg-white/5 text-brown dark:text-gray-300 hover:bg-brown/10 dark:hover:bg-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brown-light dark:text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Search flavors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/50 dark:bg-white/5 border border-brown/10 dark:border-white/10 rounded-full py-3.5 pl-12 pr-4 text-brown dark:text-white placeholder-brown-light dark:placeholder-gray-500 focus:outline-none focus:border-brown dark:focus:border-white focus:ring-1 focus:ring-brown dark:focus:ring-white transition-all font-medium"
            />
          </div>
        </div>

        {/* Flavors Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredFlavors.map(flavor => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                key={flavor._id}
              >
                <FlavorCard flavor={flavor} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredFlavors.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 text-gray-500"
          >
            <div className="text-6xl mb-6">🍦</div>
            <p className="text-2xl font-semibold text-gray-400 mb-2">No flavors found</p>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

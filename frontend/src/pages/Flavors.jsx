import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { flavorsData } from '../utils/flavorsData';
import FlavorCard from '../components/FlavorCard';

const categories = ["All", "Classic", "Sorbet", "Vegan", "Sundaes", "Novelty"];

export default function Flavors({ onAddToCart }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [apiFlavors, setApiFlavors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API_URL}/flavors`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          // Flatten category object if populated
          const processedFlavors = data.data.map(f => ({
            ...f,
            categoryName: f.category?.name || 'Classic'
          }));
          setApiFlavors(processedFlavors);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('API offline or empty, falling back to local data');
        setLoading(false);
      });
  }, []);

  const filteredFlavors = useMemo(() => {
    // Combine API flavors and fallback data so the store always looks full
    let dataSource = [...apiFlavors];
    
    // If the database has very few items (e.g. just getting started), append the rest from our mock data
    const existingNames = new Set(apiFlavors.map(f => f.name.toLowerCase()));
    flavorsData.forEach(mockFlavor => {
      if (!existingNames.has(mockFlavor.name.toLowerCase())) {
        dataSource.push(mockFlavor);
      }
    });
    
    return dataSource.filter(flavor => {
      const matchesSearch = flavor.name.toLowerCase().includes(search.toLowerCase()) || 
                            (flavor.description && flavor.description.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = activeCategory === "All" || flavor.categoryName === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, apiFlavors]);

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
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4 md:mb-6 text-brown dark:text-white">
            Our Flavors
          </h1>
          <p className="text-brown-light dark:text-gray-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/50 dark:bg-white/5 rounded-3xl p-6 h-[400px] border border-brown/5 dark:border-white/5 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="flex justify-between items-center mt-auto">
                  <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
              </div>
            ))
          ) : (
            <AnimatePresence>
              {filteredFlavors.map(flavor => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key={flavor._id || flavor.id || flavor.name}
                >
                  <FlavorCard flavor={flavor} onAddToCart={onAddToCart} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!loading && filteredFlavors.length === 0 && (
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

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Plus } from 'lucide-react';
import Flavor3DViewer from './three/Flavor3DViewer';

export default function FlavorCard({ flavor, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  // margin: "400px" means it will start rendering slightly before it enters the screen
  const isInView = useInView(cardRef, { margin: "400px", once: false });

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative overflow-hidden glass-card p-6 flex flex-col h-[420px] group"
    >
      {/* Background glow on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${flavor.modelColorTint} 0%, transparent 70%)` 
        }}
      />
      
      {/* 3D Viewer Container */}
      <div className="w-full h-[220px] mb-4 relative z-10 flex-shrink-0 cursor-pointer">
        {isInView ? (
          <Flavor3DViewer color={flavor.modelColorTint} autoRotate={isHovered} />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brown-light/30">
            <span className="text-4xl animate-pulse">🍦</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow z-10 w-full text-center">
        <h3 className="text-xl font-bold mb-2 text-brown dark:text-white group-hover:text-pinkAccent transition-colors line-clamp-1">
          {flavor.name}
        </h3>
        <p className="text-sm text-brown-light dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
          {flavor.description}
        </p>
        <div className="flex justify-between items-center w-full mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-brown dark:text-white">
              ₹{flavor.basePrice.toFixed(2)}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if(onAddToCart) onAddToCart({ id: flavor._id || flavor.id || flavor.name, name: flavor.name, price: flavor.basePrice, img: flavor.images?.[0] || '/images/vanilla.jpg', bg: `bg-[${flavor.modelColorTint}]` });
              }}
              className="w-8 h-8 rounded-full bg-brown text-white flex items-center justify-center hover:bg-pinkAccent hover:scale-110 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span 
            className="px-3 py-1 text-xs font-bold rounded-full text-white shadow-sm"
            style={{ backgroundColor: flavor.modelColorTint }}
          >
            {flavor.categoryName}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

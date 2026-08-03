import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { Loader2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Procedural 3D Scoop Component
function IceCreamScoop({ color, position, rotation = [0, 0, 0], index }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main scoop body - distorted to look like organic hand-scooped ice cream */}
      <mesh castShadow receiveShadow scale={[1, 0.85, 1]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial 
          color={color} 
          roughness={0.9} 
          metalness={0.0} 
          distort={0.3} 
          speed={0} 
        />
      </mesh>
      
      {/* The melting 'skirt' at the bottom of the scoop to connect it organically */}
      <mesh castShadow receiveShadow position={[0, -0.85, 0]} scale={[1.1, 0.35, 1.1]}>
        <sphereGeometry args={[1.15, 64, 32]} />
        <MeshDistortMaterial 
          color={color} 
          roughness={0.9} 
          metalness={0.0} 
          distort={0.4} 
          speed={0} 
        />
      </mesh>
    </group>
  );
}

// Procedural 3D Cone Component
function WaffleCone() {
  return (
    <mesh position={[0, -2.1, 0]} rotation={[Math.PI, 0, 0]} castShadow receiveShadow>
      <coneGeometry args={[1.3, 4, 64]} />
      <meshStandardMaterial color="#d4a373" roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

export default function BuildYourSundae({ onAddToCart }) {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Customizer State
  const [size, setSize] = useState(2); // Number of scoops (1, 2, 3)
  const [selectedFlavors, setSelectedFlavors] = useState([]); // Array of flavor objects

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API_URL}/flavors`)
      .then(res => res.json())
      .then(data => {
        let combined = [];
        if (data.success && data.data) {
          combined = [...data.data];
        }
        
        // Import flavorsData dynamically or just fetch the missing ones
        import('../utils/flavorsData').then(({ flavorsData }) => {
          const existingNames = new Set(combined.map(f => f.name.toLowerCase()));
          flavorsData.forEach(mockFlavor => {
            if (!existingNames.has(mockFlavor.name.toLowerCase())) {
              combined.push(mockFlavor);
            }
          });
          setFlavors(combined);
          
          if (combined.length > 0 && selectedFlavors.length === 0) {
            setSelectedFlavors([combined[0], combined[0]]);
          }
          setLoading(false);
        });
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSizeChange = (newSize) => {
    setSize(newSize);
    // Adjust selected flavors array length
    if (newSize > selectedFlavors.length) {
      const diff = newSize - selectedFlavors.length;
      const fillFlavor = selectedFlavors.length > 0 ? selectedFlavors[selectedFlavors.length - 1] : flavors[0];
      setSelectedFlavors([...selectedFlavors, ...Array(diff).fill(fillFlavor)]);
    } else if (newSize < selectedFlavors.length) {
      setSelectedFlavors(selectedFlavors.slice(0, newSize));
    }
  };

  const setScoopFlavor = (scoopIndex, flavor) => {
    const newFlavors = [...selectedFlavors];
    newFlavors[scoopIndex] = flavor;
    setSelectedFlavors(newFlavors);
  };

  const totalPrice = selectedFlavors.reduce((sum, f) => sum + (f?.basePrice || 0), 0);

  const handleAddToCart = () => {
    if (selectedFlavors.length === 0) return;
    
    // Create a composite custom item
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Custom ${size}-Scoop Sundae`,
      price: totalPrice,
      quantity: 1,
      img: selectedFlavors[0]?.images?.[0] || 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400',
      description: selectedFlavors.map(f => f.name).join(', ')
    };
    
    onAddToCart(customItem);
    toast.success('Custom sundae added to cart!');
    setTimeout(() => {
      navigate('/cart');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] pt-32 pb-20 relative">
      <Toaster position="bottom-right" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#fbece4]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e5f0e6]/40 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#4a3531] mb-4">Build Your Sundae</h1>
          <p className="text-[#8c7875] text-lg max-w-2xl mx-auto">
            Stack your favorite flavors and create the ultimate customized treat. Watch it come to life in 3D!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: 3D Preview (Sticky) */}
          <div className="lg:col-span-7 lg:sticky lg:top-32">
            <div className="bg-gradient-to-br from-[#fbece4]/40 to-white rounded-[30px] lg:rounded-[40px] h-[350px] md:h-[500px] lg:h-[700px] shadow-2xl border border-white/50 overflow-hidden relative">
              <div className="absolute top-4 left-4 lg:top-8 lg:left-8 z-10 flex flex-col gap-2">
                <span className="bg-white/80 backdrop-blur-md px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-sm font-bold text-[#4a3531] text-xs lg:text-sm tracking-wide">
                  Live 3D Preview
                </span>
                <span className="bg-black/5 backdrop-blur-sm px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-[10px] lg:text-xs font-semibold text-[#8c7875] w-fit">
                  Drag to rotate
                </span>
              </div>
              
              <Canvas shadows camera={{ position: [0, 4, 16], fov: 45 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
                <spotLight position={[-10, 10, -10]} intensity={1} angle={0.3} penumbra={1} color="#fbece4" />
                <pointLight position={[0, -5, 5]} intensity={0.5} color="#ffffff" />
                
                <Suspense fallback={null}>
                  <WaffleCone />
                  
                  {selectedFlavors.map((flavor, index) => {
                    // Tighter overlap on Y axis
                    const yPos = 0.5 + (index * 1.3);
                    
                    // Offset scoops to make them look realistically stacked instead of perfect snowman
                    const xPos = index === 1 ? 0.25 : index === 2 ? -0.15 : 0;
                    const zPos = index === 1 ? 0.15 : index === 2 ? -0.2 : 0;
                    
                    // Tilt the top scoops slightly
                    const rotX = index === 1 ? 0.2 : index === 2 ? -0.1 : 0;
                    const rotZ = index === 1 ? -0.15 : index === 2 ? 0.2 : 0;

                    return (
                      <IceCreamScoop 
                        key={`${index}-${flavor?._id}`} 
                        color={flavor?.modelColorTint || '#fbece4'} 
                        position={[xPos, yPos, zPos]} 
                        rotation={[rotX, 0, rotZ]}
                        index={index}
                      />
                    );
                  })}

                  <ContactShadows position={[0, -4.5, 0]} opacity={0.6} scale={15} blur={2.5} far={10} color="#4a3531" />
                  <Environment preset="city" />
                  <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} minDistance={7} maxDistance={14} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="lg:col-span-5 space-y-8 pb-12">
            
            {/* Step 1: Size */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-brown/5 border border-white">
              <h2 className="text-2xl font-serif font-bold text-[#4a3531] mb-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fbece4] text-[#4a3531] flex items-center justify-center text-sm border-2 border-white shadow-sm">1</div>
                Choose Size
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSizeChange(num)}
                    className={`flex-1 py-5 px-4 rounded-3xl font-bold border-[3px] transition-all duration-300 ${
                      size === num 
                        ? 'border-[#4a3531] bg-[#4a3531] text-white shadow-[0_8px_30px_rgba(74,53,49,0.2)] transform scale-[1.02]' 
                        : 'border-[#fbece4] bg-transparent text-[#8c7875] hover:border-[#4a3531]/30 hover:bg-[#fbece4]/20'
                    }`}
                  >
                    <div className="text-xl mb-1">{num}</div>
                    <div className="text-xs uppercase tracking-wider opacity-80">{num === 1 ? 'Scoop' : 'Scoops'}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Flavors */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-brown/5 border border-white">
              <h2 className="text-2xl font-serif font-bold text-[#4a3531] mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#e5f0e6] text-[#4a3531] flex items-center justify-center text-sm border-2 border-white shadow-sm">2</div>
                Pick Flavors
              </h2>
              
              {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#4a3531]" /></div>
              ) : (
                <div className="space-y-10">
                  {Array.from({ length: size }).map((_, index) => (
                    <div key={index} className="space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] flex-grow bg-gray-100 rounded-full"></div>
                        <h4 className="font-bold text-[#8c7875] text-xs uppercase tracking-widest bg-white px-2">
                          Scoop {index + 1} {index === 0 ? '(Bottom)' : index === size - 1 ? '(Top)' : ''}
                        </h4>
                        <div className="h-[2px] flex-grow bg-gray-100 rounded-full"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {flavors.slice(0, 9).map(flavor => (
                          <button
                            key={flavor._id}
                            onClick={() => setScoopFlavor(index, flavor)}
                            className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                              selectedFlavors[index]?._id === flavor._id
                                ? 'bg-[#fdfbf7] shadow-inner border-2 border-[#4a3531]'
                                : 'border-2 border-transparent hover:border-[#4a3531]/10 hover:bg-gray-50'
                            }`}
                          >
                            {/* Image or Color fallback */}
                            <div className="w-16 h-16 rounded-full mb-3 shadow-md border-[3px] border-white overflow-hidden relative transition-transform group-hover:scale-105">
                              {flavor.images && flavor.images[0] ? (
                                <img src={flavor.images[0]} alt={flavor.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full" style={{ backgroundColor: flavor.modelColorTint || '#fbece4' }} />
                              )}
                              
                              {/* Selected Checkmark overlay */}
                              {selectedFlavors[index]?._id === flavor._id && (
                                <div className="absolute inset-0 bg-[#4a3531]/20 flex items-center justify-center backdrop-blur-[1px]">
                                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-[#4a3531]"></div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <span className="text-xs font-bold text-center text-[#4a3531] leading-tight mb-1">{flavor.name}</span>
                            <span className="text-[10px] font-semibold text-[#8c7875] bg-gray-100 px-2 py-0.5 rounded-full">
                              +₹{flavor.basePrice.toFixed(2)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total and Add to Cart */}
            <div className="sticky bottom-6 z-20 bg-[#4a3531] p-6 rounded-[35px] shadow-[0_20px_50px_rgba(74,53,49,0.3)] flex flex-col sm:flex-row items-center justify-between text-white gap-6">
              <div className="text-center sm:text-left">
                <p className="text-[#fbece4]/70 text-xs font-bold uppercase tracking-widest mb-1">Total Price</p>
                <p className="text-4xl font-serif font-bold tracking-tight">₹{totalPrice.toFixed(2)}</p>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={selectedFlavors.length === 0}
                className="w-full sm:w-auto bg-white text-[#4a3531] px-8 py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#fbece4] hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:active:scale-100 text-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

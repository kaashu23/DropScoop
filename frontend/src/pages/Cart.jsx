import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function Cart({ cartItems = [], updateCartItem, removeCartItem }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50.00;
  const total = subtotal + delivery;

  return (
    <div className="w-full pt-32 px-6 pb-24 relative min-h-screen bg-[#fdfbf7]">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#4a3531]">
            Your Scoop Cart
          </h1>
          <p className="text-[#8c7875] mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready for checkout.
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[30px] shadow-sm border border-[#4a3531]/10">
            <div className="text-6xl mb-6">🍦</div>
            <h2 className="text-2xl font-serif text-[#4a3531] mb-4">Your cart is empty</h2>
            <p className="text-[#8c7875] mb-8">Looks like you haven't added any sweet treats yet.</p>
            <Link to="/flavors">
              <button className="bg-[#4a3531] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#5c433e] transition-colors">
                Browse Flavors
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-[#4a3531]/10 flex flex-col md:flex-row items-center gap-6"
                >
                  <div className={`w-24 h-24 rounded-full ${item.bg || 'bg-[#fbece4]'} flex items-center justify-center shrink-0`}>
                    <img src={item.img} alt={item.name} className="w-16 h-16 object-cover drop-shadow-md" />
                  </div>
                  
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-lg font-bold text-[#4a3531]">{item.name}</h3>
                    <p className="text-[#8c7875] text-sm mt-1">{item.size || 'Regular Scoop'}</p>
                  </div>

                  <div className="flex items-center gap-4 bg-[#fdfbf7] rounded-full p-1 border border-[#4a3531]/10">
                    <button 
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#4a3531] shadow-sm hover:bg-[#4a3531] hover:text-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-[#4a3531] w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#4a3531] shadow-sm hover:bg-[#4a3531] hover:text-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2 md:w-24">
                    <p className="font-bold text-[#4a3531] text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeCartItem(item.id)} className="w-8 h-8 rounded-full border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white p-8 rounded-[30px] shadow-lg border-4 border-white sticky top-32">
                <h3 className="text-2xl font-serif text-[#4a3531] mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#8c7875] mb-4">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#4a3531]">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#8c7875] mb-6">
                    <span>Delivery</span>
                    <span className="font-bold text-[#4a3531]">
                      {delivery === 0 ? 'Free' : `₹${delivery.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="w-full h-px bg-[#4a3531]/10 my-4" />
                  <div className="flex justify-between text-2xl font-serif font-bold text-[#4a3531] mb-8 pt-6 border-t border-[#4a3531]/10">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#5c433e] text-white font-bold tracking-widest text-[13px] px-8 py-4 rounded-xl hover:bg-[#4a3531] transition-colors uppercase flex items-center justify-center gap-2 group">
                  Checkout <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                {delivery > 0 && (
                  <p className="text-center text-sm text-[#8c7875] mt-4 font-medium">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free delivery!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

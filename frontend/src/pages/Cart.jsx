import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

export default function Cart({ cartItems = [], updateCartItem, removeCartItem, clearCart }) {
  const { user } = useUser();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + ((item.price || item.basePrice || 0) * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50.00;
  const total = subtotal + delivery;

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const orderPayload = {
        items: cartItems,
        totalAmount: total,
        customerInfo: {
          ...checkoutData,
          email: user?.primaryEmailAddress?.emailAddress || 'guest@example.com'
        }
      };

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success("Order placed successfully! Receipt sent to your email.");
        if (clearCart) clearCart();
        navigate('/');
      } else {
        toast.error(data.message || "Failed to place order.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
      setShowCheckout(false);
    }
  };

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
                    <p className="font-bold text-[#4a3531] text-lg">₹{((item.price || item.basePrice || 0) * item.quantity).toFixed(2)}</p>
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

                <button onClick={() => setShowCheckout(true)} className="w-full bg-[#5c433e] text-white font-bold tracking-widest text-[13px] px-8 py-4 rounded-xl hover:bg-[#4a3531] transition-colors uppercase flex items-center justify-center gap-2 group">
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

        {/* Checkout Modal */}
        <AnimatePresence>
          {showCheckout && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto"
              >
                <button onClick={() => setShowCheckout(false)} className="absolute top-6 right-6 text-[#8c7875] hover:text-[#4a3531]">
                  <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-3xl font-serif font-bold text-[#4a3531] mb-6">Complete Order</h2>
                
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#4a3531] mb-1">Full Name</label>
                    <input required type="text" value={checkoutData.name} onChange={e => setCheckoutData({...checkoutData, name: e.target.value})} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#4a3531] mb-1">Address</label>
                    <input required type="text" value={checkoutData.addressLine1} onChange={e => setCheckoutData({...checkoutData, addressLine1: e.target.value})} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors" placeholder="123 Sweet St" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-[#4a3531] mb-1">City</label>
                      <input required type="text" value={checkoutData.city} onChange={e => setCheckoutData({...checkoutData, city: e.target.value})} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors" placeholder="Mumbai" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#4a3531] mb-1">Postal Code</label>
                      <input required type="text" value={checkoutData.postalCode} onChange={e => setCheckoutData({...checkoutData, postalCode: e.target.value})} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors" placeholder="400001" />
                    </div>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-[#4a3531] text-white font-bold text-lg px-6 py-4 rounded-xl mt-4 hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                    {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function Testimonials() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const [dbReviews, setDbReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/testimonials`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && data.data) {
        setDbReviews(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote.trim()) return toast.error("Please write a review.");
    
    setSubmitting(true);
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, quote })
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Testimonial added successfully!");
        setShowModal(false);
        setQuote('');
        setRating(5);
        fetchTestimonials();
      } else {
        toast.error(data.message || "Failed to add testimonial");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const hardcodedReviews = [
    { name: "Priya S.", role: "Local Guide", text: "The mango sorbet is absolutely to die for! DropScoop always hits the spot on a warm summer evening.", rating: 5, bg: "bg-[#fbece4]" },
    { name: "Rahul T.", role: "Food Blogger", text: "I've tried ice cream all over the country, and their small-batch process really shines through. Incredibly creamy and rich.", rating: 5, bg: "bg-[#e5f0e6]" },
    { name: "Anjali R.", role: "Regular Customer", text: "Pistachio like you've never tasted before. It tastes like real roasted nuts, not artificial syrup. 10/10!", rating: 5, bg: "bg-[#fcf0dc]" },
    { name: "Vikram K.", role: "Dessert Enthusiast", text: "The waffle cones are made fresh in-house, and you can smell them from down the block. A must-visit.", rating: 4, bg: "bg-[#fde6e8]" },
    { name: "Neha W.", role: "Local Resident", text: "Vegan options that actually taste good! The strawberry sorbet is refreshing and perfectly sweet.", rating: 5, bg: "bg-[#f5ebd9]" },
    { name: "Arjun P.", role: "Parent", text: "Great atmosphere, friendly staff, and the kids love the giant scoops. Our favorite weekend tradition.", rating: 5, bg: "bg-[#fcf8e6]" },
  ];

  const allReviews = [
    ...hardcodedReviews,
    ...dbReviews.map(r => ({
      name: r.guestName,
      role: "Verified Buyer",
      text: r.quote,
      rating: r.rating,
      bg: "bg-[#ffffff]" // White for user reviews to distinguish them slightly
    }))
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
          <p className="text-[#8c7875] text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Don't just take our word for it. Here's what our community has to say about their DropScoop experience.
          </p>
          
          {isSignedIn && (
            <button 
              onClick={() => setShowModal(true)}
              className="bg-[#ff7fb3] text-white px-8 py-3 rounded-full font-bold hover:bg-[#ff6b9d] transition-colors shadow-md"
            >
              Write a Testimonial
            </button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReviews.map((review, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.1 }}
              className={`${review.bg} p-8 rounded-[30px] shadow-sm border-4 border-white relative mt-8`}
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

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-8 rounded-[32px] shadow-2xl max-w-lg w-full relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute right-6 top-6 text-[#8c7875] hover:text-[#4a3531]"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-serif font-bold text-[#4a3531] mb-6">Write a Testimonial</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-[#4a3531] font-medium mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button" 
                        onClick={() => setRating(star)}
                      >
                        <Star className={`w-8 h-8 ${star <= rating ? 'fill-[#ff7fb3] text-[#ff7fb3]' : 'fill-gray-200 text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-[#4a3531] font-medium mb-2">Your Review</label>
                  <textarea 
                    rows="4" 
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl p-4 text-[#4a3531] outline-none focus:border-[#4a3531]"
                    placeholder="Tell us about your favorite flavor..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitting}
                  className="w-full bg-[#4a3531] text-white py-4 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Testimonial'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch soon.", {
      style: { borderRadius: '12px', background: '#4a3531', color: '#fff' }
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full pt-28 px-6 pb-12 relative min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <div className="max-w-7xl mx-auto w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-4 text-[#4a3531]">
            Contact Us
          </h1>
          <p className="text-[#8c7875] text-base max-w-2xl mx-auto leading-relaxed">
            Have a question about catering, allergens, or just want to say hi? Drop us a line below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Contact Info (3 Cards) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-4"
          >
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#4a3531]/5 flex items-center gap-5 flex-1">
              <div className="w-12 h-12 bg-[#fcf0dc] rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#4a3531]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#4a3531] mb-1">Visit Our Parlor</h3>
                <p className="text-[#8c7875] text-sm leading-tight">123 Sweet Street<br/>Dessert District, CA 90210</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#4a3531]/5 flex items-center gap-5 flex-1">
              <div className="w-12 h-12 bg-[#fde6e8] rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#4a3531]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#4a3531] mb-1">Call Us</h3>
                <p className="text-[#8c7875] text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-[#4a3531]/5 flex items-center gap-5 flex-1">
              <div className="w-12 h-12 bg-[#e5f0e6] rounded-full flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#4a3531]" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-[#4a3531] mb-1">Opening Hours</h3>
                <p className="text-[#8c7875] text-sm">Mon-Sun: 11:00 AM - 10:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-full"
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[30px] shadow-xl border border-[#4a3531]/5 flex flex-col space-y-5 h-full relative overflow-hidden justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fbece4] rounded-bl-full -z-0 opacity-40" />
              
              <div className="relative z-10">
                <label className="block text-xs font-bold text-[#4a3531] mb-1.5 uppercase tracking-wider">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors text-sm text-[#4a3531]"
                  placeholder="John Doe"
                />
              </div>

              <div className="relative z-10">
                <label className="block text-xs font-bold text-[#4a3531] mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors text-sm text-[#4a3531]"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="relative z-10 flex-grow flex flex-col">
                <label className="block text-xs font-bold text-[#4a3531] mb-1.5 uppercase tracking-wider">Message</label>
                <textarea 
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full flex-grow bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 outline-none focus:border-[#4a3531] transition-colors text-sm text-[#4a3531] resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" className="relative z-10 bg-[#5c433e] text-white font-serif italic text-lg px-6 py-3 rounded-xl shadow-md hover:bg-[#4a3531] transition-colors w-full mt-2">
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

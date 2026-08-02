import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#4a3531] text-[#fdfbf7] pt-20 pb-10 px-6 border-t border-[#3d2826]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="font-serif font-bold text-4xl tracking-tight text-[#fdfbf7]">
            DropScoop.
          </Link>
          <p className="text-white/70 text-[15px] leading-relaxed max-w-sm">
            Experience the joy of our handcrafted ice creams, delivered straight to your door. The symphony of flavors awaits.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="font-serif text-xl text-white">Quick Links</h4>
          <ul className="space-y-4 text-white/70 text-[15px]">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/flavors" className="hover:text-white transition-colors">Products</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="font-serif text-xl text-white">Categories</h4>
          <ul className="space-y-4 text-white/70 text-[15px]">
            <li><a href="#" className="hover:text-white transition-colors">Butterscotch</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Strawberry</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chocolate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vanilla</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="font-serif text-xl text-white">Newsletter</h4>
          <p className="text-white/70 text-[15px] leading-relaxed">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4a3531]/50" />
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-[#fdfbf7] text-[#4a3531] rounded-full py-3.5 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-black text-white px-6 rounded-full text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
        <p>© 2026 DropScoop. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

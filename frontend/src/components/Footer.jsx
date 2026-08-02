import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#3d2826] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          
          {/* Logo */}
          <a href="#" className="font-serif font-bold text-2xl text-white tracking-tight">
            Milky Scoops.
          </a>

          {/* Copyright */}
          <div className="text-xs text-stone-300 font-normal">
            © 2023 Milky Scoops. All rights reserved.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-xs font-medium text-stone-300">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>

        </div>
      </div>
    </footer>
  );
}

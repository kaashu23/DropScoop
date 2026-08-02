import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

export default function Navbar({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user } = useUser();
  
  // Check if current user is admin (matches the env or just hardcoded for UI visibility)
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'kashishsalvi06@gmail.com' || 
                  user?.primaryPhoneNumber?.phoneNumber === '+918080299491' || 
                  user?.primaryPhoneNumber?.phoneNumber === '8080299491';

  // Dark mode is currently disabled to maintain the cream/brown aesthetic.

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/flavors' },
    { name: 'Customizer', path: '/build-your-sundae' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', path: '/admin' });
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-4 px-6 lg:px-12 transition-all duration-300 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-[#4a3531]/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="font-serif font-bold text-3xl text-[#4a3531] tracking-tight">
          DropScoop.
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#8c7875] dark:text-gray-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative py-1 transition-colors hover:text-[#4a3531] dark:hover:text-white ${
                location.pathname === link.path ? 'text-[#4a3531] dark:text-white' : ''
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.span 
                  layoutId="navbar-underline"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#4a3531] dark:bg-white" 
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Icon Actions */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="w-11 h-11 rounded-full border border-[#4a3531]/20 flex items-center justify-center text-[#4a3531] hover:bg-[#4a3531]/5 transition-all">
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="w-11 h-11 flex items-center justify-center">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 border border-[#4a3531]/20 shadow-sm"
                  }
                }}
              />
            </div>
          </SignedIn>
          
          <Link to="/cart">
            <button className="w-11 h-11 rounded-full border border-[#4a3531]/20 flex items-center justify-center text-[#4a3531] hover:bg-[#4a3531]/5 transition-all relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-[#4a3531] dark:text-white hover:scale-110 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-white dark:bg-darkSurface rounded-3xl p-6 flex flex-col gap-4 font-medium text-base text-[#8c7875] dark:text-gray-300 absolute left-6 right-6 z-40 shadow-xl border border-[#4a3531]/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-[#4a3531] dark:hover:text-white border-b border-[#4a3531]/10 dark:border-gray-700/50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <div className="py-2 mt-2 pt-4 border-t border-[#4a3531]/10 dark:border-gray-700/50 flex justify-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#4a3531] text-white px-8 py-3 rounded-xl font-bold w-full shadow-lg">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4 w-full">
                <UserButton />
                <span className="font-semibold text-[#4a3531] dark:text-white">My Account</span>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}

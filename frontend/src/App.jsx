import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Flavors from './pages/Flavors.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Blogs from './pages/Blogs.jsx';
import Cart from './pages/Cart.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminFlavors from './pages/admin/AdminFlavors.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';

import BuildYourSundae from './pages/BuildYourSundae.jsx';
import { useUser } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('dropscoop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [iceCreams, setIceCreams] = useState([]);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      fetch(`${API_URL}/auth/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      }).catch(err => console.error('Failed to sync user', err));
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    localStorage.setItem('dropscoop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${API_URL}/flavors`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setIceCreams(data.data);
        }
      })
      .catch(err => console.log('API offline or loading fallbacks'));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart!`);
  };

  const updateCartItem = (id, quantity) => {
    if (quantity <= 0) {
      removeCartItem(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeCartItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans selection:bg-[#ff8eb2] selection:text-white">
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: '',
          style: {
            border: '1px solid rgba(74, 53, 49, 0.1)',
            padding: '16px 24px',
            color: '#4a3531',
            background: '#ffffff',
            borderRadius: '100px',
            boxShadow: '0 10px 40px -10px rgba(74, 53, 49, 0.15)',
            fontWeight: '600',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
            style: {
              background: '#e5f0e6',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            style: {
              background: '#fee2e2',
              border: '1px solid rgba(239, 68, 68, 0.2)',
            },
          },
        }}
      />
      {!isAdminRoute && <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/flavors" element={<Flavors onAddToCart={handleAddToCart} />} />
          <Route path="/shop" element={<Navigate to="/flavors" replace />} />
          <Route path="/build-your-sundae" element={<BuildYourSundae onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/cart" element={<Cart cartItems={cart} updateCartItem={updateCartItem} removeCartItem={removeCartItem} clearCart={clearCart} />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="flavors" element={<AdminFlavors />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

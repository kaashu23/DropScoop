import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Flavors from './pages/Flavors.jsx';

export default function App() {
  const [cart, setCart] = useState([]);
  const [iceCreams, setIceCreams] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/icecreams')
      .then(res => res.json())
      .then(data => setIceCreams(data))
      .catch(err => console.log('API offline or loading fallbacks'));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans selection:bg-[#ff8eb2] selection:text-white">
      <Navbar cartCount={cart.length} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flavors" element={<Flavors />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Trash2, Star } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function AdminTestimonials() {
  const { getToken } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async () => {
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/testimonials`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.data || []);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (res.ok && data.success) {
        toast.success('Testimonial deleted');
        setTestimonials(prev => prev.filter(t => t._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Server error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Testimonials</h1>
          <p className="text-[#8c7875] mt-1">Manage what customers are saying about DropScoop.</p>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#fdfbf7] border-b border-[#4a3531]/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Review</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#8c7875] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3531]/10">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-[#8c7875]">Loading testimonials...</td>
                </tr>
              ) : testimonials.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-[#fbece4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#4a3531]">
                      <MessageSquare className="w-8 h-8" />
                    </div>
                    <p className="text-[#8c7875] text-lg">No testimonials found</p>
                  </td>
                </tr>
              ) : (
                testimonials.map(t => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={t._id} 
                    className="hover:bg-[#fdfbf7] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-[#4a3531]">{t.guestName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-[#ff7fb3] text-[#ff7fb3]' : 'fill-gray-200 text-gray-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#8c7875] max-w-sm truncate italic">"{t.quote}"</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#4a3531]">{new Date(t.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(t._id)}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors ml-auto flex"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

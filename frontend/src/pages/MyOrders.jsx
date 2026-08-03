import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, XCircle, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function MyOrders() {
  const { getToken, isSignedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/orders/my`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching my orders:', error);
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [isSignedIn]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'Cancelled' })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Order cancelled successfully');
        fetchMyOrders();
      } else {
        toast.error(data.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'Delivered') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'Cancelled') return <XCircle className="w-5 h-5 text-red-500" />;
    return <Clock className="w-5 h-5 text-yellow-500" />;
  };

  if (!isSignedIn) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#4a3531] mb-4">Please sign in to view your orders</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-[#4a3531]">My Orders</h1>
          <p className="text-[#8c7875] mt-2 text-lg">Track your ice cream deliveries</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#4a3531]/20 border-t-[#4a3531] rounded-full animate-spin"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-[#4a3531]/5">
            <Package className="w-16 h-16 mx-auto mb-4 text-[#8c7875]/30" />
            <h3 className="text-2xl font-bold text-[#4a3531] mb-2">No orders yet</h3>
            <p className="text-[#8c7875] mb-6">Looks like you haven't ordered any ice cream yet!</p>
            <Link to="/flavors" className="inline-block bg-[#4a3531] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5c433e] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 md:px-0">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order._id} 
                className="relative bg-white shadow-lg rounded-2xl border border-[#4a3531]/5 h-full flex flex-col"
              >
                {/* Top Section */}
                <div className="p-5 md:p-6 rounded-t-2xl bg-white relative overflow-hidden flex-shrink-0">
                  <div className="text-center mb-5">
                    <h3 className="font-serif text-2xl font-bold text-[#4a3531] italic tracking-tight mb-1">DropScoop</h3>
                    <p className="text-[10px] text-[#8c7875] uppercase tracking-[0.2em] font-bold">Official Receipt</p>
                  </div>

                  <div className="flex justify-between items-center bg-[#fdfbf7] rounded-xl p-3 mb-4 border border-[#4a3531]/5">
                    <div>
                      <p className="text-[9px] font-bold text-[#8c7875] uppercase tracking-wider mb-0.5">Order No.</p>
                      <p className="text-[#4a3531] font-bold text-xs">#{order.orderNumber || order._id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-[#8c7875] uppercase tracking-wider mb-0.5">Date</p>
                      <p className="text-[#4a3531] font-bold text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center mt-2 mb-1">
                    <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${
                      order.status === 'Delivered' ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]' : 
                      order.status === 'Cancelled' ? 'bg-[#fef2f2] text-[#991b1b] border-[#fecaca]' : 
                      'bg-[#fbece4] text-[#4a3531] border-[#fbece4]/80'
                    }`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Divider with Punched Holes */}
                <div className="relative h-6 flex items-center justify-center bg-white flex-shrink-0">
                  <div className="absolute left-[-12px] w-6 h-6 bg-[#fdfbf7] rounded-full shadow-inner border border-[#4a3531]/5 z-10"></div>
                  <div className="w-full border-t border-dashed border-[#4a3531]/15 mx-6"></div>
                  <div className="absolute right-[-12px] w-6 h-6 bg-[#fdfbf7] rounded-full shadow-inner border border-[#4a3531]/5 z-10"></div>
                </div>

                {/* Bottom Section */}
                <div className="p-5 md:p-6 rounded-b-2xl bg-white relative flex-grow flex flex-col">
                  <div className="space-y-4 mb-5 flex-grow">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start group">
                        <div className="flex items-start">
                          <span className="font-bold text-[#4a3531] bg-[#fbece4] w-6 h-6 flex items-center justify-center rounded-md text-[10px] mr-3 shrink-0">{item.qty}x</span>
                          <div>
                            <h4 className="font-bold text-[#4a3531] text-xs md:text-sm leading-tight group-hover:text-[#5c433e] transition-colors">{item.name}</h4>
                            <p className="text-[10px] text-[#8c7875] mt-0.5">{item.size || 'Single Scoop'}</p>
                          </div>
                        </div>
                        <div className="font-bold text-[#4a3531] shrink-0 text-right text-xs md:text-sm pl-4">
                          ₹{(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#fdfbf7] rounded-xl p-4 border border-[#4a3531]/5 space-y-2 mt-auto">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#8c7875] font-medium">Subtotal</span>
                      <span className="text-[#4a3531] font-bold">₹{(order.totalAmount - (order.totalAmount > 500 ? 0 : 50)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#8c7875] font-medium">Delivery</span>
                      <span className="text-[#4a3531] font-bold">{order.totalAmount > 500 ? 'Free' : '₹50.00'}</span>
                    </div>
                    <div className="pt-2 border-t border-[#4a3531]/10 flex justify-between items-end">
                      <span className="font-bold text-[#4a3531] uppercase tracking-wider text-[10px] mb-1">Total Paid</span>
                      <span className="text-xl font-black text-[#4a3531]">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {order.status === 'Pending' && (
                    <div className="mt-5">
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="w-full py-2.5 rounded-xl text-red-500 text-sm font-bold border-2 border-red-100 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    </div>
                  )}
                  
                  {/* Decorative Barcode */}
                  <div className="mt-6 pt-3 flex flex-col items-center opacity-40">
                    <div className="h-8 flex items-end justify-center space-x-[2px] w-full max-w-[160px]">
                      {[...Array(24)].map((_, i) => (
                        <div key={i} className="bg-[#4a3531] rounded-t-[1px]" style={{ 
                          width: `${Math.random() * 2 + 1}px`, 
                          height: `${Math.random() * 60 + 40}%` 
                        }} />
                      ))}
                    </div>
                    <p className="text-[7px] tracking-[0.3em] font-mono text-[#4a3531] mt-1.5">THK-U-FR-ORDRNG</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

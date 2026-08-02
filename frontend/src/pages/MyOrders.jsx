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
          <div className="space-y-8 max-w-lg mx-auto">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={order._id} 
                className="relative bg-white shadow-lg mx-4 md:mx-0 overflow-hidden"
                style={{
                  borderRadius: '12px 12px 0 0',
                  filter: 'drop-shadow(0 10px 15px rgba(74, 53, 49, 0.05))'
                }}
              >
                {/* Receipt Zig-Zag Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-3 flex space-x-1 overflow-hidden" style={{ transform: 'translateY(50%)' }}>
                  {[...Array(30)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-[#fdfbf7] transform rotate-45 shrink-0" />
                  ))}
                </div>

                <div className="p-6 md:p-8 pb-10">
                  {/* Receipt Header */}
                  <div className="text-center mb-6">
                    <h3 className="font-serif text-2xl font-bold text-[#4a3531] italic tracking-tight mb-1">DropScoop</h3>
                    <p className="text-xs text-[#8c7875] uppercase tracking-widest font-bold">Official Receipt</p>
                  </div>

                  <div className="flex flex-col items-center justify-center border-y-2 border-dashed border-[#4a3531]/10 py-4 mb-6">
                    <p className="text-xs font-bold text-[#8c7875] uppercase tracking-wider mb-1">
                      Order #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-[#4a3531] font-medium text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="flex justify-center mb-6">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                      'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <div className="flex items-start">
                            <span className="font-bold text-[#4a3531] w-6 shrink-0">{item.qty}x</span>
                            <div>
                              <h4 className="font-bold text-[#4a3531] leading-tight">{item.name}</h4>
                              <p className="text-xs text-[#8c7875] mt-0.5">{item.size || 'Single Scoop'}</p>
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[#4a3531] shrink-0 text-right">
                          ₹{(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t-2 border-dashed border-[#4a3531]/10 pt-4">
                    <div className="flex justify-between items-center mb-2 text-sm text-[#8c7875]">
                      <span>Subtotal</span>
                      <span>₹{(order.totalAmount - (order.totalAmount > 500 ? 0 : 50)).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4 text-sm text-[#8c7875]">
                      <span>Delivery</span>
                      <span>{order.totalAmount > 500 ? 'Free' : '₹50.00'}</span>
                    </div>
                    
                    <div className="flex justify-between items-center bg-[#fdfbf7] p-4 rounded-xl">
                      <span className="font-bold text-[#4a3531] uppercase tracking-wider text-sm">Total Paid</span>
                      <span className="text-2xl font-black text-[#4a3531]">₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {order.status === 'Pending' && (
                    <div className="mt-6 pt-6 border-t border-[#4a3531]/5">
                      <button 
                        onClick={() => handleCancelOrder(order._id)}
                        className="w-full py-3 rounded-xl text-red-500 font-bold border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Cancel Order
                      </button>
                    </div>
                  )}

                  {/* Barcode Deco */}
                  <div className="mt-8 flex justify-center opacity-30">
                    <div className="w-48 h-8 flex space-x-1">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="h-full bg-[#4a3531]" style={{ width: `${Math.random() * 4 + 1}px` }} />
                      ))}
                    </div>
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

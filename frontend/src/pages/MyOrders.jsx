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
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={order._id} 
                className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-[#4a3531]/5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#4a3531]/10 pb-6 mb-6 gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#8c7875] uppercase tracking-wider mb-1">
                      Order #{order.orderNumber || order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="text-[#4a3531] font-medium">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 bg-[#fdfbf7] px-4 py-2 rounded-xl border border-[#4a3531]/5">
                    {getStatusIcon(order.status)}
                    <span className="font-bold text-[#4a3531]">{order.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#fbece4] rounded-xl flex items-center justify-center font-bold text-[#4a3531]">
                          {item.qty}x
                        </div>
                        <div>
                          <h4 className="font-bold text-[#4a3531]">{item.name}</h4>
                          <p className="text-sm text-[#8c7875]">{item.size || 'Single Scoop'}</p>
                        </div>
                      </div>
                      <div className="font-bold text-[#4a3531]">
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#4a3531]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-xl font-bold text-[#4a3531]">
                    Total: ₹{order.totalAmount}
                  </div>
                  
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-6 py-2 rounded-xl text-red-500 font-bold border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

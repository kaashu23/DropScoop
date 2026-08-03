import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    growth: 0,
    recentOrders: []
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    Promise.all([
      fetch(`${API_URL}/admin/stats`).then(res => res.json()),
      fetch(`${API_URL}/admin/sales`).then(res => res.json())
    ])
    .then(([statsData, salesData]) => {
      if (statsData.success) setStats(statsData.data);
      if (salesData.success) setChartData(salesData.data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching admin data:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Dashboard Overview</h1>
        <p className="text-[#8c7875] mt-1">Here's what's happening with DropScoop today.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-[#4a3531]/10 min-h-[400px]">
          <h3 className="text-xl font-bold text-[#4a3531] mb-6">Revenue Overview</h3>
          <div className="w-full h-72">
            {loading ? (
              <div className="w-full h-full bg-gray-100 animate-pulse rounded-2xl"></div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a3531" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4a3531" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#8c7875', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#8c7875', fontSize: 12}} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(74,53,49,0.1)' }}
                    itemStyle={{ color: '#4a3531', fontWeight: 'bold' }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                    labelStyle={{ color: '#8c7875', marginBottom: '4px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4a3531" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#4a3531]/10 min-h-[400px] flex flex-col">
          <h3 className="text-xl font-bold text-[#4a3531] mb-6">Recent Orders</h3>
          <div className="space-y-4 flex-grow overflow-y-auto pr-2">
            {loading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-[#4a3531]/5 last:border-0">
                  <div>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-3 w-12 bg-gray-100 animate-pulse rounded"></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 w-12 bg-gray-100 animate-pulse rounded-full"></div>
                  </div>
                </div>
              ))
            ) : stats.recentOrders.length === 0 ? (
              <p className="text-[#8c7875] text-sm text-center py-10">No recent orders.</p>
            ) : (
              stats.recentOrders.map(order => (
                <div key={order._id} className="flex justify-between items-center py-3 border-b border-[#4a3531]/5 last:border-0">
                  <div>
                    <p className="font-bold text-[#4a3531] text-sm truncate w-32">{order.user?.name || 'Guest User'}</p>
                    <p className="text-xs text-[#8c7875]">{order.items?.length || 0} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#4a3531] text-sm">₹{(order.totalAmount || 0).toFixed(2)}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Stat Cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-3xl shadow-sm border border-[#4a3531]/10 flex flex-col relative overflow-hidden">
          <div className="w-12 h-12 bg-[#fbece4] rounded-full flex items-center justify-center text-[#4a3531] mb-4">
            <DollarSign className="w-6 h-6" />
          </div>
          <p className="text-[#8c7875] font-medium text-sm">Total Revenue</p>
          <div className="mt-1">
            {loading ? <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-md"></div> : <h3 className="text-2xl font-bold text-[#4a3531]">₹{stats.revenue.toLocaleString()}</h3>}
          </div>
          <div className="absolute top-6 right-6 flex items-center text-green-500 text-sm font-bold">
            <TrendingUp className="w-4 h-4 mr-1" /> +{stats.growth}%
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-3xl shadow-sm border border-[#4a3531]/10 flex flex-col relative overflow-hidden">
          <div className="w-12 h-12 bg-[#e5f0e6] rounded-full flex items-center justify-center text-[#4a3531] mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <p className="text-[#8c7875] font-medium text-sm">Total Orders</p>
          <div className="mt-1">
            {loading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md"></div> : <h3 className="text-2xl font-bold text-[#4a3531]">{stats.orders}</h3>}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl shadow-sm border border-[#4a3531]/10 flex flex-col relative overflow-hidden">
          <div className="w-12 h-12 bg-[#fcf0dc] rounded-full flex items-center justify-center text-[#4a3531] mb-4">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-[#8c7875] font-medium text-sm">Total Customers</p>
          <div className="mt-1">
            {loading ? <div className="h-8 w-16 bg-gray-200 animate-pulse rounded-md"></div> : <h3 className="text-2xl font-bold text-[#4a3531]">{stats.customers}</h3>}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

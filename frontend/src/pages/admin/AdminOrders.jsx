import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Search, Filter, RefreshCw, X, ChevronDown, Check, Clock, TrendingUp, Truck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isUpdating, setIsUpdating] = useState(null);

  const statuses = ['Pending', 'Delivered', 'Cancelled'];
  const filterStatuses = ['All', ...statuses];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    setIsUpdating(orderId);
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Order status updated to ${newStatus}`);
        fetchOrders();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ready for Pickup': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Preparing': return <TrendingUp className="w-4 h-4" />;
      case 'Out for Delivery': return <Truck className="w-4 h-4" />;
      case 'Ready for Pickup': return <Package className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle2 className="w-4 h-4" />;
      case 'Cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 text-[#8c7875]/30 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />;
    return <ChevronDown className={`w-4 h-4 text-[#4a3531] inline ml-1 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />;
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      (order.orderNumber && order.orderNumber.toLowerCase().includes(searchLower)) ||
      (order.guestEmail && order.guestEmail.toLowerCase().includes(searchLower)) ||
      (order._id && order._id.toLowerCase().includes(searchLower));
    
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (sortField === 'customer') {
      aVal = a.guestEmail || '';
      bVal = b.guestEmail || '';
    } else if (sortField === 'itemsCount') {
      aVal = a.items?.reduce((sum, i) => sum + (i.qty || 1), 0) || 0;
      bVal = b.items?.reduce((sum, i) => sum + (i.qty || 1), 0) || 0;
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Order Management</h1>
          <p className="text-[#8c7875] mt-1">Track and update customer orders in real-time.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="flex items-center gap-2 bg-white border border-[#4a3531]/10 px-4 py-2 rounded-xl text-[#4a3531] font-medium hover:bg-[#fdfbf7] transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-[24px] shadow-sm border border-[#4a3531]/10 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8c7875]" />
          <input 
            type="text" 
            placeholder="Search by Order ID or Email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl outline-none focus:border-[#4a3531] transition-colors"
          />
        </div>
        <div className="relative md:w-64">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8c7875]" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-12 pr-10 py-3 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl outline-none focus:border-[#4a3531] transition-colors appearance-none cursor-pointer text-[#4a3531] font-medium"
          >
            {filterStatuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8c7875] pointer-events-none" />
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-280px)]">
          <table className="w-full min-w-[900px] relative">
            <thead className="bg-[#fdfbf7] border-b border-[#4a3531]/10 sticky top-0 z-10 shadow-sm">
              <tr>
                <th onClick={() => handleSort('createdAt')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors group">
                  Order Details {getSortIcon('createdAt')}
                </th>
                <th onClick={() => handleSort('customer')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors group">
                  Customer {getSortIcon('customer')}
                </th>
                <th onClick={() => handleSort('itemsCount')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors group">
                  Items {getSortIcon('itemsCount')}
                </th>
                <th onClick={() => handleSort('totalAmount')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors group">
                  Total {getSortIcon('totalAmount')}
                </th>
                <th onClick={() => handleSort('status')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors group">
                  Status {getSortIcon('status')}
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#8c7875] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3531]/10">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-24 mb-2"></div><div className="h-3 bg-gray-100 rounded w-16"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-32 mb-2"></div><div className="h-3 bg-gray-100 rounded w-20"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td className="px-6 py-6"><div className="h-8 bg-gray-200 rounded-full w-24"></div></td>
                    <td className="px-6 py-6 text-right"><div className="h-8 bg-gray-200 rounded-lg w-8 ml-auto"></div></td>
                  </tr>
                ))
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#8c7875]">
                    <Package className="w-12 h-12 mx-auto mb-4 text-[#8c7875]/50" />
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id} className="hover:bg-[#fdfbf7]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#4a3531]">#{order.orderNumber || order._id.toString().slice(-6)}</div>
                      <div className="text-xs text-[#8c7875] mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                      <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-[#f3f4f6] text-[#4b5563] uppercase tracking-wider">
                        {order.channel || 'WEB'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#4a3531]">
                        {order.user ? order.user.name : 'Guest'}
                      </div>
                      <div className="text-sm text-[#8c7875]">
                        {order.user?.email || order.guestEmail || 'No email provided'}
                      </div>
                      {order.address && (
                        <div className="text-xs text-[#8c7875] mt-1 truncate max-w-[200px]" title={`${order.address.street}, ${order.address.city}`}>
                          {order.address.street}, {order.address.city}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#4a3531]">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </div>
                      <div className="text-xs text-[#8c7875] mt-1 line-clamp-2 max-w-[200px]">
                        {order.items.map(i => i.qty + 'x ' + (i.flavor?.name || i.name || 'Scoop')).join(', ')}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#4a3531]">₹{order.totalAmount.toFixed(2)}</div>
                      <div className="text-xs text-[#8c7875] mt-1">
                        {order.paymentStatus === 'Paid' ? (
                          <span className="text-green-600 font-medium">Paid</span>
                        ) : (
                          <span className="text-red-500 font-medium">Unpaid</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left group">
                        <button disabled={isUpdating === order._id} className="bg-white border border-[#4a3531]/10 px-3 py-1.5 rounded-lg text-sm font-medium text-[#4a3531] hover:bg-[#fdfbf7] flex items-center gap-1 disabled:opacity-50">
                          {isUpdating === order._id ? 'Updating...' : 'Update Status'}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#4a3531]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-2">
                          {statuses.map(s => (
                            <button
                              key={s}
                              onClick={() => handleStatusUpdate(order._id, s)}
                              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-colors ${order.status === s ? 'bg-[#fdfbf7] text-[#4a3531] font-bold' : 'text-[#8c7875] hover:bg-[#fdfbf7] hover:text-[#4a3531]'}`}
                            >
                              {order.status === s && <Check className="w-4 h-4" />}
                              <span className={order.status === s ? 'ml-0' : 'ml-6'}>{s}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

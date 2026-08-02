import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar, User } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function AdminCustomers() {
  const { getToken } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/admin/customers`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCustomers(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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
    if (sortField !== field) return <span className="text-[#8c7875]/30 inline-block ml-1">▼</span>;
    return <span className={`text-[#4a3531] inline-block ml-1 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`}>▼</span>;
  };

  const filteredCustomers = customers.filter(customer => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      (customer.name && customer.name.toLowerCase().includes(searchLower)) ||
      (customer.email && customer.email.toLowerCase().includes(searchLower))
    );
  }).sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Customer Management</h1>
          <p className="text-[#8c7875] mt-1">View and manage all registered customers.</p>
        </div>
        <div className="relative md:w-80 flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c7875] w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 pl-12 pr-4 text-[#4a3531] placeholder-[#8c7875] focus:outline-none focus:border-[#4a3531] transition-all font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
          <table className="w-full min-w-[800px] relative">
            <thead className="bg-[#fdfbf7] border-b border-[#4a3531]/10 sticky top-0 z-10 shadow-sm">
              <tr>
                <th onClick={() => handleSort('name')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors">
                  Customer Info {getSortIcon('name')}
                </th>
                <th onClick={() => handleSort('email')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors">
                  Contact {getSortIcon('email')}
                </th>
                <th onClick={() => handleSort('createdAt')} className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider cursor-pointer hover:bg-[#f5f0e6] transition-colors">
                  Joined Date {getSortIcon('createdAt')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3531]/10">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-6"><div className="flex items-center"><div className="h-10 w-10 bg-gray-200 rounded-full mr-4"></div><div><div className="h-4 bg-gray-200 rounded w-24 mb-2"></div><div className="h-3 bg-gray-100 rounded w-16"></div></div></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-32 mb-2"></div><div className="h-3 bg-gray-100 rounded w-24"></div></td>
                    <td className="px-6 py-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                  </tr>
                ))
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-[#fbece4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#4a3531]">
                      <Users className="w-8 h-8" />
                    </div>
                    <p className="text-[#8c7875] text-lg">No customers found</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <motion.tr 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={customer._id} 
                    className="hover:bg-[#fdfbf7] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#fbece4] flex items-center justify-center shadow-sm border border-[#4a3531]/10 text-[#4a3531]">
                          <User className="w-5 h-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-[#4a3531]">{customer.name || 'Anonymous User'}</div>
                          <div className="text-sm text-[#8c7875]">ID: {customer._id.substring(customer._id.length - 6).toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm text-[#4a3531]">
                          <Mail className="w-4 h-4 mr-2 text-[#8c7875]" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center text-sm text-[#4a3531]">
                            <Phone className="w-4 h-4 mr-2 text-[#8c7875]" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-[#4a3531]">
                        <Calendar className="w-4 h-4 mr-2 text-[#8c7875]" />
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
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

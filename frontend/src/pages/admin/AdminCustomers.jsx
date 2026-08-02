import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar } from 'lucide-react';
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

  const filteredCustomers = customers.filter(customer => 
    (customer.name && customer.name.toLowerCase().includes(search.toLowerCase())) ||
    (customer.email && customer.email.toLowerCase().includes(search.toLowerCase()))
  );

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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-[#fdfbf7] border-b border-[#4a3531]/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Customer Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#8c7875] uppercase tracking-wider">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4a3531]/10">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-12 text-center text-[#8c7875]">Loading customers...</td>
                </tr>
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
                        <div className="h-10 w-10 flex-shrink-0 bg-[#fbece4] rounded-full flex items-center justify-center text-[#4a3531] font-bold">
                          {(customer.name || 'U')[0].toUpperCase()}
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

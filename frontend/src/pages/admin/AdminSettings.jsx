import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, Mail, Shield, Bell, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@clerk/clerk-react';

export default function AdminSettings() {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [settings, setSettings] = useState({
    storeName: 'DropScoop',
    contactEmail: 'hello@dropscoop.com',
    phoneNumber: '+1 (555) 123-4567',
    currency: 'INR',
    storeAddress: '123 Ice Cream Lane, Dessert District, Food City 10001',
    autoDeliverOrders: true,
    autoDeliverMinutes: 5,
    notifications: {
      newOrderAlerts: true,
      lowStockWarnings: true,
      dailySummary: false,
      customerReviews: true
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = await getToken();
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (name, checked) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto animate-pulse">
        <div className="mb-8">
          <div className="h-10 w-48 bg-[#4a3531]/10 rounded-xl mb-2"></div>
          <div className="h-5 w-72 bg-[#4a3531]/5 rounded-lg"></div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64">
            <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 p-4 space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 w-full bg-[#4a3531]/5 rounded-xl"></div>
              ))}
            </div>
          </div>
          <div className="flex-grow">
            <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 p-8 space-y-6">
              <div className="h-8 w-40 bg-[#4a3531]/10 rounded-xl mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="h-5 w-24 bg-[#4a3531]/10 rounded-lg mb-2"></div>
                    <div className="h-12 w-full bg-[#fdfbf7] rounded-xl border border-[#4a3531]/5"></div>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <div className="h-12 w-32 bg-[#4a3531]/20 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Settings</h1>
        <p className="text-[#8c7875] mt-1">Manage your store preferences and configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 p-4 flex flex-col gap-2">
            {[
              { id: 'general', label: 'General', icon: <Store className="w-5 h-5" /> },
              { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
              { id: 'payments', label: 'Payments', icon: <CreditCard className="w-5 h-5" /> },
              { id: 'security', label: 'Security', icon: <Shield className="w-5 h-5" /> },
              { id: 'email', label: 'Email Templates', icon: <Mail className="w-5 h-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${
                  activeTab === tab.id
                    ? 'bg-[#4a3531] text-white shadow-md'
                    : 'text-[#8c7875] hover:bg-[#fbece4] hover:text-[#4a3531]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-[24px] shadow-sm border border-[#4a3531]/10 p-8">
            
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#4a3531] mb-6">Store Details</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Store Name</label>
                      <input type="text" name="storeName" value={settings.storeName || ''} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Contact Email</label>
                      <input type="email" name="contactEmail" value={settings.contactEmail || ''} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Phone Number</label>
                      <input type="text" name="phoneNumber" value={settings.phoneNumber || ''} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Currency</label>
                      <select name="currency" value={settings.currency || 'INR'} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors appearance-none">
                        <option value="INR">₹ INR (Indian Rupee)</option>
                        <option value="USD">$ USD (US Dollar)</option>
                        <option value="EUR">€ EUR (Euro)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Store Address</label>
                      <textarea rows="3" name="storeAddress" value={settings.storeAddress || ''} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors resize-none"></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#4a3531]/10">
                    <h2 className="text-xl font-bold text-[#4a3531] mb-6">Automation</h2>
                    <div className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl mb-4">
                      <div>
                        <h4 className="font-bold text-[#4a3531]">Auto-Deliver Orders</h4>
                        <p className="text-sm text-[#8c7875] mt-1">Automatically mark new orders as Delivered after time limit.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="autoDeliverOrders" checked={settings.autoDeliverOrders || false} onChange={handleChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a3531]"></div>
                      </label>
                    </div>

                    {settings.autoDeliverOrders && (
                      <div className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                        <div>
                          <h4 className="font-bold text-[#4a3531]">Delivery Time (Minutes)</h4>
                          <p className="text-sm text-[#8c7875] mt-1">Time to wait before marking as delivered.</p>
                        </div>
                        <div className="w-24">
                          <input type="number" name="autoDeliverMinutes" min="1" value={settings.autoDeliverMinutes || 5} onChange={handleChange} className="w-full bg-white border border-[#4a3531]/10 rounded-xl px-4 py-2 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors text-center font-bold" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-[#4a3531]/10 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#4a3531] mb-6">Notification Preferences</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { key: 'newOrderAlerts', title: 'New Order Alerts', desc: 'Receive an email when a new order is placed.' },
                      { key: 'lowStockWarnings', title: 'Low Stock Warnings', desc: 'Get notified when an ice cream flavor runs low.' },
                      { key: 'dailySummary', title: 'Daily Summary', desc: 'Receive a daily email with total sales and traffic.' },
                      { key: 'customerReviews', title: 'Customer Reviews', desc: 'Alert me when a customer leaves a new review.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                        <div>
                          <h4 className="font-bold text-[#4a3531]">{item.title}</h4>
                          <p className="text-sm text-[#8c7875] mt-1">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={settings.notifications?.[item.key] || false} onChange={(e) => handleNotificationChange(item.key, e.target.checked)} className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a3531]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-[#4a3531]/10 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Other tabs are just visual placeholders right now */}
            {(activeTab === 'payments' || activeTab === 'security' || activeTab === 'email') && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[#fbece4] rounded-full flex items-center justify-center text-[#4a3531] mb-4">
                  {activeTab === 'payments' ? <CreditCard className="w-8 h-8" /> : activeTab === 'security' ? <Shield className="w-8 h-8" /> : <Mail className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold text-[#4a3531] mb-2 capitalize">{activeTab} Settings</h3>
                <p className="text-[#8c7875] max-w-md">This section is currently under development. Additional configuration options will be available soon.</p>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

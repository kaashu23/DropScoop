import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, Mail, Shield, Bell, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Settings saved successfully!');
    }, 800);
  };

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
                      <input type="text" defaultValue="DropScoop" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Contact Email</label>
                      <input type="email" defaultValue="hello@dropscoop.com" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Phone Number</label>
                      <input type="text" defaultValue="+1 (555) 123-4567" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Currency</label>
                      <select className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors appearance-none">
                        <option value="INR">₹ INR (Indian Rupee)</option>
                        <option value="USD">$ USD (US Dollar)</option>
                        <option value="EUR">€ EUR (Euro)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Store Address</label>
                      <textarea rows="3" defaultValue="123 Ice Cream Lane, Dessert District, Food City 10001" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors resize-none"></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#4a3531]/10">
                    <h2 className="text-xl font-bold text-[#4a3531] mb-6">Automation</h2>
                    <div className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                      <div>
                        <h4 className="font-bold text-[#4a3531]">Auto-Deliver Orders</h4>
                        <p className="text-sm text-[#8c7875] mt-1">Automatically mark new orders as Delivered after 5 minutes.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a3531]"></div>
                      </label>
                    </div>
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
                      { title: 'New Order Alerts', desc: 'Receive an email when a new order is placed.', default: true },
                      { title: 'Low Stock Warnings', desc: 'Get notified when an ice cream flavor runs low.', default: true },
                      { title: 'Daily Summary', desc: 'Receive a daily email with total sales and traffic.', default: false },
                      { title: 'Customer Reviews', desc: 'Alert me when a customer leaves a new review.', default: true }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                        <div>
                          <h4 className="font-bold text-[#4a3531]">{item.title}</h4>
                          <p className="text-sm text-[#8c7875] mt-1">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
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

            {activeTab === 'payments' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#4a3531] mb-6">Payment Gateways</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="p-6 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff7fb3]/10 rounded-bl-full pointer-events-none"></div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
                        <div>
                          <h4 className="font-bold text-[#4a3531] text-lg">Stripe Integration</h4>
                          <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Connected
                          </p>
                        </div>
                      </div>
                      <button type="button" className="text-sm font-bold text-[#8c7875] hover:text-[#4a3531]">Disconnect</button>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-[#4a3531]/10">
                      <div>
                        <label className="block text-sm font-bold text-[#8c7875] mb-2">Publishable Key</label>
                        <input type="password" defaultValue="pk_live_xxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-white border border-[#4a3531]/10 rounded-xl px-4 py-2 text-[#4a3531] outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-[#8c7875] mb-2">Secret Key</label>
                        <input type="password" defaultValue="sk_live_xxxxxxxxxxxxxxxxxxxxxx" className="w-full bg-white border border-[#4a3531]/10 rounded-xl px-4 py-2 text-[#4a3531] outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl opacity-70">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
                        <div>
                          <h4 className="font-bold text-[#4a3531] text-lg">PayPal Integration</h4>
                          <p className="text-sm text-[#8c7875] font-medium">Not Connected</p>
                        </div>
                      </div>
                      <button type="button" className="text-sm font-bold bg-white border border-[#4a3531]/20 px-4 py-2 rounded-lg text-[#4a3531] hover:bg-[#4a3531] hover:text-white transition-colors">Connect</button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#4a3531]/10 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Saving...' : 'Save Payment Settings'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#4a3531] mb-6">Security Settings</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                      <div>
                        <h4 className="font-bold text-[#4a3531]">Two-Factor Authentication (2FA)</h4>
                        <p className="text-sm text-[#8c7875] mt-1">Require an SMS or App code when logging into the Admin dashboard.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4a3531]"></div>
                      </label>
                    </div>
                    
                    <div className="p-4 bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl">
                      <h4 className="font-bold text-[#4a3531] mb-4">Admin Session Timeout</h4>
                      <select className="w-full md:w-1/2 bg-white border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none appearance-none">
                        <option value="15">15 Minutes</option>
                        <option value="30">30 Minutes</option>
                        <option value="60">1 Hour</option>
                        <option value="never">Never (Not Recommended)</option>
                      </select>
                    </div>

                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl mt-8">
                      <h4 className="font-bold text-red-600 mb-1">Danger Zone</h4>
                      <p className="text-sm text-red-500 mb-4">Reset all customer passwords or force logout all active admin sessions.</p>
                      <button type="button" className="text-sm font-bold bg-white border border-red-200 px-4 py-2 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors">Force Logout All Sessions</button>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-[#4a3531]/10 flex justify-end">
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Saving...' : 'Save Security Rules'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {activeTab === 'email' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-xl font-bold text-[#4a3531] mb-6">Email Templates</h2>
                <form onSubmit={handleSave} className="space-y-6">
                  
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Select Template to Edit</label>
                    <select className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none appearance-none font-medium">
                      <option>Order Confirmation Receipt</option>
                      <option>Order Shipped / Out for Delivery</option>
                      <option>Welcome to DropScoop</option>
                      <option>Password Reset Request</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Email Subject Line</label>
                      <input type="text" defaultValue="Your DropScoop Order is Confirmed! 🍦" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Sender Name</label>
                      <input type="text" defaultValue="DropScoop Team" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-[#8c7875] mb-2">Email Body (HTML Supported)</label>
                      <textarea rows="8" defaultValue={`Hi {{customer_name}},\n\nThank you for ordering from DropScoop! We're preparing your ice cream right now.\n\nOrder Total: {{order_total}}\nEstimated Delivery: 5 Minutes\n\nStay Sweet,\nDropScoop`} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl px-4 py-3 text-[#4a3531] outline-none focus:border-[#4a3531] transition-colors resize-y font-mono text-sm"></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#4a3531]/10 flex justify-end gap-4">
                    <button type="button" className="px-6 py-3 rounded-xl font-bold text-[#4a3531] border border-[#4a3531]/20 hover:bg-[#fdfbf7] transition-colors">
                      Send Test Email
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors disabled:opacity-70">
                      <Save className="w-5 h-5" />
                      {isSubmitting ? 'Saving...' : 'Save Template'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

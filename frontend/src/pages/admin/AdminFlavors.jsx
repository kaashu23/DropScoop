import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, IceCream2, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminFlavors() {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlavor, setEditingFlavor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    categoryName: 'Classic',
    isAvailable: true,
    modelColorTint: '#fbece4'
  });
  const [imageFile, setImageFile] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const fetchFlavors = async () => {
    try {
      const res = await fetch(`${API_URL}/flavors`);
      const data = await res.json();
      if (data.success) {
        setFlavors(data.data);
      }
    } catch (err) {
      console.error('Error fetching flavors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlavors();
  }, []);

  const handleOpenModal = (flavor = null) => {
    if (flavor) {
      setEditingFlavor(flavor);
      setFormData({
        name: flavor.name,
        description: flavor.description,
        basePrice: flavor.basePrice,
        categoryName: flavor.category?.name || 'Classic',
        isAvailable: flavor.isAvailable !== false,
        modelColorTint: flavor.modelColorTint
      });
    } else {
      setEditingFlavor(null);
      setFormData({
        name: '',
        description: '',
        basePrice: '',
        categoryName: 'Classic',
        isAvailable: true,
        modelColorTint: '#fbece4'
      });
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFlavor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = await getToken();
      const formPayload = new FormData();
      
      formPayload.append('name', formData.name);
      formPayload.append('description', formData.description);
      formPayload.append('basePrice', formData.basePrice);
      formPayload.append('categoryName', formData.categoryName);
      formPayload.append('isAvailable', formData.isAvailable);
      formPayload.append('modelColorTint', formData.modelColorTint);
      
      if (imageFile) {
        formPayload.append('image', imageFile);
      } else if (!editingFlavor) {
        // Just a fallback default image if they don't upload one
        formPayload.append('images', '/images/vanilla.jpg');
      }

      const url = editingFlavor 
        ? `${API_URL}/flavors/${editingFlavor._id}`
        : `${API_URL}/flavors`;
      
      const method = editingFlavor ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingFlavor ? 'Flavor updated!' : 'Flavor created!');
        fetchFlavors();
        handleCloseModal();
      } else {
        toast.error(data.message || 'Error saving flavor');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this flavor?")) return;
    
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/flavors/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success('Flavor deleted');
        setFlavors(prev => prev.filter(f => f._id !== id));
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error(error);
      toast.error('Network error');
    }
  };

  const filteredFlavors = flavors.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-serif font-bold text-[#4a3531]">Manage Flavors</h1>
          <p className="text-[#8c7875] mt-1">Add, edit, or remove ice cream flavors.</p>
        </motion.div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4a3531] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5c433e] transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Flavor
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#4a3531]/10 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-[#4a3531]/10 flex justify-between items-center bg-[#fdfbf7]">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c7875] w-5 h-5" />
            <input 
              type="text"
              placeholder="Search flavors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-[#4a3531]/10 rounded-full py-2.5 pl-10 pr-4 text-[#4a3531] focus:outline-none focus:border-[#4a3531] text-sm"
            />
          </div>
          <span className="text-sm font-bold text-[#8c7875] bg-white px-4 py-2 rounded-full border border-[#4a3531]/10">
            Total: {flavors.length}
          </span>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#4a3531]/10 text-[#8c7875] text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">Flavor</th>
                <th className="px-6 py-4 font-bold">Category</th>
                <th className="px-6 py-4 font-bold">Price</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <tr key={i} className="border-b border-[#4a3531]/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-24 bg-gray-200 animate-pulse rounded-full"></div></td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : filteredFlavors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-[#8c7875]">No flavors found.</td>
                </tr>
              ) : (
                filteredFlavors.map(flavor => (
                  <tr key={flavor._id} className="border-b border-[#4a3531]/5 hover:bg-[#fdfbf7] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-[#4a3531]/10 shadow-sm"
                          style={{ backgroundColor: flavor.modelColorTint || '#fbece4' }}
                        >
                          {flavor.images && flavor.images.length > 0 ? (
                            <img src={flavor.images[0]} alt={flavor.name} className="w-6 h-6 object-cover rounded-full" />
                          ) : (
                            <IceCream2 className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <span className="font-bold text-[#4a3531]">{flavor.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#8c7875]">{flavor.category?.name || flavor.categoryName || 'Classic'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#4a3531]">₹{(flavor.basePrice || 0).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        flavor.isAvailable !== false ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {flavor.isAvailable !== false ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleOpenModal(flavor)}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(flavor._id)}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[30px] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#4a3531]">
                  {editingFlavor ? 'Edit Flavor' : 'Add New Flavor'}
                </h2>
                <button onClick={handleCloseModal} className="text-[#8c7875] hover:text-[#4a3531]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Flavor Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4a3531]" placeholder="e.g. Vanilla Bean" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Base Price ($)</label>
                    <input required type="number" step="0.01" name="basePrice" value={formData.basePrice} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4a3531]" placeholder="4.50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Category</label>
                    <select name="categoryName" value={formData.categoryName} onChange={handleChange} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4a3531]">
                      <option value="Classic">Classic</option>
                      <option value="Sorbet">Sorbet</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Sundaes">Sundaes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Stock Status</label>
                    <select name="isAvailable" value={formData.isAvailable.toString()} onChange={(e) => setFormData(prev => ({ ...prev, isAvailable: e.target.value === 'true' }))} className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4a3531]">
                      <option value="true">In Stock</option>
                      <option value="false">Out of Stock</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Description</label>
                    <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full bg-[#fdfbf7] border border-[#4a3531]/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#4a3531]" placeholder="Describe this flavor..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">3D Model Tint Color</label>
                    <div className="flex gap-4 items-center">
                      <input type="color" name="modelColorTint" value={formData.modelColorTint} onChange={handleChange} className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0" />
                      <span className="text-sm font-mono text-[#8c7875] uppercase">{formData.modelColorTint}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#8c7875] mb-2">Flavor Image</label>
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full text-sm text-[#8c7875] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#fbece4] file:text-[#4a3531] hover:file:bg-[#ff7fb3] hover:file:text-white cursor-pointer transition-all" />
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-4 border-t border-[#4a3531]/10">
                  <button type="button" onClick={handleCloseModal} className="px-6 py-3 font-bold text-[#8c7875] hover:text-[#4a3531] transition-colors">
                    Cancel
                  </button>
                  <button disabled={isSubmitting} type="submit" className="bg-[#4a3531] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#5c433e] transition-colors shadow-lg flex items-center justify-center min-w-[120px]">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Flavor'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

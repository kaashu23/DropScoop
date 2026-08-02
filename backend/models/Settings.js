const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  storeName: { type: String, default: 'DropScoop' },
  contactEmail: { type: String, default: 'hello@dropscoop.com' },
  phoneNumber: { type: String, default: '+1 (555) 123-4567' },
  currency: { type: String, default: 'INR' },
  storeAddress: { type: String, default: '123 Ice Cream Lane, Dessert District, Food City 10001' },
  autoDeliverOrders: { type: Boolean, default: true },
  autoDeliverMinutes: { type: Number, default: 5 },
  notifications: {
    newOrderAlerts: { type: Boolean, default: true },
    lowStockWarnings: { type: Boolean, default: true },
    dailySummary: { type: Boolean, default: false },
    customerReviews: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);

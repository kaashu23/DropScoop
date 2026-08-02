const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  channel: { type: String, enum: ['Web', 'Kiosk'], default: 'Web' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guestEmail: { type: String },
  guestPhone: { type: String },
  items: [{
    flavor: { type: mongoose.Schema.Types.ObjectId, ref: 'Flavor', required: false },
    name: { type: String },
    size: { type: String },
    toppings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topping' }],
    qty: { type: Number },
    price: { type: Number },
    isCustom: { type: Boolean, default: false },
    customDescription: { type: String }
  }],
  orderType: { type: String, enum: ['Delivery', 'Pickup'] },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  couponApplied: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
  totalAmount: { type: Number },
  status: { 
    type: String, 
    enum: ['Pending', 'Preparing', 'Out for Delivery', 'Ready for Pickup', 'Delivered', 'Cancelled'] 
  },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'] },
  stripeSessionId: { type: String },
  emailSent: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

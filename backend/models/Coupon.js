const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  discountType: { type: String, enum: ['Percent', 'Flat'] },
  discountValue: { type: Number, required: true },
  minOrderValue: { type: Number, default: 0 },
  expiresAt: { type: Date },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);

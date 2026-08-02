const mongoose = require('mongoose');

const flavorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  basePrice: { type: Number, required: true }, // price for single scoop
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isAvailable: { type: Boolean, default: true },
  isVegan: { type: Boolean, default: false },
  isSugarFree: { type: Boolean, default: false },
  isSignature: { type: Boolean, default: false },
  images: [{ type: String }],
  model3D: { type: String },
  modelColorTint: { type: String, default: '#e5bdba' },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  averageRating: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Add MongoDB text index on name + description for flavor search.
flavorSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Flavor', flavorSchema);

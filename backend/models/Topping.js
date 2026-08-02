const mongoose = require('mongoose');

const toppingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  image: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Topping', toppingSchema);

const Testimonial = require('../models/Testimonial');
const User = require('../models/User');
const Order = require('../models/Order');

exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

exports.addTestimonial = async (req, res, next) => {
  try {
    const auth = req.auth;
    if (!auth || !auth.userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) return res.status(403).json({ success: false, message: 'You must place an order first to add a testimonial.' });

    const orderCount = await Order.countDocuments({ user: user._id });
    if (orderCount === 0) return res.status(403).json({ success: false, message: 'You must place at least one order to add a testimonial.' });

    const { guestName, rating, quote } = req.body;
    const newTestimonial = await Testimonial.create({
      guestName: guestName || user.name || 'Anonymous',
      rating,
      quote
    });

    res.status(201).json({ success: true, message: 'Testimonial added successfully', data: newTestimonial });
  } catch (error) {
    next(error);
  }
};

exports.updateTestimonial = async (req, res, next) => {
  try {
    // Update / feature a testimonial (admin only)
    res.status(200).json({ success: true, message: 'Testimonial updated' });
  } catch (error) {
    next(error);
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Testimonial.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res, next) => {
  try {
    // Get testimonials (?featured=true for Home carousel)
    res.status(200).json({ success: true, message: 'Testimonials fetched' });
  } catch (error) {
    next(error);
  }
};

exports.addTestimonial = async (req, res, next) => {
  try {
    // Add testimonial (admin only)
    res.status(201).json({ success: true, message: 'Testimonial added' });
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
    // Delete testimonial (admin only)
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
};

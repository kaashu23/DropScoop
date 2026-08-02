const Review = require('../models/Review');

exports.addReview = async (req, res, next) => {
  try {
    // Logic to add a review (must have a delivered order)
    res.status(201).json({ success: true, message: 'Review added successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getFlavorReviews = async (req, res, next) => {
  try {
    // Logic to get flavor reviews
    res.status(200).json({ success: true, message: 'Reviews fetched successfully' });
  } catch (error) {
    next(error);
  }
};

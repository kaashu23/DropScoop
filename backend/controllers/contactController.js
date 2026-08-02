const ContactMessage = require('../models/ContactMessage');

exports.submitContact = async (req, res, next) => {
  try {
    // Submit contact form -> save + email admin
    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    // Get all messages (admin only)
    res.status(200).json({ success: true, message: 'Messages fetched' });
  } catch (error) {
    next(error);
  }
};

exports.markMessageAsRead = async (req, res, next) => {
  try {
    // Mark message as read (admin only)
    res.status(200).json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    next(error);
  }
};

const ContactMessage = require('../models/ContactMessage');
const { sendContactEmail } = require('../utils/email');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    // Save to database
    const newMsg = await ContactMessage.create({ name, email, message });
    
    // Try to send email (don't block response if it fails)
    sendContactEmail(name, email, message).catch(err => {
      console.error('Failed to send contact email:', err);
    });

    res.status(201).json({ success: true, message: 'Message sent successfully', data: newMsg });
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

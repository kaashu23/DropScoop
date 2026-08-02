const Order = require('../models/Order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy');
const { json2csv } = require('json2csv');

exports.placeOrder = async (req, res, next) => {
  try {
    // Logic to place an order and trigger Stripe checkout
    res.status(201).json({ success: true, message: 'Order placed, Stripe session created' });
  } catch (error) {
    next(error);
  }
};

exports.placeKioskOrder = async (req, res, next) => {
  try {
    // Logic to place a guest Kiosk order (no Clerk auth) + generates orderNumber
    res.status(201).json({ success: true, message: 'Kiosk order placed' });
  } catch (error) {
    next(error);
  }
};

exports.getKioskOrderStatus = async (req, res, next) => {
  try {
    // Kiosk order-status lookup
    res.status(200).json({ success: true, message: 'Kiosk order status fetched' });
  } catch (error) {
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    // Get logged-in user's orders
    res.status(200).json({ success: true, message: 'My orders fetched' });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    // Get single order detail
    res.status(200).json({ success: true, message: 'Order fetched' });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    // Get all orders (admin only)
    res.status(200).json({ success: true, message: 'All orders fetched' });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    // Update order status (admin only)
    res.status(200).json({ success: true, message: 'Order status updated' });
  } catch (error) {
    next(error);
  }
};

exports.exportOrders = async (req, res, next) => {
  try {
    // Export orders as CSV (admin only)
    res.status(200).send('CSV content goes here');
  } catch (error) {
    next(error);
  }
};

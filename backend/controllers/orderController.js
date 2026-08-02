const Order = require('../models/Order');
const { sendOrderReceipt } = require('../utils/email');

exports.placeOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, customerInfo } = req.body;
    
    // Create the order in the database
    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      items: items.map(i => ({
        flavor: i.id || i._id,
        name: i.name,
        qty: i.quantity,
        price: i.price,
        size: i.size || 'Single'
      })),
      totalAmount,
      status: 'Pending',
      guestEmail: customerInfo.email,
      address: {
        street: customerInfo.addressLine1,
        city: customerInfo.city,
        state: customerInfo.state || 'N/A',
        zip: customerInfo.postalCode,
        country: 'IN'
      }
    });

    // Try to send order receipt email (pass raw items for images)
    sendOrderReceipt(customerInfo.email, newOrder, items).catch(err => {
      console.error('Failed to send order receipt email:', err);
    });

    res.status(201).json({ success: true, message: 'Order placed successfully', order: newOrder });
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

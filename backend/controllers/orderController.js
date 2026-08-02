const Order = require('../models/Order');
const { sendOrderReceipt } = require('../utils/email');

exports.placeOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, customerInfo, clerkId } = req.body;
    
    let dbUserId = null;
    if (clerkId) {
      const User = require('../models/User');
      const user = await User.findOne({ clerkId });
      if (user) dbUserId = user._id;
    }

    // Create the order in the database
    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      user: dbUserId,
      items: items.map(i => {
        const itemId = i.id || i._id;
        const isCustom = itemId && itemId.toString().startsWith('custom-');
        return {
          flavor: isCustom ? null : itemId,
          name: i.name,
          qty: i.quantity,
          price: i.price,
          size: i.size || 'Single',
          isCustom: isCustom,
          customDescription: i.description || ''
        };
      }),
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

    // Auto-deliver order in 5 minutes
    setTimeout(async () => {
      try {
        await Order.findByIdAndUpdate(newOrder._id, { status: 'Delivered' });
        console.log(`Order ${newOrder.orderNumber} automatically marked as Delivered.`);
      } catch (err) {
        console.error('Auto-delivery failed:', err);
      }
    }, 5 * 60 * 1000);

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
    const auth = req.auth;
    if (!auth || !auth.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const User = require('../models/User');
    const user = await User.findOne({ clerkId: auth.userId });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found in DB' });
    }
    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
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
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order status updated', data: order });
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

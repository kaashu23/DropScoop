const Order = require('../models/Order');
const { sendOrderReceipt } = require('../utils/email');

exports.placeOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, customerInfo, clerkId } = req.body;
    
    let dbUserId = null;
    const User = require('../models/User');
    
    if (clerkId) {
      let user = await User.findOne({ clerkId });
      if (!user && customerInfo.email) {
        user = await User.findOne({ email: customerInfo.email });
      }
      if (!user) {
        user = await User.create({
          clerkId,
          email: customerInfo.email,
          name: customerInfo.name || 'Customer'
        });
      } else if (!user.clerkId) {
        // If they checked out as guest before, link their clerkId now
        user.clerkId = clerkId;
        await user.save();
      }
      dbUserId = user._id;
    } else if (customerInfo.email) {
      // Guest checkout fallback
      const user = await User.findOne({ email: customerInfo.email });
      if (user) dbUserId = user._id;
    }

    // Create the order in the database
    const newOrder = await Order.create({
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      user: dbUserId,
      items: items.map(i => {
        const itemId = i.id || i._id;
        const isCustom = itemId && itemId.toString().startsWith('custom-');
        const mongoose = require('mongoose');
        const isValidObjectId = mongoose.Types.ObjectId.isValid(itemId);
        
        return {
          flavor: (!isCustom && isValidObjectId) ? itemId : null,
          name: i.name,
          qty: i.quantity,
          price: i.price,
          size: i.size || 'Single',
          isCustom: isCustom || !isValidObjectId, // Treat mock fallback items somewhat like custom items (no DB reference)
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[getMyOrders] Missing or invalid Authorization header');
      return res.status(401).json({ success: false, message: 'Unauthorized - Missing token' });
    }
    const token = authHeader.split(' ')[1];
    
    let auth;
    try {
      const { verifyToken } = require('@clerk/backend');
      const decoded = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
      auth = { userId: decoded.sub };
      console.log('[getMyOrders] Token verified manually:', auth);
    } catch (verifyError) {
      console.error('[getMyOrders] Token verification failed:', verifyError.message);
      return res.status(401).json({ success: false, message: 'Unauthorized - Invalid token: ' + verifyError.message });
    }

    if (!auth || !auth.userId) {
      console.log('[getMyOrders] Unauthorized - no auth.userId');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    const User = require('../models/User');
    const user = await User.findOne({ clerkId: auth.userId });
    console.log('[getMyOrders] Found user:', user ? user._id : 'NOT FOUND');
    if (!user) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Search by user ID OR by email to catch guest checkouts and missing clerkIds
    const orders = await Order.find({
      $or: [
        { user: user._id },
        { guestEmail: user.email }
      ]
    }).sort({ createdAt: -1 });

    console.log(`[getMyOrders] Found ${orders.length} orders for user ${user._id} / ${user.email}`);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('[getMyOrders] ERROR:', error);
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

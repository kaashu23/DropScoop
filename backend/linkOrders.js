const mongoose = require('mongoose');
const Order = require('./models/Order');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const email = 'kashishsalvi06@gmail.com';
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return process.exit(0);
    }
    console.log('Found user:', user._id);
    
    // Find orders that belong to this email but don't have the user ID set
    const orphanedOrders = await Order.find({ guestEmail: email, user: null });
    console.log(`Found ${orphanedOrders.length} orphaned orders for this email.`);
    
    if (orphanedOrders.length > 0) {
      const result = await Order.updateMany(
        { guestEmail: email, user: null },
        { $set: { user: user._id } }
      );
      console.log(`Updated ${result.modifiedCount} orders to link to user ${user._id}`);
    }
    
    // Check total orders for user now
    const allOrders = await Order.find({ user: user._id });
    console.log(`User now has ${allOrders.length} total orders attached to their profile.`);
    
    // Let's also check if there are any orders with status Cancelled or Delivered that they might be missing
    const cancelled = allOrders.filter(o => o.status === 'Cancelled').length;
    const delivered = allOrders.filter(o => o.status === 'Delivered').length;
    const pending = allOrders.filter(o => o.status === 'Pending').length;
    console.log(`Pending: ${pending}, Cancelled: ${cancelled}, Delivered: ${delivered}`);
    
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});

const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const orders = await Order.find({});
    console.log(JSON.stringify(orders.map(o => ({
      id: o._id,
      orderNumber: o.orderNumber,
      user: o.user,
      guestEmail: o.guestEmail,
      status: o.status
    })), null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});

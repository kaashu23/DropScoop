const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const order = await Order.findOne({ orderNumber: 'ORD-503110' });
    console.log(JSON.stringify(order, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
});

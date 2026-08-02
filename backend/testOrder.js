const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const items = [
      {
        id: "custom-1785671615496",
        name: "Custom Single-Scoop Sundae",
        quantity: 1,
        price: 150
      }
    ];

    const mappedItems = items.map(i => {
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
    });

    console.log("Mapped items:", mappedItems);

    const newOrder = new Order({
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      items: mappedItems,
      totalAmount: 150,
      status: 'Pending'
    });

    await newOrder.save();
    console.log("Order saved successfully");
  } catch (err) {
    console.error("Error saving order:", err.message);
  } finally {
    process.exit(0);
  }
});

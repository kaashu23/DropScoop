const mongoose = require('mongoose');
const Flavor = require('./models/Flavor');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://kashishsalvi06:b03R7x5i49u6iZ5Z@cluster0.p71e0.mongodb.net/dropscoop').then(async () => {
  const flavors = await Flavor.find({ basePrice: { $lt: 20 } });
  for (let f of flavors) {
    f.basePrice = f.basePrice * 80;
    await f.save();
  }
  console.log('Updated ' + flavors.length + ' flavors');
  process.exit(0);
});

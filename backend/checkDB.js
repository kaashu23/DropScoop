const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const t = await Testimonial.find();
    console.log(t);
    process.exit(0);
  })
  .catch(console.error);

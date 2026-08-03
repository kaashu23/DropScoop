const User = require('../models/User');
const Order = require('../models/Order');
const Flavor = require('../models/Flavor');

exports.getStats = async (req, res, next) => {
  try {
    const totalCustomers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Calculate total revenue
    const revenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Fetch 4 most recent orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(4)
      .populate('user', 'name email');

    res.status(200).json({ 
      success: true, 
      data: {
        revenue: totalRevenue,
        orders: totalOrders,
        customers: totalCustomers,
        growth: 12.5, // Dummy growth for now
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getSales = async (req, res, next) => {
  try {
    // Generate realistic dummy sales data for the chart
    // A realistic trend showing high and low days for an ice cream shop
    const chartData = [
      { name: 'Jul 21', revenue: 4200 },
      { name: 'Jul 22', revenue: 3800 },
      { name: 'Jul 23', revenue: 4500 },
      { name: 'Jul 24', revenue: 5100 },
      { name: 'Jul 25', revenue: 8200 }, // Weekend spike
      { name: 'Jul 26', revenue: 9500 }, // Weekend spike
      { name: 'Jul 27', revenue: 4100 },
      { name: 'Jul 28', revenue: 3900 },
      { name: 'Jul 29', revenue: 4700 },
      { name: 'Jul 30', revenue: 5300 },
      { name: 'Jul 31', revenue: 5800 },
      { name: 'Aug 01', revenue: 8900 }, // Weekend spike
      { name: 'Aug 02', revenue: 10200 }, // Weekend spike
      { name: 'Aug 03', revenue: 4500 },
    ];
    res.status(200).json({ success: true, data: chartData });
  } catch (error) {
    next(error);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: customers });
  } catch (error) {
    next(error);
  }
};

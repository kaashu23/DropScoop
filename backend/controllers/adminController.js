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
    // Generate dummy sales data for chart since real aggregation by date can be empty initially
    const chartData = [
      { name: 'Mon', revenue: 120 },
      { name: 'Tue', revenue: 200 },
      { name: 'Wed', revenue: 150 },
      { name: 'Thu', revenue: 300 },
      { name: 'Fri', revenue: 250 },
      { name: 'Sat', revenue: 400 },
      { name: 'Sun', revenue: 350 },
    ];
    res.status(200).json({ success: true, data: chartData });
  } catch (error) {
    next(error);
  }
};

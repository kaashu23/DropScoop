exports.getStats = async (req, res, next) => {
  try {
    // Total orders, revenue, users, top flavor count
    res.status(200).json({ success: true, message: 'Admin stats fetched' });
  } catch (error) {
    next(error);
  }
};

exports.getSales = async (req, res, next) => {
  try {
    // Orders/revenue per day/week/month (for chart)
    res.status(200).json({ success: true, message: 'Admin sales fetched' });
  } catch (error) {
    next(error);
  }
};

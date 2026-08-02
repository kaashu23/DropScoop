const cron = require('node-cron');
const Order = require('../models/Order');
const Settings = require('../models/Settings');

// Run every minute
cron.schedule('* * * * *', async () => {
  try {
    const settings = await Settings.findOne();
    if (!settings || !settings.autoDeliverOrders) return;

    const autoDeliverMinutes = settings.autoDeliverMinutes || 5;
    const thresholdDate = new Date(Date.now() - autoDeliverMinutes * 60 * 1000);

    const result = await Order.updateMany(
      { 
        status: { $in: ['Pending', 'Preparing'] },
        createdAt: { $lte: thresholdDate }
      },
      { 
        $set: { status: 'Delivered' } 
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`[Cron] Auto-delivered ${result.modifiedCount} orders older than ${autoDeliverMinutes} minutes`);
    }
  } catch (error) {
    console.error('[Cron] Auto-deliver error:', error);
  }
});

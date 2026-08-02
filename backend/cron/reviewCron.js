const Order = require('../models/Order');
const Setting = require('../models/Setting');
const sendEmail = require('../utils/sendEmail');

const startReviewCron = () => {
  console.log('Review cron job initialized.');
  
  // Runs every 1 minute
  setInterval(async () => {
    try {
      // Fetch the delay setting from DB (default to 120 minutes if not found)
      let delaySetting = await Setting.findOne({ key: 'REVIEW_EMAIL_DELAY_MINUTES' });
      const delayMinutes = delaySetting && !isNaN(delaySetting.value) ? parseInt(delaySetting.value) : 120;
      
      const cutoffTime = new Date(Date.now() - delayMinutes * 60 * 1000);

      // Find orders that are delivered, haven't been prompted yet, and were updated before the cutoff time
      const ordersToPrompt = await Order.find({
        status: 'Delivered',
        emailSent: false,
        updatedAt: { $lte: cutoffTime }
      }).populate('user');

      for (const order of ordersToPrompt) {
        const recipientEmail = order.user ? order.user.email : order.guestEmail;

        if (recipientEmail) {
          const reviewUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/leave-review`;
          
          await sendEmail({
            to: recipientEmail,
            subject: 'How was your DropScoop order?',
            text: `Thank you for your order (${order.orderNumber || order._id}). We'd love to hear your feedback! Leave a review here: ${reviewUrl}`,
            html: `
              <h3>Thank you for choosing DropScoop!</h3>
              <p>We hope you enjoyed your ice cream. We'd love to hear about your experience.</p>
              <a href="${reviewUrl}" style="padding: 10px 15px; background-color: #ff6b6b; color: white; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Leave a Review</a>
            `
          });
        }
        
        // Mark as sent so we don't email them again
        order.emailSent = true;
        await order.save();
      }
    } catch (error) {
      console.error('Error in review cron job:', error);
    }
  }, 60 * 1000); // 60,000 ms = 1 minute
};

module.exports = startReviewCron;

const User = require('../models/User');
const { Webhook } = require('svix');

exports.clerkWebhook = async (req, res, next) => {
  try {
    const payload = req.body;
    const headers = req.headers;

    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ success: false, message: 'Missing svix headers' });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    let evt;

    try {
      const payloadToVerify = Buffer.isBuffer(payload) 
        ? payload.toString('utf8') 
        : (typeof payload === 'string' ? payload : JSON.stringify(payload));
        
      evt = wh.verify(payloadToVerify, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('Error verifying webhook:', err.message);
      return res.status(400).json({ success: false, message: 'Webhook signature verification failed' });
    }

    const { id, first_name, last_name, email_addresses } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : '';
      const name = `${first_name || ''} ${last_name || ''}`.trim();

      await User.findOneAndUpdate(
        { clerkId: id },
        { 
          clerkId: id,
          name,
          email,
          role: 'user'
        },
        { upsert: true, new: true }
      );
    } else if (eventType === 'user.deleted') {
      await User.findOneAndDelete({ clerkId: id });
    }

    res.status(200).json({ success: true, message: 'Webhook handled successfully' });
  } catch (error) {
    next(error);
  }
};

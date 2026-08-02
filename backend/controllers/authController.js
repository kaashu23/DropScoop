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

    const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data;
    const eventType = evt.type;

    if (eventType === 'user.created' || eventType === 'user.updated') {
      const email = email_addresses && email_addresses.length > 0 ? email_addresses[0].email_address : '';
      const phone = phone_numbers && phone_numbers.length > 0 ? phone_numbers[0].phone_number : '';
      const name = `${first_name || ''} ${last_name || ''}`.trim();

      // Determine role based on environment variables
      const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
      const adminPhones = (process.env.ADMIN_PHONES || '').split(',').map(p => p.trim());
      
      const isAdmin = adminEmails.includes(email.toLowerCase()) || (phone && adminPhones.includes(phone));
      const role = isAdmin ? 'admin' : 'user';

      await User.findOneAndUpdate(
        { clerkId: id },
        { 
          clerkId: id,
          name,
          email,
          phone,
          role
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

exports.syncUser = async (req, res, next) => {
  try {
    const { 
      id, 
      first_name, 
      last_name, 
      email_addresses, 
      phone_numbers,
      firstName,
      lastName,
      emailAddresses,
      fullName
    } = req.body;
    
    if (!id) return res.status(400).json({ success: false, message: 'Missing clerkId' });

    // Handle both webhook format (snake_case) and frontend format (camelCase)
    const emails = email_addresses || emailAddresses || [];
    const email = emails.length > 0 ? (emails[0].email_address || emails[0].emailAddress) : '';
    
    const phones = phone_numbers || req.body.phoneNumbers || [];
    const phone = phones.length > 0 ? (phones[0].phone_number || phones[0].phoneNumber) : '';
    
    const name = fullName ? fullName : `${first_name || firstName || ''} ${last_name || lastName || ''}`.trim();

    // Determine role based on environment variables
    const adminEmails = (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim().toLowerCase());
    const adminPhones = (process.env.ADMIN_PHONES || '').split(',').map(p => p.trim());
    
    const isAdmin = adminEmails.includes(email.toLowerCase()) || (phone && adminPhones.includes(phone));
    const role = isAdmin ? 'admin' : 'user';

    const user = await User.findOneAndUpdate(
      { clerkId: id },
      { 
        clerkId: id,
        name,
        email,
        phone,
        role
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, message: 'User synced successfully', data: user });
  } catch (error) {
    next(error);
  }
};

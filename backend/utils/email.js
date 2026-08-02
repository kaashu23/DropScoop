const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendContactEmail = async (name, email, message) => {
  const msg = {
    to: process.env.EMAIL_USER, // The verified sender email receiving the contact form
    from: process.env.EMAIL_USER, // Must be the verified Single Sender email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from ${name} (${email}):\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #4a3531;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap; color: #555;">${message}</p>
      </div>
    `
  };
  return sgMail.send(msg);
};

exports.sendOrderReceipt = async (userEmail, orderDetails, cartItems = []) => {
  // Try to use cartItems for images, otherwise fallback to orderDetails.items
  const itemsToRender = cartItems.length > 0 ? cartItems : orderDetails.items;
  
  const itemsHtml = itemsToRender.map(item => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid rgba(74, 53, 49, 0.1);">
        <span style="color: #4a3531; font-weight: 700; font-size: 15px;">${item.name || item.flavor?.name || 'Ice Cream Scoop'}</span>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid rgba(74, 53, 49, 0.1); text-align: center; color: #8c7875; font-size: 14px;">${item.qty || item.quantity}</td>
      <td style="padding: 16px 0; border-bottom: 1px solid rgba(74, 53, 49, 0.1); text-align: right; color: #4a3531; font-weight: 700; font-size: 15px;">₹${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  const msg = {
    to: userEmail,
    from: process.env.EMAIL_USER, // Must be the verified Single Sender email
    subject: `Your DropScoop Order Receipt (#${orderDetails.orderNumber || orderDetails._id})`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fdfbf7; padding: 40px 20px; color: #4a3531;">
        <div style="max-width: 540px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px -10px rgba(74, 53, 49, 0.08); border: 1px solid rgba(74, 53, 49, 0.05);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-family: Georgia, serif; font-size: 36px; color: #4a3531; margin: 0 0 10px 0; font-style: italic; letter-spacing: -0.5px;">DropScoop</h1>
            <p style="color: #8c7875; font-size: 16px; margin: 0; font-weight: 500;">Your sweet treats are on the way!</p>
          </div>
          
          <!-- Order Meta -->
          <div style="display: flex; justify-content: space-between; border-bottom: 2px solid rgba(74, 53, 49, 0.05); padding-bottom: 24px; margin-bottom: 30px;">
            <div>
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8c7875; margin: 0 0 4px 0; font-weight: 700;">Order Number</p>
              <p style="font-size: 16px; color: #4a3531; margin: 0; font-weight: 700;">#${orderDetails.orderNumber || orderDetails._id}</p>
            </div>
            <div style="text-align: right;">
              <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8c7875; margin: 0 0 4px 0; font-weight: 700;">Date</p>
              <p style="font-size: 14px; color: #4a3531; margin: 0; font-weight: 600;">${new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
          
          <!-- Items Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 0 0 12px 0; border-bottom: 2px solid rgba(74, 53, 49, 0.1); color: #8c7875; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Item</th>
                <th style="text-align: center; padding: 0 0 12px 0; border-bottom: 2px solid rgba(74, 53, 49, 0.1); color: #8c7875; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Qty</th>
                <th style="text-align: right; padding: 0 0 12px 0; border-bottom: 2px solid rgba(74, 53, 49, 0.1); color: #8c7875; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <!-- Total -->
          <div style="text-align: right; margin-bottom: 40px;">
            <p style="font-size: 14px; color: #8c7875; margin: 0 0 8px 0; display: flex; justify-content: space-between;">
              <span>Subtotal</span>
              <span style="color: #4a3531; font-weight: 600;">₹${(orderDetails.totalAmount - (orderDetails.totalAmount > 500 ? 0 : 50)).toFixed(2)}</span>
            </p>
            <p style="font-size: 14px; color: #8c7875; margin: 0 0 16px 0; display: flex; justify-content: space-between;">
              <span>Delivery</span>
              <span style="color: #4a3531; font-weight: 600;">${orderDetails.totalAmount > 500 ? 'Free' : '₹50.00'}</span>
            </p>
            <div style="background-color: #fdfbf7; border-radius: 12px; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;">
              <span style="color: #4a3531; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Total</span>
              <span style="color: #4a3531; font-size: 24px; font-weight: 800;">₹${orderDetails.totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <!-- Shipping Address -->
          ${orderDetails.address && orderDetails.address.street ? `
          <div style="background-color: #fdfbf7; border-radius: 16px; padding: 24px; margin-bottom: 40px; border: 1px solid rgba(74, 53, 49, 0.05);">
            <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #8c7875; margin: 0 0 12px 0;">Shipping To</h3>
            <p style="color: #4a3531; font-size: 15px; line-height: 1.5; margin: 0; font-weight: 500;">
              ${orderDetails.address.street || orderDetails.address.line1}<br>
              ${orderDetails.address.city}, ${orderDetails.address.state} ${orderDetails.address.zip || orderDetails.address.postal_code}<br>
            </p>
          </div>
          ` : ''}
          
          <!-- Footer -->
          <div style="text-align: center; border-top: 2px solid rgba(74, 53, 49, 0.05); padding-top: 32px;">
            <p style="color: #8c7875; font-size: 14px; line-height: 1.6; margin: 0;">
              Have a question about your order? Just reply to this email.<br>
              Stay sweet, <strong style="color: #4a3531;">The DropScoop Team</strong>
            </p>
          </div>

        </div>
      </div>
    `
  };
  return sgMail.send(msg);
};

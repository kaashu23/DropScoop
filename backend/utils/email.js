const nodemailer = require('nodemailer');
require('dotenv').config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

exports.sendContactEmail = async (name, email, message) => {
  const transporter = createTransporter();
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
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
  return transporter.sendMail(mailOptions);
};

exports.sendOrderReceipt = async (userEmail, orderDetails, cartItems = []) => {
  const transporter = createTransporter();
  
  // Try to use cartItems for images, otherwise fallback to orderDetails.items
  const itemsToRender = cartItems.length > 0 ? cartItems : orderDetails.items;
  
  const itemsHtml = itemsToRender.map(item => `
    <tr>
      <td style="padding: 16px 10px; border-bottom: 1px solid #fdfbf7; display: flex; align-items: center; gap: 12px;">
        ${item.img ? `<img src="${item.img}" alt="${item.name || 'Ice Cream'}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; background-color: #fdfbf7; padding: 4px;" />` : ''}
        <span style="color: #4a3531; font-weight: bold;">${item.name || item.flavor?.name || 'Delicious Scoop'}</span>
      </td>
      <td style="padding: 16px 10px; border-bottom: 1px solid #fdfbf7; text-align: center; color: #5c433e; font-weight: bold;">${item.qty || item.quantity}</td>
      <td style="padding: 16px 10px; border-bottom: 1px solid #fdfbf7; text-align: right; color: #4a3531; font-weight: bold;">₹${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: `Your DropScoop Order Receipt (#${orderDetails.orderNumber || orderDetails._id})`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(74, 53, 49, 0.05); border: 1px solid #fdfbf7;">
        
        <div style="background-color: #4a3531; padding: 40px 20px; text-align: center;">
          <h1 style="color: #fdfbf7; margin: 0; font-size: 32px; font-style: italic;">DropScoop</h1>
          <p style="color: #fbece4; margin-top: 8px; font-size: 16px;">Your sweet treats are confirmed!</p>
        </div>
        
        <div style="padding: 40px 30px;">
          <div style="background-color: #fdfbf7; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <p style="margin: 0 0 10px 0; color: #8c7875; font-size: 13px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Order Number</p>
            <p style="margin: 0; color: #4a3531; font-size: 18px; font-weight: bold;">#${orderDetails.orderNumber || orderDetails._id}</p>
          </div>
          
          ${orderDetails.address && orderDetails.address.street ? `
          <h3 style="color: #5c433e; font-size: 16px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Shipping Address</h3>
          <p style="color: #8c7875; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
            ${orderDetails.address.street || orderDetails.address.line1}<br>
            ${orderDetails.address.city}, ${orderDetails.address.state} ${orderDetails.address.zip || orderDetails.address.postal_code}<br>
            ${orderDetails.address.country}
          </p>
          ` : ''}

          <h3 style="color: #5c433e; font-size: 16px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #4a3531; color: #8c7875; font-size: 13px; text-transform: uppercase;">Item</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid #4a3531; color: #8c7875; font-size: 13px; text-transform: uppercase;">Qty</th>
                <th style="text-align: right; padding: 10px; border-bottom: 2px solid #4a3531; color: #8c7875; font-size: 13px; text-transform: uppercase;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          
          <div style="background-color: #fdfbf7; border-radius: 12px; padding: 20px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
            <span style="color: #8c7875; font-size: 16px; font-weight: bold; text-transform: uppercase;">Total</span>
            <span style="color: #4a3531; font-size: 24px; font-weight: bold;">₹${orderDetails.totalAmount.toFixed(2)}</span>
          </div>
          
          <div style="margin-top: 40px; text-align: center; border-top: 1px solid #fdfbf7; padding-top: 30px;">
            <p style="color: #8c7875; font-size: 14px; line-height: 1.5; margin: 0;">
              Got a question about your order? Just reply to this email.<br>
              Stay sweet, <strong style="color: #4a3531;">The DropScoop Team</strong>
            </p>
          </div>
        </div>
      </div>
    `
  };
  return transporter.sendMail(mailOptions);
};

const Settings = require('../models/Settings');

exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    
    // Update fields
    const allowedUpdates = [
      'storeName', 'contactEmail', 'phoneNumber', 'currency', 'storeAddress',
      'autoDeliverOrders', 'autoDeliverMinutes', 'notifications'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        settings[field] = req.body[field];
      }
    });
    
    await settings.save();
    res.status(200).json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error) {
    next(error);
  }
};

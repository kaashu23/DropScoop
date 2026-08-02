const Store = require('../models/Store');

exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find({ isActive: true });
    res.status(200).json({ success: true, data: stores });
  } catch (error) {
    next(error);
  }
};

exports.createStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.status(200).json({ success: true, data: store });
  } catch (error) {
    next(error);
  }
};

exports.deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, message: 'Store not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

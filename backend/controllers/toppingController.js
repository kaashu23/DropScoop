const Topping = require('../models/Topping');

exports.getToppings = async (req, res, next) => {
  try {
    const toppings = await Topping.find();
    res.status(200).json({ success: true, data: toppings });
  } catch (error) {
    next(error);
  }
};

exports.createTopping = async (req, res, next) => {
  try {
    const topping = await Topping.create(req.body);
    res.status(201).json({ success: true, data: topping });
  } catch (error) {
    next(error);
  }
};

exports.updateTopping = async (req, res, next) => {
  try {
    const topping = await Topping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!topping) {
      return res.status(404).json({ success: false, message: 'Topping not found' });
    }
    res.status(200).json({ success: true, data: topping });
  } catch (error) {
    next(error);
  }
};

exports.deleteTopping = async (req, res, next) => {
  try {
    const topping = await Topping.findByIdAndDelete(req.params.id);
    if (!topping) {
      return res.status(404).json({ success: false, message: 'Topping not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

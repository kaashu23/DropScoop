const Flavor = require('../models/Flavor');
const imagekit = require('../config/imagekit'); // Assumes exported imagekit instance

exports.getFlavors = async (req, res, next) => {
  try {
    const { search, category, sort, vegan, signature } = req.query;
    
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (vegan === 'true') {
      query.isVegan = true;
    }
    if (signature === 'true') {
      query.isSignature = true;
    }

    let sortOption = {};
    if (sort === 'price_asc') {
      sortOption.basePrice = 1;
    } else if (sort === 'price_desc') {
      sortOption.basePrice = -1;
    } else if (sort === 'rating_desc') {
      sortOption.averageRating = -1;
    } else {
      sortOption.createdAt = -1; // Default
    }

    const flavors = await Flavor.find(query).sort(sortOption).populate('category', 'name slug');
    res.status(200).json({ success: true, data: flavors });
  } catch (error) {
    next(error);
  }
};

exports.getFlavorById = async (req, res, next) => {
  try {
    const flavor = await Flavor.findById(req.params.id).populate('category', 'name slug').populate('ratings');
    if (!flavor) {
      return res.status(404).json({ success: false, message: 'Flavor not found' });
    }
    res.status(200).json({ success: true, data: flavor });
  } catch (error) {
    next(error);
  }
};

exports.createFlavor = async (req, res, next) => {
  try {
    let images = [];
    if (req.file) {
      const categoryName = req.body.categoryName || 'Uncategorized';
      const folderName = categoryName.toLowerCase().replace(/\s+/g, '-');
      
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `/dropscoop/flavors/${folderName}`
      });
      images.push(result.url);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }
    
    const flavorData = { ...req.body, images };
    const flavor = await Flavor.create(flavorData);
    res.status(201).json({ success: true, data: flavor });
  } catch (error) {
    next(error);
  }
};

exports.updateFlavor = async (req, res, next) => {
  try {
    let updateData = { ...req.body };
    if (req.file) {
      const categoryName = req.body.categoryName || 'Uncategorized';
      const folderName = categoryName.toLowerCase().replace(/\s+/g, '-');
      
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `/dropscoop/flavors/${folderName}`
      });
      updateData.images = [result.url]; // Could also append to existing
    }

    const flavor = await Flavor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!flavor) {
      return res.status(404).json({ success: false, message: 'Flavor not found' });
    }
    res.status(200).json({ success: true, data: flavor });
  } catch (error) {
    next(error);
  }
};

exports.deleteFlavor = async (req, res, next) => {
  try {
    const flavor = await Flavor.findByIdAndDelete(req.params.id);
    if (!flavor) {
      return res.status(404).json({ success: false, message: 'Flavor not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

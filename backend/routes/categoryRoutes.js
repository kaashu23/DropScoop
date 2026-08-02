const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const clerkMiddleware = require('../middleware/clerkMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.route('/')
  .get(categoryController.getCategories)
  .post(clerkMiddleware, adminMiddleware, categoryController.createCategory);

router.route('/:id')
  .put(clerkMiddleware, adminMiddleware, categoryController.updateCategory)
  .delete(clerkMiddleware, adminMiddleware, categoryController.deleteCategory);

module.exports = router;

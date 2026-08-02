const express = require('express');
const router = express.Router();
const toppingController = require('../controllers/toppingController');
const clerkMiddleware = require('../middleware/clerkMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.route('/')
  .get(toppingController.getToppings)
  .post(clerkMiddleware, adminMiddleware, toppingController.createTopping);

router.route('/:id')
  .put(clerkMiddleware, adminMiddleware, toppingController.updateTopping)
  .delete(clerkMiddleware, adminMiddleware, toppingController.deleteTopping);

module.exports = router;

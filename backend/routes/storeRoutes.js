const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const clerkMiddleware = require('../middleware/clerkMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.route('/')
  .get(storeController.getStores)
  .post(clerkMiddleware, adminMiddleware, storeController.createStore);

router.route('/:id')
  .put(clerkMiddleware, adminMiddleware, storeController.updateStore)
  .delete(clerkMiddleware, adminMiddleware, storeController.deleteStore);

module.exports = router;

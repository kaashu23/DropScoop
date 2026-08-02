const express = require('express');
const router = express.Router();
const multer = require('multer');
const flavorController = require('../controllers/flavorController');
const clerkMiddleware = require('../middleware/clerkMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(flavorController.getFlavors)
  .post(clerkMiddleware, adminMiddleware, upload.single('image'), flavorController.createFlavor);

router.route('/:id')
  .get(flavorController.getFlavorById)
  .put(clerkMiddleware, adminMiddleware, upload.single('image'), flavorController.updateFlavor)
  .delete(clerkMiddleware, adminMiddleware, flavorController.deleteFlavor);

module.exports = router;

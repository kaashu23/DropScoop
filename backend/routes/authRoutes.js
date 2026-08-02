const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// The route might need bodyParser.raw middleware if not applied globally for this route
router.post('/webhook', express.raw({ type: 'application/json' }), authController.clerkWebhook);
router.post('/sync', express.json(), authController.syncUser);

module.exports = router;

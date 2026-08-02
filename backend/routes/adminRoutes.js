const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/stats', adminController.getStats);
router.get('/sales', adminController.getSales);
router.get('/customers', adminController.getCustomers);

module.exports = router;

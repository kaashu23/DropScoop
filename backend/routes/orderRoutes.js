const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const clerkMiddleware = require('../middleware/clerkMiddleware');

// Guest / Kiosk
router.post('/kiosk', orderController.placeKioskOrder);
router.get('/kiosk/:orderNumber', orderController.getKioskOrderStatus);

// User protected
router.post('/', orderController.placeOrder);
router.get('/my', orderController.getMyOrders);

// Admin protected
router.get('/export', orderController.exportOrders);
router.get('/', orderController.getAllOrders);
router.put('/:id/status', orderController.updateOrderStatus);

// Single order fetch (needs to be after /export and /my so it doesn't match 'export' as an ID)
router.get('/:id', orderController.getOrderById);

module.exports = router;

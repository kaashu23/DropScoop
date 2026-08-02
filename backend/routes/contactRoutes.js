const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.submitContact);
router.get('/', contactController.getAllMessages);
router.put('/:id/read', contactController.markMessageAsRead);

module.exports = router;

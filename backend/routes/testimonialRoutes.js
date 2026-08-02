const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

const clerkMiddleware = require('../middleware/clerkMiddleware');

router.get('/', testimonialController.getTestimonials);
router.post('/', clerkMiddleware, testimonialController.addTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;

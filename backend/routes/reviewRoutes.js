const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/:flavorId', reviewController.addReview);
router.get('/:flavorId', reviewController.getFlavorReviews);

module.exports = router;

// reviewRoutes.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/getAllReviews', reviewController.getAllReviews);

router.get('/getReviewById/:id', reviewController.getReviewById);

router.post('/addReview', reviewController.addReview);

router.put('/editReview/:id', reviewController.editReview);

router.delete('/deleteReview/:id', reviewController.deleteReview);

module.exports = router;

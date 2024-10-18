// reviewController.js

const Review = require('../models/Review');
const jwt = require('jsonwebtoken');
const secretKey = 'e96b6fdc5e418edf8422c171e4136ba5ccb7c1b55612e84d8f3d151997ffa7172e25e75757d648f8c824c07287b5e1152990bbba542816f1ff8f87f6ae5b68346a4c2078a689a4a26f94cbeb0bbb11f10bd9bb3a33bf4d7e754f7586880fa76ff66164e997608e453f50e86a2ff9ac3acfbcb423ff9b7dadd1d18bfc9ce8131eb47ab62a2ccc3f829110de32311a5f045e7d04f78287bc1aa4332d74988ed3c1'; // Same secret used in routes

exports.getAllReviews = async (req, res) => {
    let userId;
    let recipeId;
    try {
        jwt.verify(req.headers['authorization'].substring(7), secretKey, (error, decodedToken) => {
            if (error) {
                res.status(401).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                userId = decodedToken.user.id;
                recipeId = req.headers['recipeid'];
            }
        });
        const reviews = await Review.find({ recipe: recipeId });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id);
        res.status(200).json(review);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.addReview = async (req, res) => {
    try {
        let review = {};
        const { recipeId, rating, comment } = req.body;
        if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
            jwt.verify(req.headers['authorization'].substring(7), secretKey, (error, decodedToken) => {
                if (error) {
                    res.status(401).json({
                        success: false,
                        message: "Error while decoding token"
                    });
                }
                else {
                    review = new Review({
                        user: decodedToken.user.id,
                        recipe: recipeId,
                        rating: rating,
                        comment: comment
                    });
                }
            });
            await review.save();
            res.status(200).json(review);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.editReview = async (req, res) => {
    try {
        let review = {};
        const { id } = req.params;
        const { recipeId, rating, comment } = req.body;
        if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
            jwt.verify(req.headers['authorization'].substring(7), secretKey, async (error, decodedToken) => {
                if (error) {
                    res.status(401).json({
                        success: false,
                        message: "Error while decoding token"
                    });
                }
                else {
                    review = await Review.findByIdAndUpdate(id,
                        {
                            user: decodedToken.user.id,
                            recipe: recipeId,
                            rating: rating,
                            comment: comment
                        }, { new: true });
                }
            });
            res.status(201).json(review);
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

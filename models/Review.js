// reviewModel.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: mongoose.Schema.ObjectId,
        ref: "Recipe",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Review", reviewSchema);

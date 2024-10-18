// recipeModel.js

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    recipeName: {
        type: String,
        required: [
            true, "Please enter recipe name"
        ]
    },
    recipeIngredients: {
        type: Array,
        required: [
            true, "Please enter recipe ingredients"
        ]
    },
    recipeSteps: {
        type: String,
        required: [
            true, "Please enter recipe description and steps"
        ]
    },
    // recipeCategory: {
    //     type: String,
    //     required: [
    //         true, "Please enter recipe category"
    //     ]
    // },
    recipeTime: {
        type: Number,
        required: [
            true, "Please enter recipe time in hours"
        ],
        maxLength: [24, "Time cannnot exceed 24 hours"]
    },
    recipeImageUrl: {
        type: String,
        required: true
    },
    numberOfReviews: {
        type: Number,
        dedfault: 0
    },
    reviews: [
        {
            review: {
                type: mongoose.Schema.ObjectId,
                ref: "Review"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);

// recipeController.js

const Recipe = require('../models/Recipe');
const jwt = require('jsonwebtoken');
const secretKey = 'e96b6fdc5e418edf8422c171e4136ba5ccb7c1b55612e84d8f3d151997ffa7172e25e75757d648f8c824c07287b5e1152990bbba542816f1ff8f87f6ae5b68346a4c2078a689a4a26f94cbeb0bbb11f10bd9bb3a33bf4d7e754f7586880fa76ff66164e997608e453f50e86a2ff9ac3acfbcb423ff9b7dadd1d18bfc9ce8131eb47ab62a2ccc3f829110de32311a5f045e7d04f78287bc1aa4332d74988ed3c1'; // Same secret used in routes

exports.getRecipeDetaisFromId = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id);
        return res.status(200).json(recipe);
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllRecipes = async (req, res) => {
    let userId;
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
            }
        });
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const id = req.params.id;
        const recipe = await Recipe.findById(id);
        res.status(200).json(recipe);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        let recipe = {};
        const { recipeName, recipeIngredients, recipeSteps, recipeTime, recipeImageUrl } = req.body;
        if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
            jwt.verify(req.headers['authorization'].substring(7), secretKey, (error, decodedToken) => {
                if (error) {
                    res.status(401).json({
                        success: false,
                        message: error.message
                    });
                }
                else {
                    recipe = new Recipe({
                        user: decodedToken.user.id,
                        recipeName, 
                        recipeIngredients, 
                        recipeSteps, 
                        // recipeCategory, 
                        recipeTime,
                        recipeImageUrl,
                        numberOfReviews: 0,
                        reviews: []
                    });
                }
            });
            await recipe.save();
            res.status(200).json({
                success: true,
                recipe: recipe
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const { recipeName, recipeIngredients, recipeSteps, recipeTime, recipeImageUrl, numberOfReviews, reviews } = req.body;
        const recipe = await Recipe.findByIdAndUpdate(id, {
            recipeName,
            recipeIngredients,
            recipeSteps,
            // recipeCategory,
            recipeTime,
            recipeImageUrl,
            numberOfReviews,
            reviews
        }, { new: true });
        res.status(201).json({
            success: true,
            recipe: recipe
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Recipe Deleted Successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while deleting recipe"
        });
    }
};
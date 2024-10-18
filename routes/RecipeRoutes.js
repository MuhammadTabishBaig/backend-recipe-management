// recipeRoutes.js

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/getRecipeInfo/:id', recipeController.getRecipeDetaisFromId);

router.get('/getAllRecipes', recipeController.getAllRecipes);

router.get('/getRecipeById/:id', recipeController.getRecipeById);

router.post('/createRecipe', recipeController.createRecipe);

router.put('/updateRecipe/:id', recipeController.updateRecipe);

router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);

module.exports = router;

// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/UserRoutes');
const recipeRoutes = require('./routes/RecipeRoutes');
const reviewRoutes = require('./routes/ReviewRoutes');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipe-review-forum', {
    family: 4
})
.then (() => console.log("Mongo DB connected"))
.catch(err => console.log(err));

app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/review', reviewRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

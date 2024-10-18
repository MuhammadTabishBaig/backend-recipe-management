// userController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = 'e96b6fdc5e418edf8422c171e4136ba5ccb7c1b55612e84d8f3d151997ffa7172e25e75757d648f8c824c07287b5e1152990bbba542816f1ff8f87f6ae5b68346a4c2078a689a4a26f94cbeb0bbb11f10bd9bb3a33bf4d7e754f7586880fa76ff66164e997608e453f50e86a2ff9ac3acfbcb423ff9b7dadd1d18bfc9ce8131eb47ab62a2ccc3f829110de32311a5f045e7d04f78287bc1aa4332d74988ed3c1'; // Same secret used in routes

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User Already Exist",
                success: false
            });
        }
        user = new User({
            username: username,
            email: email,
            password: password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const token = generateJwtToken(user.id);
        res.status(201).json({
            success: true,
            token: token,
            message: "User registered successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error! New user registration failed",
            success: false
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }
        const token = generateJwtToken(user.id);
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error, Login unsuccessful"
        });
    }
};

function generateJwtToken(userID) {
    const payload = {
        user: {
            id: userID
        }
    };
    return jwt.sign(payload, secretKey, { expiresIn: 3600 });
}

exports.getUserDetailsFromUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

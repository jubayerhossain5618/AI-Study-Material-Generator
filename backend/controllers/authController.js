// register, login, getProfile, updateProfile controllers

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// ==============================
// Register
// ==============================

exports.register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// ==============================
// Login
// ==============================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (
            user &&
            await bcrypt.compare(
                password,
                user.password
            )
        ) {

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });

        } else {

            res.status(401).json({
                message: "Invalid credentials"
            });
        }

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// ==============================
// Get Profile
// ==============================

exports.getProfile = async (req, res) => {

    try {

        const user =
            await User.findById(req.user.id)
                .select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};


// ==============================
// Update Profile
// ==============================

exports.updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;

        const user =
            await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check if another user already uses this email
        if (email && email !== user.email) {

            const existingUser =
                await User.findOne({ email });

            if (existingUser) {

                return res.status(400).json({
                    message: "Email already in use"
                });
            }
        }

        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser =
            await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            message: "Profile updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
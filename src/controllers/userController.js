
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup User
exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            email,
            password: hashedPassword,
        };

        if (req.file) {
            userData.profileImage = req.file.filename;
        }

        const user = new User(userData);
        await user.save();

        res.status(201).json({ message: 'User registered successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ user: { id: user._id, email: user.email } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            data: user,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// User Profile
exports.profile = async (req, res) => {
    const userId = req.user?.id;
    console.log(userId);
    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile fetched successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};






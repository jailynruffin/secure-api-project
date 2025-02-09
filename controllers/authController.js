// Import necessary modules
const bcrypt = require("bcryptjs"); // For password hiding

const User = require("../models/User"); // Importing user model

const jwt = require("jsonwebtoken"); // Import JWT for authentication

// Controller function to register a new user
const registerUser = async (req, res) => {
    try {
        // Extract user details from the request body
        const { username, email, password } = req.body;

        // Simple validation check
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Respond with success message
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
        });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expires in 1 hour
        });

        // Respond with token and user info
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Export the function so it can be used in 'auth.js'
module.exports = { registerUser, loginUser };
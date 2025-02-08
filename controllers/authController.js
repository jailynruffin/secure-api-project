// Import necessary modules
const bcrypt = require("bcryptjs"); // For password hiding

// Controller function to register a new user
const registerUser = async (req, res) => {
    try {
        // Extract user details from the request body
        const { username, email, password } = req.body;

        // Simple validation check
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required"});
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Would normally save the user in a DB
        // For now, return the hashed password as a placeholder
        return res.status(201).json({
            message: "User registered successfully!",
            username,
            email,
            hashedPassword, // Will not be returned in a real-world app
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message});
    }
};

// Export the function so it can be used in 'auth.js'
module.exports = { registerUser };
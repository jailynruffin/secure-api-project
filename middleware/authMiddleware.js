const jwt = require("jsonwebtoken");

// Middleware to protect routes
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request object
        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid token. Authorization denied." });
    }
};

module.exports = verifyToken;
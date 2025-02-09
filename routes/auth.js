const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController"); // Import controllers
const verifyToken = require("../middleware/authMiddleware"); // Import middleware


router.post("/register", registerUser); // Register Route
router.post("/login", loginUser); // Login Route

// Define the '/register' route
router.post("/register", registerUser);

// Protected route example: Fetch user details
router.get("/me", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed!",
        user: req.user, // Contains the decoded JWT user data
    });
});

module.exports = router;
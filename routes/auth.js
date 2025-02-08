const express = require("express");
const router = express.Router();

// Import the authentication controller
const { registerUser } = require("../controllers/authController");

// Define the '/register' route
router.post("/register", registerUser);

// Export the router so it can be used in 'server.js'
module.exports = router;
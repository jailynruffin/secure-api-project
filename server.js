//MongoDB connection code
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB Atlas
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import required modules
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Enable CORS: Allows front-end applications hosted on other domains to make requests to API
app.use(cors());

// Enable JSON Parsing
app.use(express.json());
app.use("/api/auth", require("./routes/auth"));

// Define a simple test route to verify server is working
app.get("/", (req, res) => {
    res.send("Welcome to the Secure API!")
});

// Define port for the server to listen on
const PORT = process.env.PORT || 5001;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});
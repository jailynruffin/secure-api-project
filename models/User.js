const mongoose = require("mongoose");

// Defining the schema for user data
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true, // Remove extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

// Create User model based on the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Register route
router.post("/register", register); // Register a new user

// Login route
router.post("/login", login); // Login route

module.exports = router;

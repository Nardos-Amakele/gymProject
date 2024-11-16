const express = require("express");
const router = express.Router();

// Assuming you have the authentication and authorization middleware
const { protect, admin } = require("../middleware/authMiddleware");

const {
  getUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/membersController");

// Public route: Get all users (this could be protected depending on your needs)
router.get("/", protect, getUsers);

// Admin-only routes: Add, edit, and delete users
router.post("/", protect, admin, addUser); // Only authenticated admins can add users
router.patch("/:id", protect, admin, editUser); // Ensure user is authenticated and has admin role
router.delete("/:id", protect, admin, deleteUser); // Ensure user is authenticated and has admin role

// Admin route: Only accessible to authenticated admins
router.get("/en/admin", protect, admin, (req, res) => {
  res.send("Welcome to the Admin Page! You are an authenticated admin.");
});

module.exports = router;

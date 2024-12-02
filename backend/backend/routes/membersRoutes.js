const express = require("express");
const router = express.Router();

// Assuming you have the authentication and authorization middleware
const {} = require("../middleware/authMiddleware");

const {
  getUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/membersController");

// Public route: Get all users (this could bed depending on your needs)
router.get("/", getUsers);

// only routes: Add, edit, and delete users
router.post("/", addUser); // Only authenticated  can add users
router.patch("/:id", editUser); // Ensure user is authenticated and has role
router.delete("/:id", deleteUser); // Ensure user is authenticated and has role

// route: Only accessible to authenticated
router.get("/en/admin", (req, res) => {
  res.send("Welcome to the Page! You are an authenticated ");
});

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  editUser,
  deleteUser,
} = require("../controllers/membersController");

router.get("/", getUsers);

router.post("/", addUser);

router.patch("/:id", editUser);

router.delete("/:id", deleteUser);

module.exports = router;

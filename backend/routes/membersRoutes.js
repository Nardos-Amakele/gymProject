const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  editUser,
  deleteUser, updateNotification, addUserWorkout, getMyWorkouts,
} = require("../controllers/membersController");

router.get("/", getUsers);

router.post("/", addUser);

router.patch("/:id", editUser);

router.put("/:id/notification", updateNotification)

router.delete("/:id", deleteUser);

router.post("/addUserWorkout/", addUserWorkout);

router.get("/:id/getMyWorkouts", getMyWorkouts);

module.exports = router;
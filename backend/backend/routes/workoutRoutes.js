const express = require("express");
const router = express.Router();

const {
    getWorkouts,
    getWorkout, createWorkout, updateWorkout, deleteWorkout
} = require("../controllers/workoutController");

router.get("/", getWorkouts);
router.get("/:id", getWorkout)
router.post("/add", createWorkout);
router.patch("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

module.exports = router;

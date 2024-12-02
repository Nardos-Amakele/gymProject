const express = require("express");
const router = express.Router();

const {
    getExercises,
    getExercise, createExercise, updateExercise, deleteExercise
} = require("../controllers/exerciseController");

router.get("/", getExercises);
router.get("/:id", getExercise);
router.post("/add", createExercise);
router.patch("/:id", updateExercise);
router.delete("/:id", deleteExercise);

module.exports = router;

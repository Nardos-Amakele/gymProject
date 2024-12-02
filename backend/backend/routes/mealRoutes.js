const express = require("express");
const router = express.Router();

const {
    getMeals,
    getMeal, createMeal, updateMeal, deleteMeal
} = require("../controllers/exerciseController");

router.get("/", getMeals);
router.get("/:id", getMeal);
router.post("/add", createMeal);
router.patch("/:id", updateMeal);
router.delete("/:id", deleteMeal);

module.exports = router;

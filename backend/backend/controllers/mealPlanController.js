const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");
const getMealPlans = asyncHandler(async (req, res) => {
    try {
        const mealPlans = await prisma.mealPlan.findMany({
            include: { meals: true }
        });

        res.status(200).json({
            success: true,
            data: { mealPlans }
        });
    } catch (error) {
        console.error('Error fetching meal plans:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching meal plans. Please try again later.'
        });
    }
});



const getMealPlan = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const mealPlan = await prisma.mealPlan.findUnique({
            where: {
                id
            },
            include: {meals: true}
        });
        if (!mealPlan) {
            return res.status(404).json({success: false, message: "Meal Plan not found"});
        }
        res.status(200).json({success: true, data: {mealPlan}});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error", error: error.message});
    }
});
const createMealPlan = asyncHandler(async (req, res) => {
    const {
        name,
        slug,
        description,
        category,
        meals
    } = req.body;

    try {
        if (meals && meals.length > 0) {
            const existingMeals = await prisma.meal.findMany({
                where: {
                    id: {
                        in: meals,
                    },
                },
            });
            if (existingMeals.length !== meals.length) {
                return res.status(404).json({
                    success: false,
                    message: "One or more Meal IDs are invalid.",
                });
            }

            const newMealPlan = await prisma.mealPlan.create({
                data: {
                    name,
                    slug,
                    description,
                    category,
                    meals: {
                        connect: meals.map((mealId) => ({
                            id: mealId,
                        })),
                    },
                },
            });

            return res.status(201).json({
                success: true,
                message: "MealPlan created successfully",
                data: newMealPlan,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No meals selected.",
            });
        }
    } catch (error) {
        console.error("Error creating mealPlan:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the meal plan.",
            error: error.message,
        });
    }
});


const updateMealPlan = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {
        name,
        slug,
        description,
        category,
        meals,
    } = req.body;

    try {
        const mealPlanExists = await prisma.mealPlan.findUnique({
            where: {id},
        });

        if (!mealPlanExists) {
            return res.status(404).json({
                success: false,
                message: "MealPlan not found",
            });
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (slug) updateData.slug = slug;
        if (description) updateData.description = description;
        if (category) updateData.category = category;

        if (meals?.length) {
            updateData.meals = {
                update: meals.map((meal) => ({
                    where: {id: meal.id},
                    data: {
                        name: meal.name,
                        description: meal.description,
                        reps: meal.reps,
                        sets: meal.sets,
                        category: meal.category,
                        videoUrl: meal.videoUrl,
                        thumbnailUrl: meal.thumbnailUrl,
                        focusArea: meal.focusArea,
                    },
                })),
            };
        }
        const updatedMealPlan = await prisma.mealPlan.update({
            where: {id},
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "MealPlan updated successfully",
            data: updatedMealPlan,
        });
    } catch (error) {
        console.error("Error updating mealPlan:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the mealPlan.",
            error: error.message,
        });
    }
});

const deleteMealPlan = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const mealPlanExists = await prisma.mealPlan.findUnique({
            where: {id},
        });

        if (!mealPlanExists) {
            return res.status(404).json({
                success: false,
                message: "MealPlan not found",
            });
        }
        const deletedMealPlan = await prisma.mealPlan.delete({
            where: {id},
        });

        res.status(200).json({
            success: true,
            message: "MealPlan deleted successfully",
            data: deletedMealPlan,
        });
    } catch (error) {
        console.error("Error deleting mealPlan:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the mealPlan.",
            error: error.message,
        });
    }
});


module.exports = {
    getMealPlans,
    getMealPlan,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan
};
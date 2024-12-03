const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/client");

const getWorkouts = asyncHandler(async (req, res) => {
    const workouts = await prisma.workout.findMany({include: {exercises: true}});
    res.status(200).json({success: true, data: {workouts}});
});


const getWorkout = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const workout = await prisma.workout.findUnique({
            where: {
                id
            },
            include: {exercises: true}
        });
        if (!workout) {
            return res.status(404).json({success: false, message: "Workout not found"});
        }
        res.status(200).json({success: true, data: {workout}});
    } catch (error) {
        res.status(500).json({success: false, message: "Server error", error: error.message});
    }
});
const createWorkout = asyncHandler(async (req, res) => {
    const {
        name,
        difficulty,
        mainGoal,
        workoutType,
        duration,
        daysPerWeek,
        timePerWorkout,
        targetGender,
        exercises
    } = req.body;

    try {
        if (exercises && exercises.length > 0) {
            const existingExercises = await prisma.exercise.findMany({
                where: {
                    id: {
                        in: exercises,
                    },
                },
            });
            if (existingExercises.length !== exercises.length) {
                return res.status(404).json({
                    success: false,
                    message: "One or more exercise IDs are invalid.",
                });
            }

            const newWorkout = await prisma.workout.create({
                data: {
                    name,
                    difficulty,
                    mainGoal,
                    workoutType,
                    duration,
                    daysPerWeek,
                    timePerWorkout,
                    targetGender,
                    exercises: {
                        connect: exercises.map((exerciseId) => ({
                            id: exerciseId,
                        })),
                    },
                },
            });

            return res.status(201).json({
                success: true,
                message: "Workout created successfully",
                data: newWorkout,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No exercises selected.",
            });
        }
    } catch (error) {
        console.error("Error creating workout:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the workout.",
            error: error.message,
        });
    }
});


const updateWorkout = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(id.workoutPlanId)
    const {
        name,
        difficulty,
        mainGoal,
        workoutType,
        duration,
        daysPerWeek,
        timePerWorkout,
        targetGender,
        exercises,
    } = req.body;

    try {
        const workoutExists = await prisma.workout.findUnique({
            where: {id:id},
        });

        if (!workoutExists) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }

        const updateData = {};

        if (name) updateData.name = name;
        if (difficulty) updateData.difficulty = difficulty;
        if (mainGoal) updateData.mainGoal = mainGoal;
        if (workoutType) updateData.workoutType = workoutType;
        if (duration) updateData.duration = duration;
        if (daysPerWeek) updateData.daysPerWeek = daysPerWeek;
        if (timePerWorkout) updateData.timePerWorkout = timePerWorkout;
        if (targetGender) updateData.targetGender = targetGender;
        if (exercises) updateData.exercises = exercises;
        // if (exercises?.length) {
        //     updateData.exercises = {
        //         update: exercises.map((exercise) => ({
        //             where: {slug: exercise.slug},
        //             data: {
        //                 name: exercise.name,
        //                 slug: exercise.slug,
        //                 description: exercise.description,
        //                 reps: exercise.reps,
        //                 sets: exercise.sets,
        //                 duration: exercise.duration,
        //                 videoUrl: exercise.videoUrl,
        //                 thumbnailUrl: exercise.thumbnailUrl,
        //                 focusArea: exercise.focusArea,
        //             },
        //         })),
        //     };
        // }
        const updatedWorkout = await prisma.workout.update({
            where: {id},
            data: updateData,
        });

        res.status(200).json({
            success: true,
            message: "Workout updated successfully",
            data: updatedWorkout,
        });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the workout.",
            error: error.message,
        });
    }
});

const deleteWorkout = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try {
        const workoutExists = await prisma.workout.findUnique({
            where: {id},
        });

        if (!workoutExists) {
            return res.status(404).json({
                success: false,
                message: "Workout not found",
            });
        }
        const deletedWorkout = await prisma.workout.delete({
            where: {id},
        });

        res.status(200).json({
            success: true,
            message: "Workout deleted successfully",
            data: deletedWorkout,
        });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the workout.",
            error: error.message,
        });
    }
});


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
};
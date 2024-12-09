const asyncHandler = require('express-async-handler');
const prisma = require("../prisma/client");

const markAsCompleted = asyncHandler(async (req, res) => {
    const {userId, exerciseId} = req.body;
    try {
        const completion = await prisma.exerciseCompletion.create({
            data: {
                userId,
                exerciseId
            },
        });
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        const lastWorkoutDate = user.lastWorkoutDate;
        const today = new Date().toISOString().split('T')[0];
        const isNewStreak = lastWorkoutDate && lastWorkoutDate.toISOString().split('T')[0] === today;
        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                lastWorkoutDate: new Date(),
                currentStreak: isNewStreak ? user.currentStreak + 1 : 1,
                highestStreak: Math.max(user.highestStreak, isNewStreak ? user.currentStreak + 1 : 1),
            },
        });
        return res.status(200).json({completion, updatedUser});
    }
    catch (error) {
        return res.status(500).json({error: error.message});
    }
})
module.exports = {markAsCompleted}
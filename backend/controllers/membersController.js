const asyncHandler = require("express-async-handler");
const prisma = require("../prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/users/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024}, // 10 MB limit for user images
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
            return cb(null, true);
        }
        cb(new Error("Only image files are allowed!"));
    },
});

// Helper function to validate date format (YYYY-MM-DD)
const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime()) && dateStr === date.toISOString().split("T")[0];
};

// Get all users
const getUsers = asyncHandler(async (req, res) => {
    const users = await prisma.user.findMany({
            include: {
                exercisesCompleted: true,
                attendance: true,
                workouts: true,
                bmis: true,
                notifications: true
            }
        }
    );
    res.status(200).json({
        success: true, data: {users},
    });
});

// Add a new user
const addUser = [
    upload.single("profileImage"),
    asyncHandler(async (req, res) => {
        const {
            fullName,
            gender,
            phoneNumber,
            email,
            address,
            dob,
            emergencyContact,
            startDate,
            countDown,
            height,
            weight,
            bmis,
            healthConditions,
            level,
            goal,
            status,
            freezeDate,
            serviceId,
            workouts,
            exercisesCompleted,
            lastWorkoutDate,
            currentStreak,
            highestStreak,
            notifications,
        } = req.body;

        if (
            !fullName ||
            !gender ||
            !phoneNumber ||
            !address ||
            !dob ||
            !emergencyContact
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing.",
            });
        }

        if (!/^\d{10}$/.test(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be exactly 10 digits.",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {phoneNumber},
        });
        if (existingUser) {
            return res
                .status(400)
                .json({success: false, message: "Phone number is already taken."});
        }

        if (!isValidDate(dob)) {
            return res.status(400).json({
                success: false,
                message: "Date of birth must be in YYYY-MM-DD format.",
            });
        }

        // Check if serviceId exists in the Service table
        const service = await prisma.service.findUnique({
            where: {id: serviceId},
        });

        if (!service) {
            return res.status(400).json({
                success: false,
                message: `Invalid service ID. ${serviceId}`,
            });
        }

        let profileImageUrl = null;
        if (req.file) {
            profileImageUrl = `/uploads/users/${req.file.filename}`;
        }

        const newUser = await prisma.user.create({
            data: {
                fullName,
                gender,
                phoneNumber,
                email: email || null,
                address,
                dob: new Date(dob),
                emergencyContact,
                startDate: startDate ? new Date(startDate) : undefined,
                countDown,
                height,
                weight,
                bmis: {
                    create: bmis?.map((bmi) => ({
                        value: bmi.value,
                    })) || [],
                },
                healthConditions: healthConditions,
                level,
                goal,
                status,
                freezeDate: freezeDate ? new Date(freezeDate) : undefined,
                serviceId: serviceId,
                profileImageUrl,
                workouts: {
                    connect: workouts.map((workoutId) => ({
                        id: workoutId,
                    })),
                },
                exercisesCompleted: {
                    connect: exercisesCompleted.map((exerciseCompletedId) => ({
                        id: exerciseCompletedId,
                    })),
                },
                lastWorkoutDate: lastWorkoutDate ? new Date(lastWorkoutDate) : null,
                currentStreak,
                highestStreak,
                notifications: {
                    connect: notifications.map((notification) => ({
                        id: notification.id,
                    }))
                },
            },
        });

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: newUser,
        });
    }),
];

const editUser = [
    upload.single("profileImage"),
    asyncHandler(async (req, res) => {
        const {id} = req.params;
        const {
            fullName,
            gender,
            phoneNumber,
            email,
            address,
            dob,
            emergencyContact,
            startDate,
            countDown,
            height,
            weight,
            bmi,
            healthConditions,
            level,
            goal,
            status,
            freezeDate,
            serviceId,
            workouts,
            exercisesCompleted,
            lastWorkoutDate,
            currentStreak,
            highestStreak,
        } = req.body;

        const user = await prisma.user.findUnique({
            where: {id}, include: {
                exercisesCompleted: true,
                attendance: true,
                workouts: true,
                bmis: true,
                notifications: true
            }
        });
        if (!user) {
            return res
                .status(404)
                .json({success: false, message: "User not found."});
        }

        if (dob && !isValidDate(dob)) {
            return res.status(400).json({
                success: false,
                message: "Date of birth must be in YYYY-MM-DD format.",
            });
        }

        if (phoneNumber && phoneNumber !== user.phoneNumber) {
            const existingUser = await prisma.user.findUnique({
                where: {phoneNumber},
            });
            if (existingUser) {
                return res
                    .status(400)
                    .json({success: false, message: "Phone number is already taken."});
            }
        }

        let profileImageUrl = user.profileImageUrl;
        if (req.file) {
            if (profileImageUrl) {
                fs.unlink(path.join(__dirname, `../../${profileImageUrl}`), (err) => {
                    if (err) console.log(err);
                });
            }
            profileImageUrl = `/uploads/users/${req.file.filename}`;
        }
        const {addWorkouts, removeWorkouts} = workouts;
        if (addWorkouts && Array.isArray(addWorkouts)) {
            const newWorkouts = await prisma.workout.findMany({
                where: {id: {in: addWorkouts}},
            });
            if (newWorkouts.length !== addWorkouts.length) {
                return res.status(400).json({
                    success: false,
                    message: "One or more workouts not found.",
                });
            }
            await prisma.user.update({
                where: {id},
                data: {
                    workouts: {
                        connect: addWorkouts.map((workoutId) => ({id: workoutId})),
                    },
                },
            });
        }

        if (removeWorkouts && Array.isArray(removeWorkouts)) {
            const existingWorkouts = await prisma.workout.findMany({
                where: {id: {in: removeWorkouts}},
            });
            if (existingWorkouts.length !== removeWorkouts.length) {
                return res.status(400).json({
                    success: false,
                    message: "One or more workouts to remove not found.",
                });
            }

            await prisma.user.update({
                where: {id},
                data: {
                    workouts: {
                        disconnect: removeWorkouts.map((workoutId) => ({id: workoutId})),
                    },
                },
            });
        }
        let updatedBmi = user.bmis;
        console.log(updatedBmi)
        if (bmi) {
            if (isNaN(bmi)) {
                return res.status(400).json({
                    success: false,
                    message: "BMI must be a valid number.",
                });
            }
            updatedBmi = [...user.bmis, {"value": parseFloat(bmi)}]; // Append new BMI value
        }

        // {
        //     "addWorkouts": ["workout-uuid-1", "workout-uuid-2"],   // List of workout IDs to add
        //     "removeWorkouts": ["workout-uuid-3"]                     // List of workout IDs to remove
        // }

        const updatedUser = await prisma.user.update({
                where: {id},
                data: {
                    fullName: fullName || user.fullName,
                    gender: gender || user.gender,
                    phoneNumber: phoneNumber || user.phoneNumber,
                    email: email || user.email,
                    address: address || user.address,
                    dob: dob ? new Date(dob) : user.dob,
                    emergencyContact: emergencyContact || user.emergencyContact,
                    startDate: startDate ? new Date(startDate) : user.startDate,
                    countDown: countDown ?? user.countDown,
                    height: height ?? user.height,
                    weight: weight ?? user.weight,
                    bmis: {
                        create: updatedBmi?.map((bmi) => ({
                            value: bmi.value,
                        })) || [],
                    },
                    healthConditions: healthConditions
                        ? JSON.parse(healthConditions)
                        : user.healthConditions,
                    level: level || user.level,
                    goal: goal || user.goal,
                    status: status || user.status,
                    freezeDate: freezeDate ? new Date(freezeDate) : user.freezeDate,
                    serviceId: serviceId || user.serviceId,
                    profileImageUrl,
                    workouts: addWorkouts ? {
                        create: addWorkouts.map((workoutId) => ({
                            id: workoutId,
                        })),
                    } : {
                        connect: user.workouts.map((workoutId) => ({
                            id: workoutId,
                        })),
                    },
                    exercisesCompleted: exercisesCompleted ? {
                        create: exercisesCompleted.map((exerciseCompletedId) => ({
                            id: exerciseCompletedId,
                        })),
                    } : {
                        create: user.exercisesCompleted.map((exerciseCompletedId) => ({
                            id: exerciseCompletedId,
                        })),
                    },
                    lastWorkoutDate: lastWorkoutDate ? new Date(lastWorkoutDate) : user.lastWorkoutDate,
                    currentStreak: currentStreak || user.currentStreak,
                    highestStreak: highestStreak || user.highestStreak,
                },
            })
        ;

        res.status(200).json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser,
        });
    }),
]

const updateNotification = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {add, remove} = req.body;
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) {
        return res.status(404).json({success: false, message: "User not found."});
    }
    let updatedNotifications = user.notification || [];
    if (add && Array.isArray(add)) {
        add.forEach((newNotification) => {
            if (!newNotification.id || !newNotification.message) {
                return res.status(400).json({
                    success: false,
                    message: "Each notification must include an id and a message.",
                });
            }
            const exists = updatedNotifications.some(
                (notification) => notification.id === newNotification.id
            );
            if (!exists) {
                updatedNotifications.push(newNotification);
            }
        });
    }
    if (remove && Array.isArray(remove)) {
        updatedNotifications = updatedNotifications.filter(
            (notification) => !remove.includes(notification.id)
        );
    }
    const updatedUser = await prisma.user.update({
        where: {id},
        data: {notification: updatedNotifications},
    });
    res.status(200).json({
        success: true,
        message: "Notifications updated successfully.",
        data: updatedUser.notification,
    });
});


const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({where: {id}});
    if (!user) {
        return res.status(404).json({success: false, message: "User not found."});
    }

    if (user.profileImageUrl) {
        fs.unlink(path.join(__dirname, `../../${user.profileImageUrl}`), (err) => {
            if (err) console.log(err);
        });
    }

    await prisma.user.delete({where: {id}});
    res
        .status(200)
        .json({success: true, message: "User deleted successfully."});
});

const addUserWorkout = asyncHandler(async (req, res) => {
    const {userId, workoutId, startedAt, progress, finishedAt} = req.body;

    const user = await prisma.user.findUnique({
        where: {id: userId},
    });
    if (!user) {
        return res.status(404).json({success: false, message: "User not found."});
    }

    const workout = await prisma.workout.findUnique({
        where: {id: workoutId},
    });
    if (!workout) {
        return res.status(404).json({success: false, message: "Workout not found."});
    }

    const existingUserWorkout = await prisma.userWorkout.findFirst({
        where: {
            userId,
            workoutId,
        },
    });
    if (existingUserWorkout) {
        return res.status(400).json({
            success: false,
            message: "Workout is already added to the user.",
        });
    }

    const userWorkout = await prisma.userWorkout.create({
        data: {
            userId,
            workoutId,
            startedAt: startedAt ? new Date(startedAt) : undefined,
            progress: progress !== undefined ? parseInt(progress) : null,
            finishedAt: finishedAt ? new Date(finishedAt) : null,
        },
    });

    return res.status(201).json({
        success: true,
        message: "Workout added to user successfully.",
        data: userWorkout,
    });
});

const getMyWorkouts = asyncHandler(async (req, res) => {
    const { id } = req.params; // userId
    try {
        // Verify if the user exists
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Fetch userWorkout records and include the associated workout details
        const userWorkouts = await prisma.userWorkout.findMany({
            where: { userId: id },
            include: {
                workout: true, // Include the workout details
            },
        });

        // Extract the list of workouts from the userWorkout records
        const workouts = userWorkouts.map((userWorkout) => userWorkout.workout);

        res.status(200).json({
            success: true,
            data: workouts, // Return only the workouts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = {getUsers, addUser, editUser, deleteUser, updateNotification, addUserWorkout, getMyWorkouts};

const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const prisma = require("../../prisma/client");
const multer = require("multer");


// Login logic
const login = async (req, res) => {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
        console.log("Phone number or password missing");
        return res.status(400).json({
            success: false,
            message: "Phone number and password are required.",
        });
    }

    try {
        // Find user by phone number
        const user = await prisma.user.findUnique({
            where: { phoneNumber },
        });

        if (!user) {
            console.log(`User with phone number ${phoneNumber} not found`);
            return res.status(400).json({
                success: false,
                message: "Invalid phone number or password.",
            });
        }

        // Compare password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({
                success: false,
                message: "Invalid phone number or password.",
            });
        }

        // Generate JWT token with user role
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            role: user.role,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred. Please try again.",
        });
    }
};




// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/users"); // Set your upload directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Register logic with file handling
const register = [
    upload.single("profileImage"), // Use multer middleware for handling profile image upload
    async (req, res) => {
        try {
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
                password,
                role,
            } = req.body;

            // Validation for required fields
            if (!fullName || !phoneNumber || !password || !dob || !emergencyContact) {
                return res.status(400).json({
                    success: false,
                    message: "Required fields are missing.",
                });
            }

            // Check if phone number already exists
            const existingUser = await prisma.user.findUnique({
                where: { phoneNumber },
            });
            if (existingUser) {
                return res.status(400).json({ success: false, message: "Phone number already exists." });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Handle profile image upload
            let profileImageUrl = null;
            if (req.file) {
                profileImageUrl = `/uploads/users/${req.file.filename}`;
            }
            const userRole = role && (role === 'admin' || role === 'user') ? role : 'user';


            // Create a new user in the database
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
                    bmi,
                    healthConditions: healthConditions ? JSON.parse(healthConditions) : undefined,
                    level,
                    goal,
                    status,
                    freezeDate: freezeDate ? new Date(freezeDate) : undefined,
                    serviceId,
                    profileImageUrl,
                    password: hashedPassword,
                    role: userRole,
                },
            });

            // Generate JWT token for the new user
            const token = generateToken(newUser);

            // Send the response with the token
            res.status(201).json({
                success: true,
                message: "User registered successfully.",
                token,
            });
        } catch (error) {
            console.error("Error during registration:", error);
            res.status(500).json({
                success: false,
                message: "An error occurred. Please try again.",
            });
        }
    },
];

module.exports = { login, register };

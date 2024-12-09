const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the folder exists
    const dir = "uploads/users/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit for user images
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
    orderBy: {
      createdAt: "desc",
    },
  });
  res.status(200).json({ success: true, data: { users } });
});

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
      height,
      weight,
      bmi,
      healthConditions,
      level,
      goal,
      status,
      freezeDate,
      serviceId, // Ensure serviceId is provided
      password,
      role, // Role should be part of the request body
    } = req.body;

    // Default role to "user" if not provided
    const userRole =
      role && (role === "admin" || role === "user") ? role : "user";

    // Check for required fields
    if (
      !fullName ||
      !gender ||
      !phoneNumber ||
      !address ||
      !dob ||
      !emergencyContact ||
      !serviceId || // Make sure serviceId is provided
      !password // Ensure password is provided
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits.",
      });
    }

    // Check if the phone number is already taken
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber },
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Phone number is already taken.",
      });
    }

    // Validate date of birth format
    if (!isValidDate(dob)) {
      return res.status(400).json({
        success: false,
        message: "Date of birth must be in YYYY-MM-DD format.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ensure serviceId corresponds to an existing service
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return res.status(400).json({
        success: false,
        message: `Invalid service ID: ${serviceId}.`,
      });
    }

    // Handle profile image upload
    let profileImageUrl = null;

    const profileImage = req.body.profileImage || (req.file && req.file.buffer);
    if (
      typeof profileImage === "string" &&
      profileImage.startsWith("data:image/")
    ) {
      // Handle Base64 Image
      try {
        const base64Data = profileImage.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        // Validate file size
        if (buffer.length > 10 * 1024 * 1024) {
          throw new Error("File size exceeds 10 MB limit.");
        }

        const dir = "uploads/users/";
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }

        const fileName = `${Date.now()}_profileImage.png`; // Assume PNG
        const filePath = `${dir}${fileName}`;
        fs.writeFileSync(filePath, buffer);
        profileImageUrl = `/${filePath}`;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: `Error processing base64 image: ${error.message}`,
        });
      }
    } else if (req.file) {
      // Handle Binary File via Multer
      profileImageUrl = `/uploads/users/${req.file.filename}`;
    }

    const daysLeft = service.maxDays;
    // Create the new user
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
        daysLeft,
        height,
        weight,
        bmi,
        healthConditions: healthConditions
          ? JSON.parse(healthConditions)
          : undefined,
        level,
        goal,
        status,
        freezeDate: freezeDate ? new Date(freezeDate) : undefined,
        serviceId: service.id, // Use the validated serviceId
        profileImageUrl,
        password: hashedPassword, // Save the hashed password
        role: userRole, // Set the role (defaults to "user" if not provided or invalid
      },
    });

    // Return a successful response
    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: newUser,
    });
  }),
];

// Edit a user by ID
const editUser = [
  upload.single("profileImage"),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
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
      password, // Password field added here
    } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (dob && !isValidDate(dob)) {
      return res.status(400).json({
        success: false,
        message: "Date of birth must be in YYYY-MM-DD format.",
      });
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await prisma.user.findUnique({
        where: { phoneNumber },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Phone number is already taken." });
      }
    }

    let profileImageUrl = user.profileImageUrl;
    if (req.file) {
      if (profileImageUrl) {
        fs.unlink(path.join(__dirname, `../../${profileImageUrl}`), (err) => {
          if (err) {
            console.log("Error deleting old profile image:", err);
          } else {
            console.log("Old profile image deleted successfully.");
          }
        });
      }
      profileImageUrl = `/uploads/users/${req.file.filename}`;
    }

    let hashedPassword = user.password; // If no new password, keep the existing one
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // Hash new password if provided
    }

    const updatedUser = await prisma.user.update({
      where: { id },
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
        bmi: bmi ?? user.bmi,
        healthConditions: healthConditions
          ? JSON.parse(healthConditions)
          : user.healthConditions,
        level: level || user.level,
        goal: goal || user.goal,
        status: status || user.status,
        freezeDate: freezeDate ? new Date(freezeDate) : user.freezeDate,
        serviceId: serviceId || user.serviceId,
        profileImageUrl,
        password: hashedPassword, // Save the hashed password
      },
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  }),
];

// Delete a user by ID
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  if (user.profileImageUrl) {
    fs.unlink(path.join(__dirname, `../../${user.profileImageUrl}`), (err) => {
      if (err) {
        console.log("Error deleting file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }

  await prisma.user.delete({ where: { id } });
  res
    .status(200)
    .json({ success: true, message: "User deleted successfully." });
});

module.exports = { getUsers, addUser, editUser, deleteUser };

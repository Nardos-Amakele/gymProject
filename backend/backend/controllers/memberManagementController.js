const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");
const bwipjs = require("bwip-js");

// Helper function to calculate days between two dates
const calculateDaysBetween = (date1, date2) =>
  Math.ceil((date2 - date1) / (1000 * 3600 * 24));

// Helper function to adjust start date for frozen duration
const adjustStartDateForFreeze = (startDate, freezeDate) => {
  if (!freezeDate) return startDate;
  const frozenDuration = calculateDaysBetween(new Date(freezeDate), new Date());
  const adjustedStartDate = new Date(startDate);
  adjustedStartDate.setDate(adjustedStartDate.getDate() + frozenDuration);
  return adjustedStartDate;
};

// Helper function to calculate countdown
const calculateCountdown = (expirationDate, remainingDays) => {
  const today = new Date();
  const daysUntilExpiration = calculateDaysBetween(today, expirationDate);
  return Math.min(daysUntilExpiration, remainingDays);
};

// Fetch user with attendance, service, and profile picture details
const fetchUserWithDetails = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required to fetch user details.");
  }
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      attendance: true,
      service: {
        select: {
          name: true,
          period: true,
          maxDays: true,
        },
      },
    },
  });
};

// Generate barcode
const generateBarcode = async (userId) => {
  try {
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: userId,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });
    return `data:image/png;base64,${barcodeBuffer.toString("base64")}`;
  } catch (error) {
    console.error("Barcode generation error:", error);
    throw new Error("Failed to generate barcode");
  }
};

// Get user profile with attendance details, countdown, profile picture, and status check
const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await fetchUserWithDetails(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (!user.service) {
    return res.status(404).json({
      success: false,
      message: "User is not subscribed to any service",
    });
  }

  const { startDate, service, FreezeDate, profilePicture } = user;
  const expirationDate = new Date(startDate);
  expirationDate.setDate(expirationDate.getDate() + service.period);
  const adjustedStartDate = adjustStartDateForFreeze(startDate, FreezeDate);

  const attendanceCountSinceStart = await prisma.attendance.count({
    where: { memberId: id, date: { gte: adjustedStartDate } },
  });
  const countdown = calculateCountdown(
    expirationDate,
    service.maxDays,
    attendanceCountSinceStart
  );

  // Update countdown and auto-deactivate status if countdown is below zero
  await prisma.user.update({
    where: { id: id },
    data: {
      countDown: countdown,
      ...(countdown < 0 && { status: "inactive" }),
    },
  });

  // Generate barcode
  const barcode = await generateBarcode(id);
  const bmi = user.bmi || (user.weight / (user.height / 100) ** 2).toFixed(1);

  res.status(200).json({
    success: true,
    data: { ...user, bmi, barcode, profilePicture },
  });
});

// Record attendance for a user and update countdown
const recordAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existingAttendance = await prisma.attendance.findFirst({
    where: { memberId: id, date: today },
  });
  if (existingAttendance) {
    return res.status(400).json({
      success: false,
      message: "Attendance already recorded for today",
    });
  }

  const user = await fetchUserWithDetails(id);
  if (!user || user.status !== "active") {
    return res.status(400).json({
      success: false,
      message: "User not active or service not found",
    });
  }

  // Check if remainingDays is above zero
  if (calculateCountdown(user.expirationDate, user.remainingDays) <= 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { status: "inactive" },
    });
    return res.status(400).json({
      success: false,
      message: "User's membership has expired.",
    });
  }
  // Record attendance and decrement remainingDays
  await prisma.attendance.create({ data: { memberId: id, date: today } });
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      totalAttendance: { increment: 1 },
      remainingDays: { decrement: 1 },
    },
  });

  res.status(201).json({
    success: true,
    message: "Attendance recorded successfully",
    data: {
      totalAttendance: updatedUser.totalAttendance,
      remainingDays: updatedUser.remainingDays,
    },
  });
});

// Admin updates user's status with freezing/unfreezing support
const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, startDate } = req.body;

  if (!["active", "inactive", "freeze", "pending"].includes(status)) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      startDate: true,
      freezeDate: true,
      countDown: true,
      service: { select: { maxDays: true } },
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const data = { status };

  if (status === "active" && startDate) {
    // Activating user with a provided start date: reset countdown to maxDays
    const parsedStartDate = new Date(startDate);
    if (isNaN(parsedStartDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid start date" });
    }
    data.startDate = parsedStartDate;
    data.freezeDate = null;
    data.countDown = user.service.maxDays;
  } else if (status === "active" && !startDate) {
    // Unfreezing the user: just remove freezeDate, keep remaining countdown
    if (!user.freezeDate) {
      return res
        .status(400)
        .json({ success: false, message: "User is not currently frozen" });
    }

    // Adjust startDate by frozen duration without resetting countDown
    data.startDate = adjustStartDateForFreeze(user.startDate, user.freezeDate);
    data.freezeDate = null;
  } else if (status === "freeze") {
    // Freezing user: record the freeze date
    data.freezeDate = new Date();
  }

  // Update the user status in the database
  const updatedUser = await prisma.user.update({
    where: { id: id },
    data,
  });

  res.status(200).json({
    success: true,
    message: `User status updated to ${status}`,
    data: updatedUser,
  });
});

module.exports = { getUserProfile, recordAttendance, updateUserStatus };

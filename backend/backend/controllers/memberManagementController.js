const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Helper function to calculate days between two dates
const calculateDaysBetween = (date1, date2) =>
  Math.ceil((date2 - date1) / (1000 * 3600 * 24));

// Helper function to adjust start date for frozen duration
const adjustStartDateForFreeze = (preFreezeDaysCount) => {
  const adjustedStartDate = new Date();
  adjustedStartDate.setDate(adjustedStartDate.getDate() - preFreezeDaysCount);
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

  const { startDate, service, preFreezeAttendance, preFreezeDaysCount } = user;
  const expirationDate = new Date(startDate);
  expirationDate.setDate(expirationDate.getDate() + service.period);
  const adjustedStartDate = adjustStartDateForFreeze(preFreezeDaysCount);

  const attendanceCountSinceStart = await prisma.attendance.count({
    where: { memberId: id, date: { gte: adjustedStartDate } },
  });

  const remainingDays =
    service.maxDays - attendanceCountSinceStart - preFreezeAttendance;

  const countdown = calculateCountdown(expirationDate, remainingDays);

  // Update countdown and auto-deactivate status if countdown is below zero
  await prisma.user.update({
    where: { id: id },
    data: {
      daysLeft: countdown,
      ...(countdown < 0 && { status: "inactive" }),
    },
  });

  res.status(200).json({
    success: true,
    data: { user },
  });
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, startDate } = req.body;

  // Validate status
  if (
    !["active", "inactive", "frozen", "pending", "unfreeze"].includes(status)
  ) {
    return res.status(400).json({ success: false, message: "Invalid status" });
  }

  // Fetch user with relevant fields
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      startDate: true,
      freezeDate: true,
      preFreezeAttendance: true,
      preFreezeDaysCount: true,
    },
  });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // Initialize update data
  const updateData = { status };

  if (status === "active") {
    const parsedStartDate = startDate ? new Date(startDate) : new Date();
    if (isNaN(parsedStartDate.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid start date" });
    }

    updateData.startDate = parsedStartDate;
    updateData.freezeDate = null;
    updateData.preFreezeAttendance = 0;
    updateData.preFreezeDaysCount = 0;
  } else if (status === "unfreeze") {
    if (!user.freezeDate) {
      return res
        .status(400)
        .json({ success: false, message: "User is not currently frozen" });
    }

    // Adjust startDate by frozen duration using the calculateDaysBetween function
    updateData.startDate = adjustStartDateForFreeze(user.preFreezeDaysCount);
    updateData.freezeDate = null;
    updateData.status = "active";
  } else if (status === "frozen") {
    const attendanceCountSinceStart = await prisma.attendance.count({
      where: { memberId: id, date: { gte: user.startDate } },
    });

    // Use the calculateDaysBetween function to calculate the days since the startDate
    const daysSinceStart = calculateDaysBetween(user.startDate, new Date());

    updateData.freezeDate = new Date();
    updateData.preFreezeAttendance = attendanceCountSinceStart;
    updateData.preFreezeDaysCount = daysSinceStart;
  }

  // Update user
  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  res.status(200).json({
    success: true,
    message: `User status updated successfully`,
    data: updatedUser,
  });
});

module.exports = { getUserProfile, updateUserStatus };

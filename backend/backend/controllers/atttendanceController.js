const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Helper function to calculate days between two dates
const calculateDaysBetween = (date1, date2) =>
  Math.ceil((date2 - date1) / (1000 * 3600 * 24));

// Helper function to calculate countdown
const calculateCountdown = (expirationDate, remainingDays) => {
  const today = new Date();
  const daysUntilExpiration = calculateDaysBetween(today, expirationDate);
  return Math.min(daysUntilExpiration, remainingDays);
};

// Fetch user with attendance, service

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

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User  not found",
    });
  }
  if (user.status == "frozen") {
    return res.status(400).json({
      success: false,
      message: "User is on Freeze!",
    });
  }
  if (user.status == "inactive") {
    return res.status(400).json({
      success: false,
      message: "User is not active!",
    });
  }
  if (user.status == "pending") {
    return res.status(400).json({
      success: false,
      message: "User is not approved!",
    });
  }
  const { startDate, service, preFreezeAttendance } = user;
  const expirationDate = new Date(startDate);
  expirationDate.setDate(expirationDate.getDate() + service.period);

  const attendanceCountSinceStart = await prisma.attendance.count({
    where: { memberId: id, date: { gte: startDate } },
  });

  const remainingDays =
    service.maxDays - attendanceCountSinceStart - preFreezeAttendance;
  const daysLeft = calculateCountdown(expirationDate, remainingDays);

  // Check if remainingDays is above - three

  if (daysLeft <= -3) {
    await prisma.user.update({
      where: { id: user.id },
      data: { status: "inactive" },
    });

    return res.status(400).json({
      success: false,
      message: "User is inactive!",
    });
  }

  // Check if remainingDays is above zero
  else if (daysLeft <= 0) {
    await prisma.user.update({
      where: { id: user.id },
      data: { status: "expired" },
    });
  }

  // Record attendance and decrement remainingDays
  await prisma.attendance.create({ data: { memberId: id, date: today } });

  // Recalculate remainingDays and daysLeft after attendance
  const newRemainingDays = remainingDays - 1;
  const daysLeftAfter = calculateCountdown(expirationDate, newRemainingDays);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      totalAttendance: { increment: 1 },
      daysLeft: daysLeftAfter,
    },
  });

  res.status(201).json({
    success: true,
    message: "Attendance recorded successfully",
    data: {
      totalAttendance: updatedUser.totalAttendance,
      daysLeft: updatedUser.daysLeft,
    },
  });
});

module.exports = { recordAttendance };

const express = require("express");
const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Helper function for card data (total members, employees, and new members)
const getCardData = asyncHandler(async (req, res) => {
  const totalMembersCount = await prisma.user.count();
  const totalEmployeesCount = await prisma.employee.count();
  const newMembersCount = await prisma.user.count({
    where: {
      status: "pending",
    },
  });

  res.json({
    totalMembers: totalMembersCount,
    totalEmployees: totalEmployeesCount,
    newMembers: newMembersCount,
  });
});

// Helper function for pie chart data (members by category)
const getPieChartData = asyncHandler(async (req, res) => {
  const targetCategories = [
    "Body Building",
    "Group Aerobics",
    "Exercise",
    "Personal Training",
  ];

  const membershipCounts = await prisma.user.groupBy({
    by: ["serviceId"],
    _count: {
      id: true,
    },
    where: {
      service: {
        category: { in: targetCategories },
      },
    },
    include: {
      service: {
        select: {
          category: true,
        },
      },
    },
  });

  const categorizedMembers = membershipCounts.map((type) => ({
    category: type.service?.category || "Unknown",
    count: type._count.id,
  }));

  res.json(categorizedMembers);
});

// Helper function for pending members data
const getPendingMembers = asyncHandler(async (req, res) => {
  const pendingMembers = await prisma.user.findMany({
    where: { status: "pending" },
    select: {
      fullName: true,
      phoneNumber: true,
      service: {
        select: {
          name: true,
        },
      },
    },
  });

  res.json(pendingMembers);
});

// Helper function for attendance data with dynamic period (7 days, 15 days, or 30 days)
const getAttendanceData = asyncHandler(async (req, res) => {
  const { period } = req.query; // e.g., '7days', '15days', or 'month'
  let days = 7; // default to last 7 days

  if (period === "15days") {
    days = 15;
  } else if (period === "month") {
    days = 30;
  }

  const startDate = new Date(new Date().setDate(new Date().getDate() - days));

  const attendanceData = await prisma.attendance.groupBy({
    by: ["date"],
    _count: {
      id: true,
    },
    where: {
      date: {
        gte: startDate,
      },
    },
  });

  const formattedAttendanceData = attendanceData.map((day) => ({
    date: day.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    count: day._count.id,
  }));

  res.json(formattedAttendanceData);
});

// Export all helper functions
module.exports = {
  getCardData,
  getPieChartData,
  getPendingMembers,
  getAttendanceData,
};

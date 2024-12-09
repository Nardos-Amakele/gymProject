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
    success: true,
    data: {
      totalMembers: totalMembersCount,
      totalEmployees: totalEmployeesCount,
      newMembers: newMembersCount,
    },
  });
});

// Helper function for pending members data
const getPendingMembers = asyncHandler(async (req, res) => {
  const pendingMembers = await prisma.user.findMany({
    where: { status: "pending" },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      phoneNumber: true,
      service: {
        select: {
          name: true,
        },
      },
      status: true,
    },
  });

  res.json({ success: true, data: pendingMembers });
});

const getPieChartData = asyncHandler(async (req, res) => {
  // Fetch all service categories
  const allCategories = await prisma.service.findMany({
    select: {
      category: true, // Only fetch category names
    },
    distinct: ["category"], // Ensure no duplicate categories
  });

  // Fetch user counts grouped by service category
  const categoryBreakdown = await prisma.user.groupBy({
    by: ["serviceId"],
    _count: {
      id: true, // Count users for each service
    },
    where: {
      service: {
        isNot: null, // Ensure the user has a valid service
      },
    },
  });

  // Fetch all services with their categories and IDs
  const services = await prisma.service.findMany({
    select: {
      id: true,
      category: true,
    },
  });

  // Map service IDs to categories and aggregate user counts
  const categoryCounts = services.reduce((acc, service) => {
    const serviceGroup = categoryBreakdown.find(
      (group) => group.serviceId === service.id
    );
    acc[service.category] =
      (acc[service.category] || 0) + (serviceGroup?._count.id || 0);
    return acc;
  }, {});

  // Include categories with zero counts
  const finalCounts = allCategories.reduce((acc, category) => {
    acc[category.category] = categoryCounts[category.category] || 0;
    return acc;
  }, {});

  // Format response
  const breakdown = Object.entries(finalCounts).map(
    ([category, memberCount]) => ({
      category,
      memberCount,
    })
  );

  res.status(200).json({
    success: true,
    data: {
      breakdown,
    },
  });
});

const getAttendanceData = asyncHandler(async (req, res) => {
  const today = new Date();

  // Weekly range (last 7 days)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - 6);

  // Monthly range (last 30 days)
  const monthStart = new Date(today);
  monthStart.setDate(today.getDate() - 29);

  // Last 12 months range
  const yearStart = new Date(today);
  yearStart.setMonth(today.getMonth() - 11); // Start 12 months ago

  // Weekly attendance (last 7 days)
  const weeklyAttendance = await prisma.attendance.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: weekStart,
        lte: today,
      },
    },
    _count: {
      id: true,
    },
  });

  // Monthly attendance (last 30 days)
  const monthlyAttendance = await prisma.attendance.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: monthStart,
        lte: today,
      },
    },
    _count: {
      id: true,
    },
  });

  // Yearly attendance (last 12 months)
  const yearlyAttendance = await prisma.attendance.groupBy({
    by: ["date"],
    where: {
      date: {
        gte: yearStart,
        lte: today,
      },
    },
    _count: {
      id: true,
    },
  });

  // Generate weekly data (fill missing days with zero counts)
  const weeklyData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const found = weeklyAttendance.find(
      (entry) =>
        entry.date.toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
    return {
      date: date.toISOString().split("T")[0],
      count: found ? found._count.id : 0,
    };
  });

  // Generate monthly data (fill missing days with zero counts)
  const monthlyData = Array.from({ length: 30 }).map((_, i) => {
    const date = new Date(monthStart);
    date.setDate(monthStart.getDate() + i);
    const found = monthlyAttendance.find(
      (entry) =>
        entry.date.toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
    return {
      date: date.toISOString().split("T")[0],
      count: found ? found._count.id : 0,
    };
  });

  // Generate yearly data (last 12 months)
  const yearlyData = Array.from({ length: 12 }).map((_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - 11 + i, 1); // Last 12 months
    const found = yearlyAttendance.find((entry) => {
      const recordDate = new Date(entry.date);
      return (
        recordDate.getFullYear() === date.getFullYear() &&
        recordDate.getMonth() === date.getMonth()
      );
    });
    return {
      month: date.toLocaleString("default", { month: "short" }), // E.g., "Jan", "Feb"
      count: found ? found._count.id : 0,
    };
  });

  res.status(200).json({
    success: true,
    data: {
      weekly: weeklyData,
      monthly: monthlyData,
      yearly: yearlyData,
    },
  });
});
// Export all helper functions
module.exports = {
  getCardData,
  getPieChartData,
  getPendingMembers,
  getAttendanceData,
};

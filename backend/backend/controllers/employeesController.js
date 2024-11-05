const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Get all employees
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await prisma.employee.findMany();

  res.status(200).json({
    success: true,
    data: employees,
  });
});

// Add a new employee
const registerEmployee = asyncHandler(async (req, res) => {
  const { name, phone, startDate, jobType } = req.body;

  // Validation for required fields
  if (!name || !phone || !startDate || !jobType) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, phone, startDate, jobType) are required.",
    });
  }

  // Validation for phone number length and format
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be exactly 10 digits.",
    });
  }

  // Create the new employee
  const newEmployee = await prisma.employee.create({
    data: {
      name,
      phone,
      startDate,
      jobType,
    },
  });

  res.status(201).json({
    success: true,
    message: "Employee added successfully.",
    data: newEmployee,
  });
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, phone, startDate, jobType } = req.body;

  // Check if the employee ID is provided
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Employee ID is required.",
    });
  }

  // Validation for phone number length and format (if provided)
  if (phone && !/^\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be exactly 10 digits.",
    });
  }

  // Find the employee to ensure it exists before updating
  const employee = await prisma.employee.findUnique({
    where: { id },
  });

  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found.",
    });
  }

  // Update the employee with the provided fields
  const updatedEmployee = await prisma.employee.update({
    where: { id },
    data: {
      name: name || employee.name,
      phone: phone || employee.phone,
      startDate: startDate || employee.startDate,
      jobType: jobType || employee.jobType,
    },
  });

  res.status(200).json({
    success: true,
    message: "Employee updated successfully.",
    data: updatedEmployee,
  });
});

// Delete an employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
  console.log(Number(req.params.id));
  const { id } = req.params;

  // Check if the employee exists
  const employee = await prisma.employee.findUnique({
    where: { id },
  });
  if (!employee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found.",
    });
  }

  // Delete the employee
  await prisma.employee.delete({ where: { id: bid } });

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully.",
  });
});

module.exports = {
  getEmployees,
  registerEmployee,
  deleteEmployee,
  updateEmployee,
};

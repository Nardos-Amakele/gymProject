const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Get all services
const getServices = asyncHandler(async (req, res) => {
  const services = await prisma.service.findMany();

  res.status(200).json({
    success: true,
    data: services,
  });
});

const addMultipleServices = asyncHandler(async (req, res) => {
  const { services } = req.body;

  // Ensure services array is provided
  if (!Array.isArray(services) || services.length === 0) {
    return res.status(400).json({
      success: false,
      message: "An array of services is required.",
    });
  }

  // Validate each service
  for (const service of services) {
    const { name, period, maxDays, price, category, description } = service;
    if (
      !name ||
      period == null ||
      maxDays == null ||
      !price ||
      !category ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Each service must have all fields (name, period, maxDays, price, category, description).",
      });
    }
  }

  // Create multiple services
  const addedServices = await prisma.service.createMany({
    data: services.map((service) => ({
      name: service.name,
      period: service.period,
      maxDays: service.maxDays,
      price: parseFloat(service.price), // Ensure price is a float
      category: service.category,
      description: service.description,
      preferred: service.preferred || false,
    })),
  });

  res.status(201).json({
    success: true,
    message: `${addedServices.count} services added successfully.`,
  });
});

// Add a new service
const addService = asyncHandler(async (req, res) => {
  const { name, period, maxDays, price, category, description, preferred } =
    req.body;

  // Validation for required fields
  if (
    !name ||
    period == null ||
    maxDays == null ||
    !price ||
    !category ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (name, period, maxDays, price, category, description) are required.",
    });
  }

  // Create the new service
  const newService = await prisma.service.create({
    data: {
      name,
      period,
      maxDays,
      price,
      category,
      description,
      preferred: preferred || false,
    },
  });

  res.status(201).json({
    success: true,
    message: "Service added successfully.",
    data: newService,
  });
});

// Edit a service by ID
const editService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, period, maxDays, price, category, description, preferred } =
    req.body;

  // Validation for required fields
  if (
    !name ||
    period == null ||
    maxDays == null ||
    !price ||
    !category ||
    !description
  ) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (name, period, maxDays, price, category, description) are required.",
    });
  }

  // Update the service
  const updatedService = await prisma.service.update({
    where: { id },
    data: {
      name,
      period,
      maxDays,
      price,
      category,
      description,
      preferred: preferred || false,
    },
  });

  res.status(200).json({
    success: true,
    message: "Service updated successfully.",
    data: updatedService,
  });
});

// Delete a service by ID
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the service exists
  const service = await prisma.service.findUnique({
    where: { id },
  });
  if (!service) {
    return res.status(404).json({
      success: false,
      message: "Service not found.",
    });
  }

  // Delete the service
  await prisma.service.delete({ where: { id } });

  res.status(200).json({
    success: true,
    message: "Service deleted successfully.",
  });
});

module.exports = {
  getServices,
  addMultipleServices,

  addService,
  editService,
  deleteService,
};

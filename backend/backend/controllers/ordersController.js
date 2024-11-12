const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Get all orders with aggregated quantities for the dashboard
const getOrders = asyncHandler(async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      product: true, // Include product details in each order
    },
  });

  // Calculate aggregated quantities and other stats
  const totalOrders = orders.length;
  const totalSales = orders.reduce(
    (sum, order) => sum + order.quantity * order.product.price,
    0
  );
  const totalDelivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;
  const totalPending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  res.status(200).json({
    success: true,
    data: {
      totalSales,
      totalOrders,
      totalDelivered,
      totalPending,
      orders, // Detailed list of orders
    },
  });
});

// Add a new order
const addOrder = asyncHandler(async (req, res) => {
  const { customerName, phoneNumber, productId, quantity, status } = req.body;

  // Validation for required fields
  if (!customerName || !phoneNumber || !productId || !quantity || !status) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (customerName, phoneNumber, productId, quantity, status) are required.",
    });
  }

  // Validation for phone number format
  if (!/^\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be exactly 10 digits.",
    });
  }

  // Check if the product exists and has enough stock
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  // Create the new order
  const newOrder = await prisma.order.create({
    data: {
      customerName,
      phoneNumber,
      productId,
      quantity,
      status,
    },
  });

  res.status(201).json({
    success: true,
    message: "Order added successfully.",
    data: newOrder,
  });
});

// Toggle the status of an order between "Delivered" and "Pending"
const toggleOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the order
  const order = await prisma.order.findUnique({
    where: { id },
  });
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  // Toggle status
  const newStatus = order.status === "Delivered" ? "Pending" : "Delivered";

  // Update the order status
  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status: newStatus },
  });

  res.status(200).json({
    success: true,
    message: `Order status updated to ${newStatus}.`,
    data: updatedOrder,
  });
});

// Delete an order by ID
const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the order exists
  const order = await prisma.order.findUnique({
    where: { id },
  });
  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found.",
    });
  }

  // Delete the order
  await prisma.order.delete({ where: { id } });

  res.status(200).json({
    success: true,
    message: "Order deleted successfully.",
  });
});

module.exports = {
  getOrders,
  addOrder,
  toggleOrderStatus, // Export the toggle function
  deleteOrder,
};

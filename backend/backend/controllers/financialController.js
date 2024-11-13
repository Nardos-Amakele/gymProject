const asyncHandler = require("express-async-handler");
const prisma = require("../../prisma/client");

// Get all financial transactions
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await prisma.transaction.findMany();

  // Calculate income, expenses, and net balance
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const net = income - expense;

  res.status(200).json({
    success: true,
    data: {
      transactions,
      summary: {
        income,
        expense,
        net,
      },
    },
  });
});

// Add a new transaction
const addTransaction = asyncHandler(async (req, res) => {
  const { name, category, amount, type } = req.body;

  // Validate required fields
  if (!name || !category || amount == null || !type) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, category, amount, type) are required.",
    });
  }

  // Validate amount and type
  if (isNaN(amount) || amount < 0 || !["Income", "Expense"].includes(type)) {
    return res.status(400).json({
      success: false,
      message:
        "Amount must be a non-negative number, and type must be Income or Expense.",
    });
  }

  const newTransaction = await prisma.transaction.create({
    data: {
      name,
      category,
      amount: parseFloat(amount),
      type,
    },
  });

  res.status(201).json({
    success: true,
    message: "Transaction added successfully.",
    data: newTransaction,
  });
});

// Delete a transaction by ID
const deleteTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await prisma.transaction.delete({
    where: { id },
  });

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully.",
  });
});

// Update a transaction by ID
const updateTransaction = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, amount, type } = req.body;

  if (!name || !category || amount == null || !type) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, category, amount, type) are required.",
    });
  }

  if (isNaN(amount) || amount < 0 || !["Income", "Expense"].includes(type)) {
    return res.status(400).json({
      success: false,
      message:
        "Amount must be a non-negative number, and type must be Income or Expense.",
    });
  }

  const updatedTransaction = await prisma.transaction.update({
    where: { id },
    data: {
      name,
      category,
      amount: parseFloat(amount),
      type,
    },
  });

  res.status(200).json({
    success: true,
    message: "Transaction updated successfully.",
    data: updatedTransaction,
  });
});

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
};

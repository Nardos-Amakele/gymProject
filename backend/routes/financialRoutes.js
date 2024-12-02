const express = require("express");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  // getTransactionDataForGraph,
} = require("../controllers/financialController");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", addTransaction);

router.delete("/:id", deleteTransaction);

// router.get("/transactions/graph-data", getTransactionDataForGraph);

module.exports = router;

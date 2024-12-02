const express = require("express");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/financialController");

const router = express.Router();

router.get("/", getTransactions);

router.post("/", addTransaction);
router.patch("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

// router.get("/transactions/graph-data", getTransactionDataForGraph);

module.exports = router;

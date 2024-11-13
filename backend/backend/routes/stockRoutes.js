const express = require("express");
const {
  getStockItems,
  addStockItem,
  deleteStockItem,
  increaseQuantity,
  decreaseQuantity,
} = require("../controllers/stockController");

const router = express.Router();

router.get("/", getStockItems);

router.post("/", addStockItem);

router.delete("/:id", deleteStockItem);

router.patch("/:id/increaseQuantity", increaseQuantity);

router.patch("/:id/decreaseQuantity", decreaseQuantity);

module.exports = router;

const express = require("express");
const {
  getOrders,
  addOrder,
  toggleOrderStatus,
  deleteOrder,
} = require("../controllers/ordersController");

const router = express.Router();

router.get("/", getOrders);
router.post("/", addOrder);
router.patch("/:id/toggleStatus", toggleOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserStatus,
} = require("../controllers/memberManagementController");

router.get("/:id/profile", getUserProfile);
router.put("/:id/status", updateUserStatus);

module.exports = router;

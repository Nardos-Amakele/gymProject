const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  recordAttendance,
  updateUserStatus,
} = require("../controllers/memberManagementController");

router.get("/:id/profile", getUserProfile);
router.post("/:id/attendance", recordAttendance);
router.patch("/:id/status", updateUserStatus);

module.exports = router;

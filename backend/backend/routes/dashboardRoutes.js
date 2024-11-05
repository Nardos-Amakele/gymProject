const express = require("express");
const {
  getCardData,
  getPieChartData,
  getPendingMembers,
  getAttendanceData,
} = require("../controllers/dashboardController"); // Update with the correct path to your controller file

const router = express.Router();

router.get("/cardData", getCardData);
router.get("/pieChartData", getPieChartData);
router.get("/pendingMembers", getPendingMembers);
router.get("/attendanceData", getAttendanceData);

module.exports = router;

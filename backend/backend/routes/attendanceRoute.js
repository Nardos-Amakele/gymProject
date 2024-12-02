const express = require("express");
const router = express.Router();
const { recordAttendance } = require("../controllers/atttendanceController");

router.post("/:id", recordAttendance);

module.exports = router;

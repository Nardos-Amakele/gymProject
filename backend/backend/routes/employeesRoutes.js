const express = require("express");
const router = express.Router();
const {
  getEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeesController");

router.get("/", getEmployees);
router.post("/register", registerEmployee);
router.route("/:id").delete(deleteEmployee).patch(updateEmployee);

module.exports = router;

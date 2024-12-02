const express = require("express");
const router = express.Router();
const {
  getServices,
  addService,
  editService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);

router.post("/", addService);

router.patch("/:id", editService);

router.delete("/:id", deleteService);

module.exports = router;

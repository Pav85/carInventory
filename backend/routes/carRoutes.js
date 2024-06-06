const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.post("/", carController.addCar);
router.put("/:id", carController.updateCar);
router.put("/", carController.updateMultipleCars);
router.delete("/:id", carController.deleteCar);
router.get("/", carController.getAllCars);
router.get("/old", carController.getOldCars);

module.exports = router;

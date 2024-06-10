const express = require("express"); // import express module
const router = express.Router(); // import router from express module
const carController = require("../controllers/carController"); // import car controller

router.post("/", carController.addCar); // add car route
router.put("/:id", carController.updateCar); // update car route
// router.put("/", carController.updateMultipleCars); // update multiple cars route in the future development
router.delete("/:id", carController.deleteCar); // delete car route
router.get("/", carController.getAllCars); // get all cars route
router.get("/old", carController.getOldCars); // get old cars route

module.exports = router;

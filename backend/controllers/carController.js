const Car = require("../models/car");

exports.addCar = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.error("Error adding car:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMultipleCars = async (req, res) => {
  // there will be a logic here to update multiple cars in the future development
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const { carId } = req.query;
    let cars;
    if (carId) {
      cars = await Car.find({ carId: carId });
    } else {
      cars = await Car.find();
    }
    res.status(200).json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getOldCars = async (req, res) => {
  try {
    const yearLimit = new Date().getFullYear() - 5;
    const cars = await Car.find({ year: { $lt: yearLimit } }).select(
      "model make registrationNumber currentOwner"
    );
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

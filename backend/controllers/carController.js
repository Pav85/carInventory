const Car = require("../models/car"); // import Car model

// controller function to add a car
exports.addCar = async (req, res) => {
  try {
    console.log("Request body:", req.body); // log request body to the console
    const car = new Car(req.body); // create a new Car instance from the request body
    await car.save(); // save the car to the database
    res.status(201).json(car); // return the saved car as a response and status code 201
  } catch (error) {
    console.error("Error adding car:", error.message); // log error to the console
    res.status(400).json({ message: error.message }); // return error message as a response
  }
};

// controller function to update a car
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // update the car in the database with the updated request body
    res.status(200).json(car); // return the updated car as a response and status code 200
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// controller function to update multiple cars in the future development
exports.updateMultipleCars = async (req, res) => {
  // there will be a logic here to update multiple cars in the future development
};

// controller function to delete a car
exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id); // delete the car from the database with the given id
    res.status(200).json({ message: "Car deleted" }); // return success message as a response and status code 200
  } catch (error) {
    res.status(400).json({ message: error.message }); // return error message as a response and status code 400
  }
};

// controller function to get all cars
exports.getAllCars = async (req, res) => {
  try {
    const { carId } = req.query; // get carId from the query string
    let cars;
    if (carId) {
      cars = await Car.find({ carId: carId }); // find the car with the given carId
    } else {
      cars = await Car.find(); // find all the cars in the database
    }
    res.status(200).json(cars); // return all the cars as a response and status code 200
  } catch (error) {
    console.error("Error fetching cars:", error.message); // log error to the console
    res.status(400).json({ message: error.message }); // return error message as a response and status code 400
  }
};

// controller function to get old cars
exports.getOldCars = async (req, res) => {
  try {
    const yearLimit = new Date().getFullYear() - 5; // calculate the year limit
    const cars = await Car.find({ year: { $lt: yearLimit } }).select(
      "model make registrationNumber currentOwner"
    ); // find cars that are older than 5 years
    res.status(200).json(cars); // return the old cars as a response and status code 200
  } catch (error) {
    res.status(400).json({ message: error.message }); // return error message as a response and status code 400
  }
};

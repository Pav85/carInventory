const Car = require("./models/Car");

exports.addCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(car);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.multiUpdateCar = async (req, res) => {
  try {
    const updateCars = req.body;
    const cars = await Promise.all(
      updateCars.map((car) =>
        Car.findByIdAndUpdate(updateCars.id, updateCars.data, { new: true })
      )
    );
    res.status(200).json(cars);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCars = async (req, res) => {
  console.log(req.query);
};

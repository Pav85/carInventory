const mongoose = require("mongoose"); // import mongoose module
const shortid = require("shortid"); // import shortid module

const carSchema = new mongoose.Schema({
  carId: { type: String, unique: true, default: shortid.generate }, // generate a unique carId for each car
  make: { type: String, required: true },
  model: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  currentOwner: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("Car", carSchema); // export Car model

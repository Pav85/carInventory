const mongoose = require("mongoose");
const shortid = require("shortid");

const carSchema = new mongoose.Schema({
  carId: { type: String, unique: true, default: shortid.generate },
  make: { type: String, required: true },
  model: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  currentOwner: { type: String, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("Car", carSchema);

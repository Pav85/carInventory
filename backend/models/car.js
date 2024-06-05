const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: { type: String, required: true },
  make: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  currentOwner: { type: String, required: true },
});

module.exports = mongoose.model("Car", carSchema);

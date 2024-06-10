// Imports
const express = require("express"); // import express module
const mongoose = require("mongoose"); // import mongoose to connect to MongoDB database
const bodyParser = require("body-parser"); // import body parser to parse incoming request bodies
const cors = require("cors");
require("dotenv").config(); // load environment variables from.env file

const carRoutes = require("./routes/carRoutes"); // import car routes

const app = express(); // initialize express app
const port = process.env.PORT || 5000; // define port to listen on

app.use(bodyParser.json()); // parse incoming request bodies as JSON
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // enable CORS to allow cross-origin requests from the frontend

// connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// middleware to log requests to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

connectDB(); // connect to MongoDB database

app.use("/api/cars", carRoutes); // mount car routes at /api/cars

// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

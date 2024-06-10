import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "./App.css";
import { capitaliseFirstLetter } from "./utils/Capitalise"; // Import capitaliseFirstLetter function

// Function to fetch all cars from the API by its short ID
const fetchCarByShortId = async (carId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/cars?carId=${carId}`
    );
    if (response.data && response.data.length > 0) {
      return response.data[0]; // Return the first car from the response
    } else {
      throw new Error("Car not found");
    }
  } catch (error) {
    console.error("Error fetching car by short ID:", error); // Log error to the console
    return null;
  }
};

function App() {
  // state variables to manage car data and form data
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
    year: 0,
  });
  const [updateCar, setUpdateCar] = useState({
    carId: "",
    _id: "",
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
    year: 0,
  });
  const [showOldCars, setShowOldCars] = useState(false);

  // fetch cars from the server when the component mounts
  useEffect(() => {
    fetchCars();
  }, []);

  // function to fetch all cars from the server
  const fetchCars = async () => {
    try {
      console.log("Fetching cars from the server...");
      const response = await axios.get("http://localhost:5000/api/cars");
      console.log("Response data:", response.data);
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // function to fetch old cars from the server
  const fetchOldCars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cars/old");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching old cars:", error);
    }
  };

  // toggle cars view to show old cars or all cars
  const toggleCarsView = () => {
    if (showOldCars) {
      fetchCars();
    } else {
      fetchOldCars();
    }
    setShowOldCars(!showOldCars);
  };

  // function to add a new car
  const addCar = async () => {
    try {
      await axios.post("http://localhost:5000/api/cars", newCar);
      fetchCars();
      setNewCar({
        make: "",
        model: "",
        registrationNumber: "",
        currentOwner: "",
        year: 0,
      }); // Reset the new car form fields
    } catch (error) {
      console.error("Error adding car:", error); // Log error to the console
    }
  };

  //  function to update an existing car
  const handleUpdateCar = async () => {
    if (!updateCar.carId) {
      console.error("Car ID is required to update a car"); // Log error to the console
      alert("Car ID is required to update a car"); // Show alert message
      return;
    }
    try {
      const carDetails = await fetchCarByShortId(updateCar.carId);
      if (carDetails) {
        const updatedFields = Object.fromEntries(
          Object.entries(updateCar).filter(
            ([key, value]) => value && key !== "carId"
          )
        );
        console.log("Updating car with data:", updatedFields); // Log updated fields to the console
        await axios.put(
          `http://localhost:5000/api/cars/${carDetails._id}`,
          updatedFields
        );
        fetchCars();
        setUpdateCar({
          carId: "",
          _id: "",
          make: "",
          model: "",
          registrationNumber: "",
          currentOwner: "",
          year: 0,
        }); // Reset the update car form fields
      } else {
        console.error("Car not found with the provided short ID");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // function to delete a car
  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cars/${id}`);
      fetchCars();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="mb-3">Car Inventory</h1>
      <div className="mb-8">
        {/* add car section */}
        <h2 className="font-semibold mb-2">Add Car</h2>
        {/* input fields for a new car */}
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Make"
          value={newCar.make}
          onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Model"
          value={newCar.model}
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Registration Number"
          value={newCar.registrationNumber}
          onChange={(e) =>
            setNewCar({ ...newCar, registrationNumber: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Current Owner"
          value={newCar.currentOwner}
          onChange={(e) =>
            setNewCar({ ...newCar, currentOwner: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="number"
          placeholder="Year"
          value={newCar.year}
          onChange={(e) =>
            setNewCar({ ...newCar, year: parseInt(e.target.value, 10) })
          }
        />
        {/* button to add a new car */}
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addCar}>
          Add Car
        </button>
      </div>
      <div className="mb-8">
        {/* update car section */}
        <h2 className="font-semibold mb-2">Update Car</h2>
        {/* input fields for an existing car update */}
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="ID"
          value={updateCar.carId}
          onChange={(e) =>
            setUpdateCar({ ...updateCar, carId: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Make"
          value={updateCar.make}
          onChange={(e) => setUpdateCar({ ...updateCar, make: e.target.value })}
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Model"
          value={updateCar.model}
          onChange={(e) =>
            setUpdateCar({ ...updateCar, model: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Registration Number"
          value={updateCar.registrationNumber}
          onChange={(e) =>
            setUpdateCar({
              ...updateCar,
              registrationNumber: e.target.value,
            })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="Current Owner"
          value={updateCar.currentOwner}
          onChange={(e) =>
            setUpdateCar({ ...updateCar, currentOwner: e.target.value })
          }
        />
        <input
          className="border p-2 mr-2 mb-2"
          type="number"
          placeholder="Year"
          value={updateCar.year}
          onChange={(e) =>
            setUpdateCar({ ...updateCar, year: parseInt(e.target.value, 10) })
          }
        />
        {/* button to update an existing car */}
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleUpdateCar}
        >
          Update Car
        </button>
      </div>
      {/* display cars section */}
      <h2 className="font-semibold mb-2">Cars</h2>
      {/* button to toggle all and old cars */}
      <button
        className="bg-gray-500 text-white p-2 rounded mb-4"
        onClick={toggleCarsView}
      >
        {showOldCars ? "Show All Cars" : "Show Cars Older Than 5 Years"}
      </button>
      {/* car container rendered dynamically */}
      <div className="cars-container">
        {cars.map((car) => (
          <div key={car._id} className="car-box">
            <strong className="mb-3">
              {capitaliseFirstLetter(car.make)}{" "}
              {capitaliseFirstLetter(car.model)}
            </strong>
            <hr />
            <div className="car-details mt-2">
              {car.carId && (
                <>
                  <strong>ID: </strong>
                  {car.carId}
                  <br />
                </>
              )}
              <strong>Reg: </strong>
              {car.registrationNumber}
              <br />
              <strong>Owner: </strong>
              {capitaliseFirstLetter(car.currentOwner)}
              <br />
              {car.year && (
                <>
                  <strong>Year: </strong>
                  {car.year}
                </>
              )}
            </div>
            <button
              className="bg-red-500 text-white p-2 rounded mt-3"
              onClick={() => handleDeleteCar(car._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

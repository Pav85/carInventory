import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
    year: 0,
  });

  useEffect(() => {
    fetchCars();
  }, []);

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
      });
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <div className="App">
      <h1>Car Inventory</h1>
      <input
        type="text"
        placeholder="Make"
        value={newCar.make}
        onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
      />
      <input
        type="text"
        placeholder="Model"
        value={newCar.model}
        onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
      />
      <input
        type="text"
        placeholder="Registration Number"
        value={newCar.registrationNumber}
        onChange={(e) =>
          setNewCar({ ...newCar, registrationNumber: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Current Owner"
        value={newCar.currentOwner}
        onChange={(e) => setNewCar({ ...newCar, currentOwner: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={newCar.year}
        onChange={(e) =>
          setNewCar({ ...newCar, year: parseInt(e.target.value, 10) })
        }
      />
      <button onClick={addCar}>Add Car</button>
      <h2>All Cars</h2>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            {car.make} {car.model} ({car.registrationNumber}) - Owner:{" "}
            {car.currentOwner} - Year: {car.year}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

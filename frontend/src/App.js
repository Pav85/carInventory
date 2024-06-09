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
  const [updateCar, setUpdateCar] = useState({
    _id: "",
    make: "",
    model: "",
    registrationNumber: "",
    currentOwner: "",
    year: 0,
  });
  const [showOldCars, setShowOldCars] = useState(false);

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

  const fetchOldCars = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cars/old");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching old cars:", error);
    }
  };

  const toggleCarsView = () => {
    if (showOldCars) {
      fetchCars();
    } else {
      fetchOldCars();
    }
    setShowOldCars(!showOldCars);
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

  const handleUpdateCar = async () => {
    try {
      const updatedFields = Object.fromEntries(
        Object.entries(updateCar).filter(([key, value]) => value)
      );
      await axios.put(
        `http://localhost:5000/api/cars/${updateCar._id}`,
        updatedFields
      );
      fetchCars();
      setUpdateCar({
        _id: "",
        make: "",
        model: "",
        registrationNumber: "",
        currentOwner: "",
        year: 0,
      });
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

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
      <h1 className="text-2xl font-bold mb-4">Car Inventory</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add Car</h2>
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
        <button className="bg-blue-500 text-white p-2 rounded" onClick={addCar}>
          Add Car
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Update Car</h2>
        <input
          className="border p-2 mr-2 mb-2"
          type="text"
          placeholder="ID"
          value={updateCar._id}
          onChange={(e) => setUpdateCar({ ...updateCar, _id: e.target.value })}
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
        <button
          className="bg-green-500 text-white p-2 rounded"
          onClick={handleUpdateCar}
        >
          Update Car
        </button>
      </div>
      <h2 className="text-xl font-semibold mb-2">All Cars</h2>
      <button
        className="bg-gray-500 text-white p-2 rounded mb-4"
        onClick={toggleCarsView}
      >
        {showOldCars ? "Show All Cars" : "Show Cars Older Than 5 Years"}
      </button>
      <ul>
        {cars.map((car) => (
          <li
            key={car._id}
            className="border p-2 mb-2 flex justify-between items-center"
          >
            <span>
              {car._id} {car.make} {car.model} {"RN: "}
              {car.registrationNumber} - Owner: {car.currentOwner} - Year:{" "}
              {car.year}
            </span>
            <button
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => handleDeleteCar(car._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

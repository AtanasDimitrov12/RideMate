import React, { useState } from "react";
import axios from "axios";

const BecomeDriverForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    licenseNumber: "",
    brand: "",
    model: "",
    licensePlate: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/drivers/apply", formData);
      if (response.status === 200) {
        setSuccessMessage("Application submitted successfully!");
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to submit application. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-[-80px] ml-[-100px] md:ml-[-300px]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Become a Driver</h2>

        {successMessage && <p className="text-green-600 text-center mb-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 text-center mb-2">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* License Number */}
          <div>
            <label className="block text-gray-700 font-semibold">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Vehicle Brand */}
          <div>
            <label className="block text-gray-700 font-semibold">Vehicle Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-gray-700 font-semibold">Vehicle Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* License Plate */}
          <div>
            <label className="block text-gray-700 font-semibold">License Plate</label>
            <input
              type="text"
              name="licensePlate"
              value={formData.licensePlate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomeDriverForm;

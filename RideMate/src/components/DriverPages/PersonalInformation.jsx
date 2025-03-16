import React, { useState, useEffect } from "react";

function PersonalInformation() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    licenseNumber: "",
    brand: "",
    model: "",
    licensePlate: "",
  });

  // Fetch the current driver's info when the component mounts
  useEffect(() => {
    async function fetchDriverData() {
      try {
        // Replace with your API call, for example: const data = await getCurrentDriver();
        const data = {
          username: "driver123",
          email: "driver123@example.com",
          password: "", // or leave blank if not returning password
          phoneNumber: "123456789",
          firstName: "John",
          lastName: "Doe",
          licenseNumber: "AB12345",
          brand: "Toyota",
          model: "Corolla",
          licensePlate: "XYZ-9999",
        };

        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "", // keep blank if not changing
          phoneNumber: data.phoneNumber || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          licenseNumber: data.licenseNumber || "",
          brand: data.brand || "",
          model: data.model || "",
          licensePlate: data.licensePlate || "",
        });
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    }

    fetchDriverData();
  }, []);

  // Handle input changes (only for editable fields)
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only update if not disabled
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes (simulate API call)
  const handleSave = () => {
    console.log("Saving personal info:", formData);
    alert("Personal information saved (mock).");
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Personal Information
      </h1>

      {/* Personal Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Username (Locked) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.username}
          />
        </div>

        {/* Email (Locked) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.email}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.password}
            onChange={handleChange}
            placeholder="Leave blank if not changing"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        {/* First Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* License Number */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            License Number
          </label>
          <input
            type="text"
            name="licenseNumber"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Car Info Section (Locked) */}
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Car Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Brand (Locked) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.brand}
          />
        </div>

        {/* Model (Locked) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Model
          </label>
          <input
            type="text"
            name="model"
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.model}
          />
        </div>

        {/* License Plate (Locked) */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            License Plate
          </label>
          <input
            type="text"
            name="licensePlate"
            disabled
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            value={formData.licensePlate}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </div>
  );
}

export default PersonalInformation;

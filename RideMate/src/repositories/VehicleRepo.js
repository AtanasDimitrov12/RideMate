import backEndClient from "./axiosClient";

const vehiclesURL = "/api/vehicles";

// Fetch all vehicles
export const getAllVehicles = async () => {
  try {
    const response = await backEndClient.get(vehiclesURL);
    return response.data; // Returns an array of VehicleDTOs
  } catch (error) {
    handleRequestError("Error fetching vehicles", error);
    return null;
  }
};

// Fetch a vehicle by its ID
export const getVehicleById = async (id) => {
  try {
    const response = await backEndClient.get(`${vehiclesURL}/${id}`);
    return response.data; // Returns a VehicleDTO
  } catch (error) {
    handleRequestError("Error fetching vehicle by ID", error);
    return null;
  }
};

// Fetch a vehicle by driver ID (user vehicle mapping)
export const getVehicleByDriverId = async (driverId) => {
  try {
    const response = await backEndClient.get(`${vehiclesURL}/user/${driverId}`);
    return response.data; // Returns a VehicleDTO
  } catch (error) {
    handleRequestError("Error fetching vehicle by driver ID", error);
    return null;
  }
};

// Create a new vehicle
export const createVehicle = async (vehicleDTO) => {
  try {
    const response = await backEndClient.post(vehiclesURL, vehicleDTO);
    return response.data; // Returns the created VehicleDTO
  } catch (error) {
    handleRequestError("Error creating vehicle", error);
    return null;
  }
};

// Update an existing vehicle
export const updateVehicle = async (vehicleDTO) => {
  try {
    const response = await backEndClient.put(vehiclesURL, vehicleDTO);
    return response.data; // Returns the updated VehicleDTO
  } catch (error) {
    handleRequestError("Error updating vehicle", error);
    return null;
  }
};

// Delete a vehicle by its ID
export const deleteVehicle = async (id) => {
  try {
    const response = await backEndClient.delete(`${vehiclesURL}/${id}`);
    return response.data; // Backend may return a confirmation message
  } catch (error) {
    handleRequestError("Error deleting vehicle", error);
    return null;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

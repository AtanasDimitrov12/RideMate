import backEndClient from "./axiosClient";

const driversURL = "/api/drivers";

// Fetch a driver by ID
export const getDriverById = async (id) => {
  try {
    const response = await backEndClient.get(`${driversURL}/${id}`);
    return response.data; // Return data directly if successful
  } catch (error) {
    handleRequestError("Error fetching driver by ID", error);
    return null;
  }
};

// Fetch a driver's status by ID
export const getDriverStatusById = async (id) => {
  try {
    const response = await backEndClient.get(`${driversURL}/status/${id}`);
    return response.data; // Returns DriverStatus (e.g., OFFLINE/AVAILABLE/ON_RIDE)
  } catch (error) {
    handleRequestError("Error fetching driver status by ID", error);
    return null;
  }
};

// Create a new driver (Driver or Admin role)
export const createDriver = async (driverDTO) => {
  try {
    const response = await backEndClient.post(driversURL, driverDTO);
    return response.data; // Returns the created DriverDTO
  } catch (error) {
    handleRequestError("Error creating driver", error);
    return null;
  }
};

// Update a driver (Driver or Admin role)
export const updateDriver = async (driverDTO) => {
  try {
    const response = await backEndClient.put(driversURL, driverDTO);
    return response.data; // Returns the updated DriverDTO
  } catch (error) {
    handleRequestError("Error updating driver", error);
    return null;
  }
};

// Change driver status (PUT /api/drivers/{id}, restricted to 'DRIVER' role)
export const changeDriverStatus = async (id) => {
  try {
    const response = await backEndClient.put(`${driversURL}/${id}`);
    if (response.status === 200) {
      console.log("Driver status changed successfully");
      return response.data; // Returns the updated DriverDTO with new status
    }
    console.error(`Unexpected response status: ${response.status}`);
    return null;
  } catch (error) {
    handleRequestError("Error changing driver status", error);
    return null;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

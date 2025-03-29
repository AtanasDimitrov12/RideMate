import backEndClient from "./axiosClient";

const driverRequestsURL = "/api/driver-requests";

// Fetch a driver request by ID
export const getDriverRequests = async () => {
  try {
    const response = await backEndClient.get(`${driverRequestsURL}/all`);
    return response.data; // Returns the DriverRequestDTO
  } catch (error) {
    handleRequestError("Error fetching driver request by ID", error);
    return null;
  }
};

// Create a new driver request
export const createDriverRequest = async (driverRequestDTO) => {
  try {
    const response = await backEndClient.post(driverRequestsURL, driverRequestDTO);
    return response.data; // Returns the created DriverRequestDTO
  } catch (error) {
    handleRequestError("Error creating driver request", error);
    return null;
  }
};

// Update an existing driver request
export const updateDriverRequest = async (driverRequestDTO) => {
  try {
    const response = await backEndClient.put(driverRequestsURL, driverRequestDTO);
    return response.data; // Returns the updated DriverRequestDTO
  } catch (error) {
    handleRequestError("Error updating driver request", error);
    return null;
  }
};

// Delete a driver request by ID (if applicable)
export const deleteDriverRequest = async (id) => {
  try {
    const response = await backEndClient.delete(`${driverRequestsURL}/${id}`);
    return response.data; // Returns a confirmation or the deleted DriverRequestDTO
  } catch (error) {
    handleRequestError("Error deleting driver request", error);
    return null;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

import backEndClient from './axiosClient';

const ridesURL = "/api/rides";

// Get all rides
export const getAllRides = async () => {
  try {
    const response = await backEndClient.get(ridesURL);
    return response.data; // List of RideDTOs
  } catch (error) {
    handleRequestError("Error fetching all rides", error);
    return null;
  }
};

// Get all rides by status (for drivers) - status is passed as parameter
export const getAllRidesByStatus = async (status) => {
  try {
    const response = await backEndClient.get(`${ridesURL}/drivers/${status}`);
    return response.data; // List of RideDTOs
  } catch (error) {
    handleRequestError("Error fetching rides by status", error);
    return null;
  }
};

// Get all rides for a specific user
export const getAllRidesByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${ridesURL}/user/${userId}`);
    return response.data; // List of RideDTOs for the user
  } catch (error) {
    handleRequestError("Error fetching rides by user ID", error);
    return null;
  }
};

// Get a single ride by ID
export const getRideById = async (id) => {
  try {
    const response = await backEndClient.get(`${ridesURL}/${id}`);
    return response.data; // RideDTO
  } catch (error) {
    handleRequestError("Error fetching ride by ID", error);
    return null;
  }
};

// Create a new ride
export const createRide = async (rideDTO) => {
  try {
    const response = await backEndClient.post(ridesURL, rideDTO);
    return response.data; // Created RideDTO
  } catch (error) {
    handleRequestError("Error creating ride", error);
    return null;
  }
};

// Update a ride
export const updateRide = async (rideDTO) => {
  try {
    const response = await backEndClient.put(ridesURL, rideDTO);
    return response.data; // Updated RideDTO
  } catch (error) {
    handleRequestError("Error updating ride", error);
    return null;
  }
};

// Delete a ride (Admin only)
export const deleteRide = async (id) => {
  try {
    const response = await backEndClient.delete(`${ridesURL}/${id}`);
    if (response.status === 204) {
      console.log("Ride deleted successfully");
      return true;
    }
    console.error(`Unexpected response status: ${response.status}`);
    return false;
  } catch (error) {
    handleRequestError("Error deleting ride", error);
    return false;
  }
};

// Get the current ride for a user
export const getCurrentRideByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${ridesURL}/user/${userId}/current`);
    return response.data; // RideDTO or null if no content
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return null;
    }
    handleRequestError("Error fetching current ride by user ID", error);
    return null;
  }
};

// Get the current ride for a driver
export const getCurrentRideByDriverId = async (driverId) => {
    try {
      const response = await backEndClient.get(`${ridesURL}/driver/${driverId}/current`);
      return response.data; // RideDTO or null if no content
    } catch (error) {
      if (error.response && error.response.status === 204) {
        return null;
      }
      handleRequestError("Error fetching current ride by driver ID", error);
      return null;
    }
  };

// Driver picks up a ride (assigns a driver to a ride)
export const driverGetRide = async (rideId, driverId) => {
  try {
    const response = await backEndClient.put(`${ridesURL}/driver/${rideId}/${driverId}`);
    return response.data; // Updated RideDTO
  } catch (error) {
    handleRequestError("Error updating ride with driver pickup", error);
    return null;
  }
};

// Change the status of a ride; status is passed as parameter (RideStatus)
export const changeRideStatus = async (rideId, status) => {
  try {
    const response = await backEndClient.put(`${ridesURL}/${rideId}/${status}`);
    return response.data; // Updated RideDTO with new status
  } catch (error) {
    handleRequestError("Error changing ride status", error);
    return null;
  }
};

// Change the status of a ride to completed
export const finishRide = async (rideId) => {
    try {
      const response = await backEndClient.put(`${ridesURL}/finish/${rideId}`);
      return response.data; // Updated RideDTO with new status
    } catch (error) {
      handleRequestError("Error changing ride status", error);
      return null;
    }
  };

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

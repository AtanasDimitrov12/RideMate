import backEndClient from './axiosClient';

const usersURL = "/api/users";

// Fetch a user by ID
export const getUserById = async (id) => {
  try {
    const response = await backEndClient.get(`${usersURL}/${id}`);
    return response.data; // Return data directly if successful
  } catch (error) {
    handleRequestError("Error fetching user by ID", error);
    return null;
  }
};

// Update a user
export const updateUser = async (userDTO) => {
  try {
    const response = await backEndClient.put(usersURL, userDTO);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.response || error.message);
    throw error; // Re-throw error for the caller to handle
  }
};

// Fetch all users (Admin only)
export const getAllUsers = async () => {
  try {
    const response = await backEndClient.get(usersURL);
    return response.data; // Return the list of users if successful
  } catch (error) {
    handleRequestError("Error fetching all users", error);
    return null;
  }
};

export const getDeactivatedUsers = async () => {
  try {
    const response = await backEndClient.get(`${usersURL}/deactivated`);
    return response.data; // Return the list of users if successful
  } catch (error) {
    handleRequestError("Error fetching all users", error);
    return null;
  }
};

// Delete a user (Admin only)
export const deleteUser = async (id) => {
  try {
    const response = await backEndClient.delete(`${usersURL}/${id}`);
    if (response.status === 204) {
      console.log("User deleted successfully");
      return true;
    }
    console.error(`Unexpected response status: ${response.status}`);
    return false;
  } catch (error) {
    handleRequestError("Error deleting user", error);
    return false;
  }
};

export const getAllRidesByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`/api/rides/user/${userId}`);
    return response.data; // Return the list of rides
  } catch (error) {
    console.error("Error fetching ride history:", error.response || error.message);
    throw error; // Let the component handle the error
  }
};

export const getCurrentRideByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`/api/rides/user/${userId}/current`);
    return response.data; // Return ride data if available
  } catch (error) {
    if (error.response && error.response.status === 204) {
      return null; // Handle no content response
    }
    console.error("Error fetching current ride:", error.response || error.message);
    throw error; // Let the component handle the error
  }
};

export const getUserByUsername = async (username) => {
  try {
    // Assuming your backend has a GET mapping at /api/users/{username}
    const response = await backEndClient.get(`${usersURL}/by-username/${username}`);
    return response.data;
  } catch (error) {
    handleRequestError("Error fetching user by username", error);
    return null; // or throw error, depending on your needs
  }
};

export const changeUserStatus = async (id) => {
  try {
    const response = await backEndClient.put(`${usersURL}/${id}`);
    if (response.status === 200) {
      console.log("User status changed successfully");
      return response.data; // Returns updated UserDTO with new status
    }
    console.error(`Unexpected response status: ${response.status}`);
    return null;
  } catch (error) {
    handleRequestError("Error changing user status", error);
    return null;
  }
};




// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

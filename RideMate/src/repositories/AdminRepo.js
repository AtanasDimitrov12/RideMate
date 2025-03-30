import backEndClient from "./axiosClient";

const adminsURL = "/api/admins";

// Fetch all admins
export const getAllAdmins = async () => {
  try {
    const response = await backEndClient.get(adminsURL);
    return response.data; // Returns an array of AdminDTO objects
  } catch (error) {
    handleRequestError("Error fetching all admins", error);
    return null;
  }
};

// Fetch an admin by ID
export const getAdminById = async (id) => {
  try {
    const response = await backEndClient.get(`${adminsURL}/${id}`);
    return response.data; // Returns an AdminDTO
  } catch (error) {
    handleRequestError("Error fetching admin by ID", error);
    return null;
  }
};

// Fetch an admin's department by user ID
export const getAdminDepartmentByUserId = async (userId) => {
  try {
    const response = await backEndClient.get(`${adminsURL}/department/${userId}`);
    return response.data; // Returns a string (department)
  } catch (error) {
    handleRequestError("Error fetching admin department by userId", error);
    return null;
  }
};

// Create a new admin
export const createAdmin = async (adminDTO) => {
  try {
    const response = await backEndClient.post(adminsURL, adminDTO);
    return response.data; // Returns the created AdminDTO
  } catch (error) {
    handleRequestError("Error creating admin", error);
    return null;
  }
};

// Update an existing admin (full update)
export const updateAdmin = async (adminDTO) => {
  try {
    const response = await backEndClient.put(adminsURL, adminDTO);
    return response.data; // Returns the updated AdminDTO
  } catch (error) {
    handleRequestError("Error updating admin", error);
    return null;
  }
};

// Update an admin's department by providing department and userId in the URL
export const updateAdminDepartment = async (department, userId) => {
  try {
    const response = await backEndClient.put(`${adminsURL}/${department}/${userId}`);
    return response.data; // Returns the updated AdminDTO
  } catch (error) {
    handleRequestError("Error updating admin department", error);
    return null;
  }
};

// Delete an admin by ID
export const deleteAdmin = async (id) => {
  try {
    const response = await backEndClient.delete(`${adminsURL}/${id}`);
    return response.data;
  } catch (error) {
    handleRequestError("Error deleting admin", error);
    return null;
  }
};

// Utility function for handling and logging request errors
const handleRequestError = (message, error) => {
  console.error(`${message}:`, error.response || error.message);
};

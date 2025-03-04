import backEndClient from './axiosClient';

const authURL = "/auth";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await backEndClient.post(`${authURL}/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("User registered successfully");
      return response.data;
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};

// Login (User or Admin)
export const login = async (credentials) => {
  try {
    const response = await backEndClient.post(`${authURL}/login`, credentials, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    return null; // Ensure null is returned on failure
  }
};

// Verify Password
export const verifyPassword = async (passwordData) => {
  try {
    const response = await backEndClient.post(`${authURL}/verify-password`, passwordData, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log("Password verified successfully");
      return response.data; // Typically true/false or a verification result
    } else {
      console.error(`Error: Received status code ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return null;
  }
};

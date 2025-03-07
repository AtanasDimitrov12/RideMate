import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../repositories/AuthRepo";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, email, phoneNumber, password, confirmPassword } = formData;

    if (!/^[A-Za-z]{3,}$/.test(username)) {
      toast.error("Username must contain only letters and be at least 3 characters long.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!/^\d{6,15}$/.test(phoneNumber)) {
      toast.error("Phone number must be between 6 to 15 digits.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await registerUser(formData);
        response
          ? toast.success("Signup successful!")
          : toast.error("Signup failed. Please try again.");
      } catch (error) {
        toast.error("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="form-container sign-up-container" data-testid="sign-up-container">
      <form onSubmit={handleSubmit}>
        <h1 className="register-form">Sign Up</h1>
        
        <span>Please enter your credentials:</span>
        
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          data-testid="username-signup"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          data-testid="email-signup"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          data-testid="phone-number-signup"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          data-testid="password-signup"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          data-testid="confirm-password-signup"
        />
        
        <button type="submit" data-testid="sign-up-submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;

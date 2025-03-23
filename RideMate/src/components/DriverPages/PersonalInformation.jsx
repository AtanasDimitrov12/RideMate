import React, { useState, useEffect } from "react";
import { getUserById, updateUser, updateUserPassword } from "../../repositories/UserRepo";
import { getDriverById } from "../../repositories/DriverRepo";
import { verifyPassword } from "../../repositories/AuthRepo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonalInfoCard from "./PersonalInfoCard";
import PhoneUpdateForm from "../UserPages/UserDashboard/PhoneUpdateForm";
import PasswordUpdateForm from "../UserPages/UserDashboard/PasswordUpdateForm";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    // Fields from the UserRepo
    username: "",
    email: "",
    phoneNumber: "",
    createdAt: "",
    role: "",
    isActive: false,
    // Fields from the DriverRepo
    firstName: "",
    lastName: "",
    licenseNumber: "",
    status: "",
  });

  // States for password update form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Retrieve userId from localStorage
        const storedUser = localStorage.getItem("user");
        let userId = null;
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          userId = parsedUser.userId;
        }
        if (!userId) {
          toast.error("User not logged in.", { position: "top-right" });
          return;
        }
        // Fetch user info (from UserRepo)
        const userData = await getUserById(userId);
        // Fetch driver info (from DriverRepo)
        const driverData = await getDriverById(userId);
        if (userData && driverData) {
          setFormData({
            username: userData.username || "",
            email: userData.email || "",
            phoneNumber: userData.phoneNumber || "",
            createdAt: userData.createdAt || "",
            role: userData.role || "",
            isActive: userData.isActive || false,
            firstName: driverData.firstName || "",
            lastName: driverData.lastName || "",
            licenseNumber: driverData.licenseNumber || "",
            status: driverData.status || "",
          });
        } else {
          toast.error("Error fetching personal information.", { position: "top-right" });
        }
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Error fetching personal information.", { position: "top-right" });
      }
    }
    fetchData();
  }, []);

  // Handle phone number change
  const handlePhoneChange = (e) => {
    setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }));
  };

  // Handle phone number update
  const handlePhoneUpdate = async (e) => {
    e.preventDefault();
    try {
      const userUpdate = {
        username: formData.username,
        email: formData.email,
        password: "", // leave blank so the password is not overwritten
        phoneNumber: formData.phoneNumber,
        createdAt: formData.createdAt,
        role: formData.role,
        isActive: formData.isActive,
      };
      await updateUser(userUpdate);
      toast.success("Phone number updated successfully!", { position: "top-right" });
    } catch (err) {
      toast.error("Failed to update phone number.", { position: "top-right" });
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.", { position: "top-right" });
      return;
    }
    try {
      // Retrieve userId from localStorage
      const storedUser = localStorage.getItem("user");
      let userId = null;
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        userId = parsedUser.userId;
      }
      if (!userId) {
        toast.error("User not logged in.", { position: "top-right" });
        return;
      }
      // Verify current password before updating
      const isVerified = await verifyPassword({ username: formData.username, password: currentPassword });
      if (!isVerified) {
        toast.error("Incorrect current password.", { position: "top-right" });
        return;
      }
      await updateUserPassword(userId, newPassword);
      toast.success("Password updated successfully!", { position: "top-right" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error("Failed to update password. Please check your current password.", { position: "top-right" });
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PersonalInfoCard formData={formData} />
        <div className="space-y-6">
          <PhoneUpdateForm
            newPhone={formData.phoneNumber}
            onNewPhoneChange={handlePhoneChange}
            onSubmit={handlePhoneUpdate}
          />
          <PasswordUpdateForm
            currentPassword={currentPassword}
            newPassword={newPassword}
            onCurrentPasswordChange={(e) => setCurrentPassword(e.target.value)}
            onNewPasswordChange={(e) => setNewPassword(e.target.value)}
            onSubmit={handlePasswordUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;

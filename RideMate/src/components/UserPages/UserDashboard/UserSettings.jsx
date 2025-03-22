import React, { useEffect, useState } from "react";
import { getUserById, updateUser, updateUserPassword } from "../../../repositories/UserRepo";
import { verifyPassword } from "../../../repositories/AuthRepo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserInfoCard from "./UserInfoCard";
import PhoneUpdateForm from "./PhoneUpdateForm";
import PasswordUpdateForm from "./PasswordUpdateForm";

const UserSettings = () => {
  // Retrieve user from localStorage
  const storedUser = localStorage.getItem("user");
  let userId = null;
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      userId = parsedUser.userId;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  // State for the entire user object
  const [userInfo, setUserInfo] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    createdAt: "",
    role: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);

  // State for phone update form
  const [newPhone, setNewPhone] = useState("");

  // States for password update form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const userData = await getUserById(userId);
        if (userData) {
          setUserInfo(userData);
          if (userData.phoneNumber) {
            setNewPhone(userData.phoneNumber);
          }
        }
      } catch (err) {
        toast.error("Failed to load user data.", { position: "top-right" });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle phone number update
  const handlePhoneUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...userInfo, phoneNumber: newPhone };
      await updateUser(updatedUser);
      setUserInfo(updatedUser);
      toast.success("Phone number updated successfully!", { position: "top-right" });
    } catch (err) {
      toast.error("Failed to update phone number.", { position: "top-right" });
    }
  };

  // Handle password update (with password verification first)
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.", { position: "top-right" });
      return;
    }
    try {
      const isVerified = await verifyPassword({
        username: userInfo.username,
        password: currentPassword,
      });
      if (!isVerified) {
        toast.error("Incorrect current password.", { position: "top-right" });
        return;
      }
      await updateUserPassword(userInfo.id, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      toast.success("Password updated successfully!", { position: "top-right" });
    } catch (err) {
      toast.error("Failed to update password. Please check your current password.", { position: "top-right" });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">User Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserInfoCard userInfo={userInfo} />
        <div className="space-y-6">
          <PhoneUpdateForm
            newPhone={newPhone}
            onNewPhoneChange={(e) => setNewPhone(e.target.value)}
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

export default UserSettings;

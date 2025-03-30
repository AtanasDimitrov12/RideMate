import React, { useState, useEffect } from 'react';
import { getUserById, updateUserPassword } from '../../../repositories/UserRepo';
import { verifyPassword } from "../../../repositories/AuthRepo";
import { toast } from 'react-toastify';

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');

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
          setUsername(userData.username);
        } catch (error) {
          console.error("Error fetching data", error);
          toast.error("Error fetching personal information.", { position: "top-right" });
        }
      }
      fetchData();
    }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check new password length
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.", { position: "top-right" });
      return;
    }

    // Retrieve userId from localStorage
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
    if (!userId) {
      toast.error("User not logged in.", { position: "top-right" });
      return;
    }

    try {
      // Verify current password using verifyPassword API call.
      const isVerified = await verifyPassword({ username, password: currentPassword });
      if (!isVerified) {
        toast.error("Incorrect current password.", { position: "top-right" });
        return;
      }

      // Update the user's password
      await updateUserPassword(userId, newPassword);
      toast.success("Password updated successfully!", { position: "top-right" });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error("Failed to update password. Please check your current password.", { position: "top-right" });
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;

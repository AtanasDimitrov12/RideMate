import React, { useState, useEffect } from 'react';
import {
  getUserByUsername,
  updateUser,
  getDeactivatedUsers,
  changeUserStatus,
} from '../../../repositories/UserRepo';
import UserSearch from './UserSearch';
import UserEditForm from './UserEditForm';
import DeactivatedUsers from './DeactivatedUsers';

function ManageUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [deactivatedUsers, setDeactivatedUsers] = useState([]);
  const [editData, setEditData] = useState({
    id: null, // include ID for API calls
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: '',
    isActive: true,
    firstName: '',
    lastName: '',
    licenseNumber: '',
    brand: '',
    model: '',
    licensePlate: '',
  });

  // 1. Fetch Deactivated Users on Mount
  useEffect(() => {
    async function fetchDeactivated() {
      const users = await getDeactivatedUsers();
      if (users) {
        setDeactivatedUsers(users);
      }
    }
    fetchDeactivated();
  }, []);

  // 2. Search by Username
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const userData = await getUserByUsername(searchTerm);
    if (userData) {
      setFoundUser(userData);
      setEditData({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: '', // blank if not changing
        phoneNumber: userData.phoneNumber,
        role: userData.role,
        isActive: userData.isActive,
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        licenseNumber: userData.licenseNumber || '',
        brand: userData.brand || '',
        model: userData.model || '',
        licensePlate: userData.licensePlate || '',
      });
    } else {
      setFoundUser(null);
      alert('No user found with that username.');
    }
  };

  // 3. Handle Form Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 4. Save Non-Status Changes
  const handleSave = async () => {
    if (!foundUser) return;
    try {
      const updatedUser = await updateUser(editData);
      alert('User information updated successfully.');
      // Update local state with the returned user
      setFoundUser(updatedUser);
      setEditData((prev) => ({
        ...prev,
        isActive: updatedUser.isActive,
      }));
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating user information.');
    }
  };

  // 5. Toggle Status (Activate/Deactivate)
  const handleToggleStatus = async () => {
    if (!foundUser || !editData.id) return;
    try {
      const updatedUser = await changeUserStatus(editData.id);
      if (updatedUser) {
        alert('User status changed successfully.');
        setFoundUser(updatedUser);
        setEditData((prev) => ({
          ...prev,
          isActive: updatedUser.isActive,
        }));
      } else {
        alert('Failed to change user status.');
      }
    } catch (error) {
      console.error('Error changing user status:', error);
      alert('An error occurred while changing user status.');
    }
  };

  // 6. Activate a Deactivated User from the side panel
  const handleActivate = async (userToActivate) => {
    // If your 'changeUserStatus' also works to activate, call it here.
    // Or if there's a separate endpoint for activation, call that.
    alert(`User "${userToActivate.username}" activated (mock).`);
    setDeactivatedUsers((prev) =>
      prev.filter((u) => u.username !== userToActivate.username)
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Column: Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage Users</h1>

        <UserSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        {foundUser && (
          <UserEditForm
            editData={editData}
            handleChange={handleChange}
            handleSave={handleSave}
            handleToggleStatus={handleToggleStatus}
          />
        )}
      </div>

      {/* Right Column: Deactivated Users */}
      <DeactivatedUsers
        deactivatedUsers={deactivatedUsers}
        handleActivate={handleActivate}
      />
    </div>
  );
}

export default ManageUsers;

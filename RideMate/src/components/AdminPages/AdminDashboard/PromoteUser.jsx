import React, { useState } from 'react';
import { getUserByUsername, updateUser } from '../../../repositories/UserRepo'; // Adjust path as needed

function PromoteUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUser, setFoundUser] = useState(null);
  const [department, setDepartment] = useState('');

  // Handle searching for a user by username
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Call your getUserByUsername method
    const userData = await getUserByUsername(searchTerm);

    if (userData) {
      setFoundUser(userData);
    } else {
      setFoundUser(null);
      alert('User not found.');
    }
  };

  // Handle promoting the user to admin
  const handlePromote = async (e) => {
    e.preventDefault();

    if (!foundUser) {
      alert('Please search and select a user first.');
      return;
    }
    if (!department.trim()) {
      alert('Please enter a department.');
      return;
    }

    // Build an updated user object
    const updatedUser = {
      ...foundUser,
      role: 'ADMIN',       // or whatever role constant you use in your backend
      department: department,
    };

    try {
      // Call your updateUser method to save changes on the server
      await updateUser(updatedUser);

      alert(
        `User ${foundUser.username} has been promoted to admin with department "${department}"`
      );

      // Optionally, reset the form after promotion
      setSearchTerm('');
      setFoundUser(null);
      setDepartment('');
    } catch (error) {
      alert('An error occurred while promoting the user. Check console for details.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Promote User to Admin</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
        <input
          type="text"
          placeholder="Search user by username..."
          className="border border-gray-300 rounded px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* User Information */}
      {foundUser ? (
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">User Information</h2>
          <p>
            <strong>Username:</strong> {foundUser.username}
          </p>
          <p>
            <strong>Email:</strong> {foundUser.email}
          </p>
          <p>
            <strong>Current Role:</strong> {foundUser.role}
          </p>
        </div>
      ) : (
        <p className="mb-6 text-gray-500">No user selected.</p>
      )}

      {/* Show promotion form only if user is not already an ADMIN */}
      {foundUser && foundUser.role.toUpperCase() !== 'ADMIN' && (
        <form onSubmit={handlePromote} className="bg-white shadow rounded p-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Department</label>
            <input
              type="text"
              placeholder="Enter department..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Promote to Admin
          </button>
        </form>
      )}

      {/* If the user is already an admin, display a message */}
      {foundUser && foundUser.role.toUpperCase() === 'ADMIN' && (
        <div className="bg-white shadow rounded p-4 mb-6">
          <p className="text-lg font-semibold text-green-500">
            This user is already an ADMIN.
          </p>
        </div>
      )}
    </div>
  );
}

export default PromoteUser;

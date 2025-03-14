import React, { useState, useEffect } from 'react';

function ManageUsers() {
  // State for search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [foundUser, setFoundUser] = useState(null); // The user we find by searching
  const [deactivatedUsers, setDeactivatedUsers] = useState([]); // List of deactivated users

  // Local state for editing user info
  // We'll mirror the fields you mentioned, including driver-specific fields
  const [editData, setEditData] = useState({
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

  // On component mount, fetch the list of deactivated users
  useEffect(() => {
    // Example: fetch('/api/admin/deactivated-users')
    //   .then(res => res.json())
    //   .then(data => setDeactivatedUsers(data))
    //   .catch(err => console.error(err));

    // Mock data for now:
    setDeactivatedUsers([
      // { username: 'bannedUser', email: 'banned@example.com', isActive: false, ... },
      // add more if you like
    ]);
  }, []);

  // When admin searches by username
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Example fetch call:
    // const response = await fetch(`/api/admin/user?username=${searchTerm}`);
    // const userData = await response.json();

    // Mocked user data for demonstration:
    const userData = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'hashed-or-plain',
      phoneNumber: '123456789',
      createdAt: '2023-01-01T10:00:00',
      updatedAt: '2023-01-10T14:30:00',
      role: 'DRIVER', // or 'USER'
      isActive: true,
      firstName: 'John',
      lastName: 'Doe',
      licenseNumber: 'AB12345',
      brand: 'Toyota',
      model: 'Corolla',
      licensePlate: 'XYZ-9999',
    };

    // Simulate no match if searchTerm != 'john_doe'
    if (searchTerm !== 'john_doe') {
      setFoundUser(null);
      alert('No user found with that username.');
      return;
    }

    setFoundUser(userData);

    // Populate edit form
    setEditData({
      username: userData.username,
      email: userData.email,
      password: '', // Keep blank or hashed? Let admin set a new password if needed
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
  };

  // Handle input changes in the edit form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Save changes to the user
  const handleSave = async () => {
    if (!foundUser) return;
    // Example of sending updated data to your backend
    // await fetch(`/api/admin/user/${foundUser.username}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(editData),
    // });

    console.log('Saving user changes:', editData);
    alert('User information updated (mock).');
  };

  // Activate a deactivated user
  const handleActivate = async (userToActivate) => {
    // Example call to your API
    // await fetch(`/api/admin/activate-user/${userToActivate.username}`, { method: 'POST' });

    console.log('Activating user:', userToActivate.username);
    alert(`User "${userToActivate.username}" activated (mock).`);

    // Optionally remove them from the deactivated list
    setDeactivatedUsers((prev) =>
      prev.filter((u) => u.username !== userToActivate.username)
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Content (left) */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Manage Users</h1>

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

        {/* If a user is found, display details & edit form */}
        {foundUser && (
          <div className="bg-white shadow rounded p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              User Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-gray-600 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-600 mb-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editData.password}
                  onChange={handleChange}
                  placeholder="Leave blank if not changing"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-600 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-600 mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={editData.role}
                  onChange={handleChange}
                />
              </div>

              {/* isActive (checkbox) */}
              <div className="flex items-center">
                <label className="block text-gray-600 mb-1 mr-2">
                  Is Active
                </label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={editData.isActive}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
              </div>
            </div>

            {/* If user is a driver, show additional driver fields */}
            {editData.role.toUpperCase() === 'DRIVER' && (
              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Driver Info
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">License Number</label>
                    <input
                      type="text"
                      name="licenseNumber"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.licenseNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.brand}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Model</label>
                    <input
                      type="text"
                      name="model"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.model}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">License Plate</label>
                    <input
                      type="text"
                      name="licensePlate"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      value={editData.licensePlate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Deactivated Users */}
      <div className="w-64 bg-white shadow p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Deactivated Accounts
        </h2>
        {deactivatedUsers.length === 0 ? (
          <p className="text-gray-500">No deactivated users</p>
        ) : (
          <ul className="space-y-2">
            {deactivatedUsers.map((user) => (
              <li
                key={user.username}
                className="p-2 rounded bg-gray-100 flex justify-between items-center"
              >
                <span>{user.username}</span>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  onClick={() => handleActivate(user)}
                >
                  Activate
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;

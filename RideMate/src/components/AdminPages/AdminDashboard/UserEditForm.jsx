import React from 'react';

function UserEditForm({
  editData,
  handleChange,
  handleSave,
  handleToggleStatus,
}) {
  return (
    <div className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">
        User Information
      </h2>

      {/* Basic User Fields */}
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

        {/* New Password */}
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

        {/* isActive Checkbox */}
        <div className="flex items-center">
          <label className="block text-gray-600 mb-1 mr-2">Is Active</label>
          <input
            type="checkbox"
            name="isActive"
            checked={editData.isActive}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* Driver Fields if role === DRIVER */}
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
              <label className="block text-gray-600 mb-1">
                License Number
              </label>
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

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        {/* Save other changes */}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Changes
        </button>

        {/* Toggle Status */}
        <button
          onClick={handleToggleStatus}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {editData.isActive ? 'Deactivate User' : 'Activate User'}
        </button>
      </div>
    </div>
  );
}

export default UserEditForm;

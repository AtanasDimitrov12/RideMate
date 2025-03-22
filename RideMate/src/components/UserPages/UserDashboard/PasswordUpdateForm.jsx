import React from "react";

const PasswordUpdateForm = ({
  currentPassword,
  newPassword,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onSubmit,
}) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-xl font-semibold mb-4">Update Password</h3>
    <form onSubmit={onSubmit}>
      <label className="block mb-2 font-medium">Current Password</label>
      <input
        type="password"
        value={currentPassword}
        onChange={onCurrentPasswordChange}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <label className="block mt-4 mb-2 font-medium">
        New Password (min 8 characters)
      </label>
      <input
        type="password"
        value={newPassword}
        onChange={onNewPasswordChange}
        className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded"
      >
        Update Password
      </button>
    </form>
  </div>
);

export default PasswordUpdateForm;

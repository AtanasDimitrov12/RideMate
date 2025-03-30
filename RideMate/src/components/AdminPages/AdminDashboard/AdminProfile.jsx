// AdminProfile.jsx
import React from 'react';
import ChangePassword from './ChangePassword';
import ChangeDepartment from './ChangeDepartment';

function AdminProfile() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Profile</h1>
      <ChangePassword />
      <ChangeDepartment />
    </div>
  );
}

export default AdminProfile;

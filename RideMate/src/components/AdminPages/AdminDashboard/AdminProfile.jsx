// AdminProfile.jsx
import React, { useState, useEffect } from 'react';

function AdminProfile() {
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    // Fetch the admin's current info from your API
    // Example:
    // fetch('/api/admin/profile')
    //   .then(res => res.json())
    //   .then(data => {
    //     setPassword(data.password || '');
    //     setDepartment(data.department || '');
    //   })
    //   .catch(err => console.error(err));

    // Mock data for now:
    setPassword('******');
    setDepartment('IT Department');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated data to your API
    console.log('Saving admin profile:', { password, department });
    // fetch('/api/admin/profile', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ password, department }),
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // handle success
    //   })
    //   .catch(err => console.error(err));
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Admin Profile
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Department Field */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Department
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminProfile;

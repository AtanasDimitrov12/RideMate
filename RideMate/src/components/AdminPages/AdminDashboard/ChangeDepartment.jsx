// ChangeDepartment.jsx
import React, { useState, useEffect } from 'react';
import { getAdminDepartmentByUserId, updateAdminDepartment } from '../../../repositories/AdminRepo';
import { toast } from 'react-toastify';

function ChangeDepartment() {
  const [department, setDepartment] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve the admin user id from localStorage
    const storedUser = localStorage.getItem("user");
    let id = null;
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        id = parsedUser.userId;
        setUserId(id);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
    
    if (id) {
      // Fetch the admin's current department using the user id
      const fetchDepartment = async () => {
        try {
          const data = await getAdminDepartmentByUserId(id);
          console.log(data);
          setDepartment(data || '');
        } catch (error) {
          console.error('Error fetching admin department:', error);
        }
      };
      fetchDepartment();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    try {
      // Call updateAdminDepartment with the new department and userId.
      const response = await updateAdminDepartment(department, userId);
      if (response) {
        toast.success("Department updated successfully!");
      } else {
        toast.error("Failed to update department.");
      }
    } catch (error) {
      console.error('Error updating department:', error);
      toast.error("Failed to update department.");
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 mb-4">
      <h2 className="text-xl font-bold mb-4">Change Department</h2>
      {/* Display the current department */}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            New Department
          </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Department
        </button>
      </form>
    </div>
  );
}

export default ChangeDepartment;

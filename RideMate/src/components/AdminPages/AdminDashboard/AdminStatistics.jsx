// AdminStatistics.jsx
import React, { useEffect, useState } from 'react';

function AdminStatistics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [topUser, setTopUser] = useState('N/A');
  const [topDriver, setTopDriver] = useState('N/A');

  useEffect(() => {
    // Example of fetching real stats from an API:
    // fetch('/api/admin/stats')
    //   .then(res => res.json())
    //   .then(data => {
    //     setTotalUsers(data.totalUsers);
    //     setTotalDrivers(data.totalDrivers);
    //     setTotalRides(data.totalRides);
    //     setTopUser(data.topUser);
    //     setTopDriver(data.topDriver);
    //   })
    //   .catch(err => console.error(err));

    // For now, just mock data
    setTotalUsers(123);
    setTotalDrivers(40);
    setTotalRides(350);
    setTopUser('John Doe');
    setTopDriver('Jane Smith');
  }, []);

  return (
    <div className="bg-white rounded shadow p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Total Users */}
        <div className="bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalUsers}
          </p>
        </div>

        {/* Total Drivers */}
        <div className="bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Drivers</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalDrivers}
          </p>
        </div>

        {/* Total Rides */}
        <div className="bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Rides</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalRides}
          </p>
        </div>

        {/* Top User & Driver */}
        <div className="bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Most Active
          </h2>
          <p className="mt-2">
            <strong>User:</strong> {topUser}
          </p>
          <p className="mt-1">
            <strong>Driver:</strong> {topDriver}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminStatistics;

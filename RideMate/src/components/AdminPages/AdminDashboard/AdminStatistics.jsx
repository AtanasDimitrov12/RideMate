import React, { useEffect, useState } from 'react';
import { getTotalUsersCount } from '../../../repositories/UserRepo';
import { getTotalDriversCount } from '../../../repositories/DriverRepo';
import { getTotalRidesCount, getMostActiveUser, getMostActiveDriver } from '../../../repositories/RideRepo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminStatistics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [topUser, setTopUser] = useState('N/A');
  const [topDriver, setTopDriver] = useState('N/A');

  useEffect(() => {
    async function fetchStats() {
      try {
        const usersCount = await getTotalUsersCount();
        setTotalUsers(usersCount);
      } catch (error) {
        toast.error('Error fetching total users count.', { position: 'top-right' });
      }

      try {
        const driversCount = await getTotalDriversCount();
        setTotalDrivers(driversCount);
      } catch (error) {
        toast.error('Error fetching total drivers count.', { position: 'top-right' });
      }

      try {
        const ridesCount = await getTotalRidesCount();
        setTotalRides(ridesCount);
      } catch (error) {
        toast.error('Error fetching total rides count.', { position: 'top-right' });
      }

      try {
        const mostActiveUser = await getMostActiveUser();
        setTopUser(mostActiveUser && mostActiveUser.username ? mostActiveUser.username : 'N/A');
      } catch (error) {
        toast.error('Error fetching most active user.', { position: 'top-right' });
      }

      try {
        const mostActiveDriver = await getMostActiveDriver();
        setTopDriver(
          mostActiveDriver && mostActiveDriver.firstName && mostActiveDriver.lastName
            ? `${mostActiveDriver.firstName} ${mostActiveDriver.lastName}`
            : 'N/A'
        );
      } catch (error) {
        toast.error('Error fetching most active driver.', { position: 'top-right' });
      }
      
    }

    fetchStats();
  }, []);

  return (
    <div className="bg-white rounded shadow p-6">
      <ToastContainer />
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

        {/* Most Active User & Driver */}
        <div className="bg-gray-100 rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">Most Active</h2>
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

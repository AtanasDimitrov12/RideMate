import React, { useEffect, useState } from 'react';
import { getDriverStatusById, changeDriverStatus } from '../../repositories/DriverRepo';
import { toast } from 'react-toastify';

function DriverStatusToggle() {
  // 1. Retrieve the driver info from localStorage
  const storedUser = localStorage.getItem('user');
  let driverId = null;
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      driverId = parsed.userId; // or adjust if your structure is different
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }

  // 2. Local state for driver status. Possible statuses: "OFFLINE", "AVAILABLE", "ON_RIDE", etc.
  const [driverStatus, setDriverStatus] = useState('OFFLINE');

  // 3. Fetch current status on mount (or when driverId changes)
  useEffect(() => {
    if (!driverId) return; // No ID => can't fetch status
    async function fetchStatus() {
      try {
        const status = await getDriverStatusById(driverId);
        if (status) {
          console.log('Initial driver status:', status);
          setDriverStatus(status);
        }
      } catch (error) {
        console.error('Error fetching driver status:', error);
        toast.error('Failed to fetch driver status.', { position: 'top-center' });
      }
    }
    fetchStatus();
  }, [driverId]);

  // 4. Determine if the driver is ON_RIDE or AVAILABLE
  const isOnRide = driverStatus === 'ON_RIDE';
  const isAvailable = driverStatus === 'AVAILABLE';

  // 5. Handle toggling the status (only if not ON_RIDE)
  const handleToggle = async () => {
    if (!driverId) {
      toast.error('No driver ID found in localStorage.', { position: 'top-center' });
      return;
    }
    if (isOnRide) {
      // If driver is ON_RIDE, we do nothing
      return;
    }

    try {
      const updatedDriver = await changeDriverStatus(driverId);
      // Log the response to confirm the field name
      console.log('Updated driver response:', updatedDriver);

      if (updatedDriver && updatedDriver.status) {
        // If your backend returns "status" as the field:
        setDriverStatus(updatedDriver.status);
        toast.success(`Driver status changed to ${updatedDriver.status}`, {
          position: 'top-center',
        });
      } else {
        // If the response doesn't contain the status, show an error
        toast.error('Failed to change driver status.', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error changing driver status:', error);
      toast.error('An error occurred while changing driver status.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Display the textual status */}
      <span className="font-medium text-white">
        {isOnRide ? 'On Ride' : isAvailable ? 'Available' : 'Offline'}
      </span>

      {/* Toggle Switch */}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={handleToggle}
          disabled={isOnRide}
          className="sr-only peer"
        />
        <div
          className="
            w-10
            h-5
            bg-gray-200
            rounded-full
            peer
            peer-focus:outline-none
            peer-focus:ring-2
            peer-focus:ring-[#10C6C6]
            dark:peer-focus:ring-[#10C6C6]
            peer-checked:bg-[#10C6C6]
            relative
            transition-colors
          "
        />
        <span
          className="
            absolute
            left-0.5
            top-0.5
            w-4
            h-4
            bg-white
            border
            border-gray-300
            rounded-full
            transition-transform
            peer-checked:translate-x-5
          "
        />
      </label>
    </div>
  );
}

export default DriverStatusToggle;

// DriverSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function DriverSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 left-0 p-6">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-bold mb-6">Driver Dashboard</h2>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink
          to="/driver-dashboard/current-ride"
          className={({ isActive }) =>
            `block py-2 px-4 rounded ${
              isActive ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`
          }
        >
          Current Ride
        </NavLink>

        <NavLink
          to="/driver-dashboard/find-ride"
          className={({ isActive }) =>
            `block py-2 px-4 rounded ${
              isActive ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`
          }
        >
          Find Ride
        </NavLink>

        <NavLink
          to="/driver-dashboard/personal-info"
          className={({ isActive }) =>
            `block py-2 px-4 rounded ${
              isActive ? 'bg-blue-500' : 'hover:bg-gray-700'
            }`
          }
        >
          Personal Information
        </NavLink>
      </nav>
    </aside>
  );
}

export default DriverSidebar;

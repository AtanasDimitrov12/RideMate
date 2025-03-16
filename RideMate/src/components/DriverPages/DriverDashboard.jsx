// DriverDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DriverSidebar from './DriverSidebar';
import CurrentRide from './CurrentRide';
import FindRide from './FindRide';
import PersonalInformation from './PersonalInformation';

function DriverDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <DriverSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/current-ride" element={<CurrentRide />} />
          <Route path="/find-ride" element={<FindRide />} />
          <Route path="/personal-info" element={<PersonalInformation />} />
          {/* Add more driver-related routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default DriverDashboard;

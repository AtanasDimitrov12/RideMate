// AdminDashboard.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminStatistics from './AdminStatistics';
import AdminProfile from './AdminProfile';
import ManageUsers from './ManageUsers';
import PromoteUser from './PromoteUser';

function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* If you want a top header, you could include AdminHeader here */}
        
        <Routes>
          <Route path="/statistics" element={<AdminStatistics />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/users" element={<ManageUsers />} />
          <Route path="/promote-user" element={<PromoteUser/>}/>
          {/* Add more admin routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default AdminDashboard;

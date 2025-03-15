// AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 left-0 p-6">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink
          to="/admin-dashboard/statistics"
         className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Statistics
        </NavLink>

        <NavLink
          to="/admin-dashboard/profile"
         className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Profile
        </NavLink>

        <NavLink
          to="/admin-dashboard/users"
          className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Manage Users
        </NavLink>

        <NavLink
          to="/admin-dashboard/promote-user"
          className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Promote User
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;

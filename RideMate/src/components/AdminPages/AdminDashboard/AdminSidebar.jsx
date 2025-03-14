// AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink
          to="/admin-dashboard/statistics"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 rounded bg-blue-500 text-white"
              : "block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          }
        >
          Statistics
        </NavLink>

        <NavLink
          to="/admin-dashboard/profile"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 rounded bg-blue-500 text-white"
              : "block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          }
        >
          Profile
        </NavLink>

        <NavLink
          to="/admin-dashboard/users"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 rounded bg-blue-500 text-white"
              : "block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          }
        >
          Manage Users
        </NavLink>

        <NavLink
          to="/admin-dashboard/promote-user"
          className={({ isActive }) =>
            isActive
              ? "block px-3 py-2 rounded bg-blue-500 text-white"
              : "block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
          }
        >
          Promote User
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;

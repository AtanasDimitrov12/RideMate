import { NavLink } from "react-router-dom";

const UserSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen sticky top-0 left-0 p-6">
      <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
      <nav className="space-y-4">
        <NavLink 
          to="/user-dashboard/rides" 
          className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Ride History
        </NavLink>
        <NavLink 
          to="/user-dashboard/current-ride" 
          className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          Current Ride
        </NavLink>
        <NavLink 
          to="/user-dashboard/settings" 
          className={({ isActive }) => `block py-2 px-4 rounded ${isActive ? "bg-blue-500" : "hover:bg-gray-700"}`}>
          User Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext"; // Import UserContext
import DriverStatusToggle from "../DriverPages/DriverStatusToggle";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black">
      {/* Left Section: Brand Name */}
      <ul>
        <li><NavLink to="/" className="text-xl font-bold text-white">RideMate</NavLink></li>
      </ul>

      {/* Center Section: Navigation Links */}
      <ul className="flex space-x-6 justify-center flex-grow">
        <li><NavLink to="/" className="text-white hover:underline cursor-pointer">Home</NavLink></li>

        {user ? (
          <>
            {user.roles.includes("USER") && (
              <>
                <li><NavLink to="/book" className="text-white hover:underline cursor-pointer">Booking</NavLink></li>
                <li><NavLink to="/user-dashboard" className="text-white hover:underline cursor-pointer">Dashboard</NavLink></li>
              </>
            )}
            {user.roles.includes("ADMIN") && (
              <>
                <li><NavLink to="/driver-applications" className="text-white hover:underline cursor-pointer">Driver Applications</NavLink></li>
                <li><NavLink to="/admin-dashboard" className="text-white hover:underline cursor-pointer">Dashboard</NavLink></li>
              </>
            )}
            {user.roles.includes("DRIVER") && (
              <>
                <li><NavLink to="/driver-dashboard" className="text-white hover:underline cursor-pointer">Driver Dashboard</NavLink></li>
                <li><DriverStatusToggle/></li>
              </>
            )}
          </>
        ) : null}
      </ul>

      {/* Right Section: Register & Logout */}
      <div className="flex space-x-4">
        {!user ? (
          <NavLink to="/register" className="bg-blue-400 px-4 py-2 rounded text-white hover:bg-blue-500">
            Register
          </NavLink>
        ) : (
          <button onClick={handleLogout} className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600">
            Log out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Routes, Route } from "react-router-dom";
import UserSidebar from "./UserSideBar";
import RideHistory from "./RideHistory";
import CurrentRide from "./CurrentRide";
import UserSettings from "./UserSettings";

const UserDashboard = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
          {/* Sidebar */}
          <UserSidebar />
  
          {/* Main Content (expands to push footer down) */}
          <div className="ml-64 p-6 w-full flex-grow">
            <Routes>
              <Route path="/rides" element={<RideHistory />} />
              <Route path="/current-ride" element={<CurrentRide />} />
              <Route path="/settings" element={<UserSettings />} />
            </Routes>
          </div>
        </div>
  
      </div>
    );
  };
  
  export default UserDashboard;

import React, { useEffect, useState } from "react";
import { getCurrentRideByUserId } from "../../../repositories/UserRepo"; 
import { toast } from "react-toastify";

const CurrentRide = () => {
  // 1. Retrieve userId from localStorage
  const storedUser = localStorage.getItem("user");
  let userId = null;
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      userId = parsed.userId; // Adjust if your structure is different
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
  }

  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 2. Fetch the current ride on mount (if userId exists)
  useEffect(() => {
    const fetchCurrentRide = async () => {
      // If there's no userId, we skip fetching
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // getCurrentRideByUserId returns ride data or null
        const rideData = await getCurrentRideByUserId(userId);
        setCurrentRide(rideData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch current ride.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentRide();
  }, [userId]);

  // 3. Render logic
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Current Ride</h2>
      {currentRide ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* Adjust property names (from, to, driver, etc.) to match your ride object */}
          <p><strong>From:</strong> {currentRide.pickupLocation}</p>
          <p><strong>To:</strong> {currentRide.dropOffLocation}</p>
          <p><strong>Req. time:</strong> {currentRide.requestTime}</p>
          <p><strong>Status:</strong> {currentRide.status}</p>
        </div>
      ) : (
        <p>No ride in progress.</p>
      )}
    </div>
  );
};

export default CurrentRide;

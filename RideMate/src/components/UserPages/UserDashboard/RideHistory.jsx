import React, { useEffect, useState } from "react";
import { getAllRidesByUserId } from "../../../repositories/RideRepo"; 
import { toast } from "react-toastify";

const RideHistory = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Retrieve userId from localStorage
    let userId = null;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        userId = parsed.userId;
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }

    if (!userId) {
      setError("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchRides = async () => {
      try {
        const data = await getAllRidesByUserId(userId);
        if (!data) {
          setError("Failed to load ride history.");
        } else {
          setRides(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load ride history.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      {rides.length > 0 ? (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Request Time</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Pickup</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Dropoff</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride) => (
                <tr key={ride.id} className="border-b">
                  <td className="px-4 py-2">{ride.requestTime}</td>
                  <td className="px-4 py-2">{ride.pickupLocation}</td>
                  <td className="px-4 py-2">{ride.dropOffLocation}</td>
                  <td className="px-4 py-2">{ride.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No ride history found.</p>
      )}
    </div>
  );
};

export default RideHistory;

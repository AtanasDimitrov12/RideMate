import { useEffect, useState } from "react";
import { getAllRidesByUserId } from "../../repositories/UserRepo";
import { useContext } from "react";
import { UserContext } from "../../UserContext"; 

const RideHistory = () => {
  const { user } = useContext(UserContext); // Get user info from context
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRides = async () => {
      if (!user?.userId) return; // Ensure user is logged in

      try {
        const data = await getAllRidesByUserId(user.userId);
        setRides(data); // Update state with fetched rides
      } catch (err) {
        setError("Failed to load ride history.");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [user?.userId]); // Re-fetch if user ID changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>
      {rides.length > 0 ? (
        <ul className="bg-white shadow rounded-lg p-4">
          {rides.map((ride) => (
            <li key={ride.id} className="border-b py-2">
              <strong>{ride.date}</strong>: {ride.from} → {ride.to} ({ride.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>No ride history found.</p>
      )}
    </div>
  );
};

export default RideHistory;

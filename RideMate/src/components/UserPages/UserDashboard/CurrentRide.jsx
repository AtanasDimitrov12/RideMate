import { useEffect, useState } from "react";
import {getCurrentRideByUserId} from "../../../repositories/UserRepo";
import { useContext } from "react";
import { UserContext } from "../../../UserContext"; 

const CurrentRide = () => {
  const { user } = useContext(UserContext);
  const [currentRide, setCurrentRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrentRide = async () => {
      if (!user?.userId) return;

      try {
        const response = await getCurrentRideByUserId(user.userId);
        setCurrentRide(response.data);
      } catch (err) {
        setError("Failed to fetch current ride.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentRide();
  }, [user?.userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Current Ride</h2>
      {currentRide ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <p><strong>From:</strong> {currentRide.from}</p>
          <p><strong>To:</strong> {currentRide.to}</p>
          <p><strong>Driver:</strong> {currentRide.driver}</p>
          <p><strong>ETA:</strong> {currentRide.estimatedTime}</p>
          <p><strong>Status:</strong> {currentRide.status}</p>
        </div>
      ) : (
        <p>No ride in progress.</p>
      )}
    </div>
  );
};

export default CurrentRide;

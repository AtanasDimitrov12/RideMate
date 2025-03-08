import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../repositories/UserRepo"; // Import API calls
import { useContext } from "react";
import { UserContext } from "../../UserContext"; 

const UserSettings = () => {
  const { user } = useContext(UserContext);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Display-only
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.userId) return; // Ensure user is logged in

      try {
        const userData = await getUserById(user.userId);
        if (userData) {
          setPhone(userData.phone);
          setEmail(userData.email); // Email is not editable
        }
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.userId]);

  const handleUpdate = async () => {
    setError(""); // Reset error state

    const updatedData = { userId: user.userId, phone };
    if (password) updatedData.password = password; // Only send password if changed

    try {
      await updateUser(updatedData);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Settings</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p><strong>Email:</strong> {email}</p>

        <label className="block mt-4">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <label className="block mt-4">New Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button onClick={handleUpdate} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Update Info
        </button>
      </div>
    </div>
  );
};

export default UserSettings;

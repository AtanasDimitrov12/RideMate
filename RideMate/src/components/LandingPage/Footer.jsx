import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/booking-page");
    } else {
      navigate("/register");
    }
  };

  return (
    <footer className="bg-black text-white text-center py-8 mt-auto">
      <div className="flex justify-between items-center px-8">
        <p>Ready to <span className="text-blue-500">travel</span>?</p>
        <button
          onClick={handleJoinNow}
          className="bg-blue-500 text-white px-6 py-3 rounded"
        >
          Book now
        </button>
      </div>
      <div className="mt-6 text-sm">
        <ul className="flex justify-center space-x-6">
          <li>About Us</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <p className="mt-4">© 2025 RideMate. All rights reserved.</p>
    </footer>
  );
}

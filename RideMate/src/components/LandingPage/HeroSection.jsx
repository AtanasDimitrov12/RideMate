import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleBookRide = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/booking-page");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 py-20 bg-white text-black gap-10">
      {/* Left Section: Text & Buttons */}
      <div className="max-w-2xl flex flex-col items-center md:items-start">
        <h2 className="text-5xl font-bold leading-tight">
          Enjoy the <span className="text-blue-500">night</span>. We'll handle the <span className="text-blue-500">ride</span>.
        </h2>
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <button
            onClick={handleBookRide}
            className="bg-blue-500 text-white px-8 py-4 rounded text-lg w-full md:w-auto"
          >
            Book a Ride
          </button>
        </div>
      </div>

      {/* Right Section: Image (Bigger) */}
      <img
        className="w-full max-w-xl rounded-lg shadow-lg"
        src="/RideMateHomePage.png"
        alt="RideMate Service"
      />
    </section>
  );
}

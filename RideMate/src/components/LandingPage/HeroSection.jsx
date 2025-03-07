export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center text-center md:text-left px-8 py-20 bg-white text-black gap-10">
      
      {/* Left Section: Text & Buttons */}
      <div className="max-w-2xl flex flex-col items-center md:items-start">
        <h2 className="text-5xl font-bold leading-tight">
          Enjoy the <span className="text-blue-500">night</span>. We'll handle the <span className="text-blue-500">ride</span>.
        </h2>
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <button className="bg-blue-500 text-white px-8 py-4 rounded text-lg w-full md:w-auto">
            Book a Ride
          </button>
          <button className="border border-blue-500 text-blue-500 px-8 py-4 rounded text-lg w-full md:w-auto">
            Request Car Pickup
          </button>
        </div>
      </div>

      {/* Right Section: Image (Bigger) */}
      <img className="w-full max-w-xl rounded-lg shadow-lg" src="/RideMateHomePage.png" alt="RideMate Service" />
      
    </section>
  );
}

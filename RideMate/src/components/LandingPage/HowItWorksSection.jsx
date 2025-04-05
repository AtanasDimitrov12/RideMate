export default function HowItWorksSection() {
  return (
    <section className="bg-white text-black py-16 px-12 text-center">
      <h3 className="text-3xl font-bold text-blue-500">How It Works</h3>
      
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-8">
        <img className="w-106 rounded-lg" src="/RideMateMap.png" alt="How it Works" />
        
        <div className="space-y-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">1. Set Your Location</h4>
            <p>Quickly share your pickup point.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold text-blue-500">2. Select Service</h4>
            <p>Choose Taxi or Car Return.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold">3. Ride Safely Home</h4>
            <p>Professional drivers ensure your safety.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

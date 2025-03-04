export default function FeaturesSection(){
    return(
        <section className="bg-gray-100 py-16 text-black text-center">
        <h3 className="text-3xl font-bold text-blue-500">Features</h3>
        <div className="flex justify-center gap-8 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md w-64">
            <h4 className="font-bold">Instant Taxi Rides</h4>
            <p>Reliable drivers ready at your doorstep.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md w-64">
            <h4 className="font-bold">Car Return Service</h4>
            <p>Drink worry-free. We'll return your car safely.</p>
          </div>
        </div>
      </section>
    );
}
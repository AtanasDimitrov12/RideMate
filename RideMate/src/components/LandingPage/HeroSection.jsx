export default function HeroSection(){
    return(
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-16 bg-white text-black">
      <div className="max-w-lg">
        <h2 className="text-4xl font-bold">
          Enjoy the <span className="text-blue-500">night</span>. We'll handle the <span className="text-blue-500">ride</span>.
        </h2>
        <div className="mt-6 space-x-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded">Book a Ride</button>
          <button className="border border-blue-500 text-blue-500 px-6 py-3 rounded">Request Car Pickup</button>
        </div>
      </div>
      <img className="mt-8 md:mt-0 w-96 rounded-lg" src="/RideMateHomePage.png" alt="RideMate Service" />
    </section>
    );
}
export default function Navbar(){
    return(
        <nav className="flex justify-between items-center px-8 py-4 bg-black">
            <h1 className="text-xl font-bold">RideMate</h1>
            <ul className="hidden md:flex space-x-6">
            <li className="hover:underline cursor-pointer">How it works</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">Pricing</li>
            <li className="hover:underline cursor-pointer">Contact</li>
            </ul>
            <div className="space-x-4">
            <button className="text-white">Login</button>
            <button className="bg-blue-400 px-4 py-2 rounded">Register</button>
            </div>
        </nav>
    );
}

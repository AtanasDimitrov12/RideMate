import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 bg-black">
            <h1 className="text-xl font-bold text-white">RideMate</h1>
            <ul className="hidden md:flex space-x-6">
                <li><Link to="/" className="text-white hover:underline cursor-pointer">Home</Link></li>
                <li><Link to="/book" className="text-white hover:underline cursor-pointer">Booking</Link></li>
            </ul>
            <div className="space-x-4">
                <button className="bg-blue-400 px-4 py-2 rounded"><Link to="/register" className="text-white hover:underline cursor-pointer">Register</Link></button>
            </div>
        </nav>
    );
}

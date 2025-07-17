import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <ul className="flex space-x-6">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/prebuilt-pc">Prebuilt PC</Link></li>
        <li><Link to="/monitors">Monitors</Link></li>
        <li><Link to="/components">Components</Link></li>
        <li><Link to="/laptops">Laptops</Link></li>
        <li><Link to="/accessories">Accessories</Link></li>
        <li><Link to="/build-my-pc">Build My PC</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

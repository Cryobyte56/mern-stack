import React from "react";
import { Link } from "react-router-dom"; // Use react-router-dom for navigation
import { GiMaterialsScience } from "react-icons/gi";
import "./../index.css";

const Navbar = () => {
  
  return (
    <nav className="px-4 min-w-screen shadow-lg shadow-b-2 bg-white">
      <div className="flex h-16 items-center justify-between flex-col sm:flex-row">
        {/* Logo Text with Link to Main Page */}
        <Link to="/">
          <h1 className="flex items-center no-underline text-[#27622c] text-2xl sm:text-3xl font-bold text-center">
            CryoTech <GiMaterialsScience />
          </h1>
        </Link>

        <div className="flex space-x-2 items-center">
          {/* For Creating Product */}
          <Link to="/create">
            <button className="bg-[#245e2c] text-white hover:bg-[#215526] p-2 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

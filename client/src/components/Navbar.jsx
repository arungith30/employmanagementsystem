import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists
  }, []);

  const handleSignout = async () => {
    try {
      // Make a logout request to the backend
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      // Clear token from localStorage
      localStorage.removeItem("token");

      // Update login state
      setIsLoggedIn(false);

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Employee Management System</h1>
          </div>

          {/* Login/Logout Buttons */}
          <div>
            {isLoggedIn ? (
              <button
                onClick={handleSignout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              " "
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

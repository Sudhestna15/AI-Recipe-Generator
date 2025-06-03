import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

 function App() {
  const [showIntro, setShowIntro] = useState(true);
  const handleVideoEnded = () => {
    setShowIntro(false);
  };
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    setUserEmail(email);
  }, []);

  const getInitials = (email) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("user_logged_in");
    localStorage.removeItem("user_email");
    localStorage.removeItem("recipe_attempts");
    setUserEmail(null);
    navigate("/"); // redirect to home or login page
  };

  return (
    <div className="min-h-screen">
      {/* Intro Video Overlay */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <video
            src="/videos/intro.mp4"
            autoPlay
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        </div>
      )}
 <div>
      <nav className="bg-black text-yellow-400 p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">AI Recipe</Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/contact">Contact</Link>

        {!userEmail ? (
  <Link to="/signup" className="...">Sign Up</Link>
) : (
  <div className="relative group">
    <div
      title={userEmail}
      className="bg-red-500 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold cursor-pointer select-none"
    >
      {getInitials(userEmail)}
    </div>

    {/* Dropdown for logout */}
    <div className="absolute right-0 mt-2 w-24 bg-black border border-yellow-400 rounded shadow-lg hidden group-hover:block">
      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-yellow-400 hover:bg-yellow-500 hover:text-black"
      >
        Logout
      </button>
    </div>
  </div>
          )}
        </div>
      </nav>

      {/* This will render the child routes */}
      <Outlet />
    </div>
        </div>

  );
}

export default App;
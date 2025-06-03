import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    // Save user login info (simplified)
    localStorage.setItem("user_logged_in", "true");
    localStorage.setItem("user_email", email);

    // Redirect to recipe page
    navigate("/recipes");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 via-yellow-400 to-black text-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black border p-8 rounded-xl text-yellow-400 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {error && (
          <div className="mb-4 text-red-500 font-semibold text-left">{error}</div>
        )}

        <div className="mb-4 text-left">
          <label className="block mb-2" htmlFor="email">Enter your Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter user name"
            className="w-full border rounded-xl bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 text-left">
          <label className="block mb-2" htmlFor="password">Enter your Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="w-full border rounded-xl bg-transparent p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-xl hover:bg-yellow-600 transition-all"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
}

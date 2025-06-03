import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Recipe() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem("recipe_attempts");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Get user email from localStorage
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    setUserEmail(email);
  }, []);

  const getInitials = (email) => {
    if (!email) return "";
    const namePart = email.split("@")[0];
    return namePart.charAt(0).toUpperCase();
  };

  const handleGenerate = async () => {
    if (!ingredients.trim()) return;

    const isLoggedIn = localStorage.getItem("user_logged_in") === "true";

    if (!isLoggedIn && attempts >= 3) {
      navigate("/signup");
      return;
    }

    setLoading(true);
    setRecipe(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients.split(",").map((i) => i.trim()),
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch recipe");

      const data = await response.json();
      setRecipe(data.recipe);

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("recipe_attempts", newAttempts.toString());
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-yellow-400 to-black p-6 flex flex-col items-center text-center relative">
      {/* User initials icon top right */}
      {userEmail && (
        <div className="absolute top-4 right-4 bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center text-black font-bold text-lg cursor-default select-none shadow-lg">
          {getInitials(userEmail)}
        </div>
      )}

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
        AI Recipe Generator
      </h1>

      <textarea
        rows="5"
        placeholder="Enter ingredients (e.g., eggs, tomatoes, onions)..."
        className="w-full max-w-2xl p-4 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 mb-4"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      <p className="mt-2 text-sm text-white">
        {attempts < 3
          ? `You have ${3 - attempts} free attempt${3 - attempts === 1 ? "" : "s"} left.`
          : "Please sign up to continue using the generator."}
      </p>

      {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}

      {recipe && (
        <div className="mt-8 bg-white text-black p-6 rounded-lg shadow-md max-w-2xl whitespace-pre-line">
          <h2 className="text-xl font-bold mb-2">Generated Recipe</h2>
          <div className="prose text-left">
            <ReactMarkdown>{recipe}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

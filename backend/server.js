import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post("/api/generate-recipe", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ error: "Ingredients are required" });
  }

  try {
    // Step 1: Search recipes matching ingredients
    const searchResponse = await axios.get(
      "https://api.spoonacular.com/recipes/complexSearch",
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          includeIngredients: ingredients.join(","),
          number: 1, // return top 1 recipe
          addRecipeInformation: false, // no extra info here
        },
      }
    );

    const results = searchResponse.data.results;
    if (!results || results.length === 0) {
      return res.json({ recipe: "No recipes found with those ingredients." });
    }

    const recipeId = results[0].id;

    // Step 2: Fetch full recipe info by recipeId
    const recipeInfoResponse = await axios.get(
      `https://api.spoonacular.com/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
        },
      }
    );

    const recipeInfo = recipeInfoResponse.data;

    // Debug: Log full recipeInfo object
    console.log(JSON.stringify(recipeInfo, null, 2));

    // Format ingredients list
    const ingredientsList = recipeInfo.extendedIngredients
      .map((ing) => `- ${ing.original}`)
      .join("\n");

    // Instructions step-by-step or fallback text
    const instructions = recipeInfo.analyzedInstructions.length
      ? recipeInfo.analyzedInstructions[0].steps
          .map((step) => `${step.number}. ${step.step}`)
          .join("\n")
      : "Instructions are not available for this recipe.";

    // Compose clean markdown text with title, ingredients, and instructions
    const recipeText = `
# ${recipeInfo.title}

## Ingredients
${ingredientsList}

## Instructions
${instructions}
    `;

    // Send this as the API response
    res.json({ recipe: recipeText.trim() });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recipe from Spoonacular" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

"use client";

import { useState, useEffect } from "react";
import classes from "./NewRecipeForm.module.css";
import { handleSubmit as serverHandleSubmit } from "../../lib/actions";

export default function NewRecipeForm({ mainRecipeId }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipePercentage, setRecipePercentage] = useState("");
  const [error, setError] = useState("");
  const [totalPercentage, setTotalPercentage] = useState(0);

  useEffect(() => {
    const total = recipes.reduce(
      (acc, recipe) => acc + parseFloat(recipe.percentage || 0),
      0
    );
    setTotalPercentage(total);
  }, [recipes]);

  const addRecipe = () => {
    if (recipeName.trim() === "" || recipePercentage.trim() === "") {
      setError("Recipe name and percentage cannot be empty");
      return;
    }
    setRecipes([
      ...recipes,
      { name: recipeName, percentage: recipePercentage },
    ]);
    setRecipeName("");
    setRecipePercentage("");
    setError(""); // Clear error message if any
  };

  const removeRecipe = (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
  };

  const handleSubmit = async () => {
    try {
      const newRecipes = await serverHandleSubmit({ recipes, mainRecipeId });
      console.log("Recipes successfully added:", newRecipes);
    } catch (error) {
      console.error("Error submitting recipes:", error);
    }
  };

  return (
    <fieldset className={classes.fieldset}>
      <legend className={classes.legend}>New Sub-Recipe</legend>
      <form className={classes.form}>
        <p>
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            type="text"
            id="recipeName"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Recipe Name"
          />
        </p>
        <p>
          <label htmlFor="recipePercentage">Percentage</label>
          <input
            type="number"
            id="recipePercentage"
            value={recipePercentage}
            onChange={(e) => setRecipePercentage(e.target.value)}
            placeholder="Percentage"
          />
        </p>
        {error && <span className={classes.error}>{error}</span>}
        <button type="button" className={classes.button} onClick={addRecipe}>
          Add Recipe
        </button>
      </form>
      <ul className={classes.list}>
        {recipes.map((recipe, index) => (
          <li key={index} className={classes.listItem}>
            {recipe.name} - {recipe.percentage}%
            <button type="button" onClick={() => removeRecipe(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className={classes.total}>
        <strong>Total Percentage: {totalPercentage}%</strong>
      </div>
      <button type="button" className={classes.button} onClick={handleSubmit}>
        Submit Recipes
      </button>
    </fieldset>
  );
}

"use client";

import { useState, useEffect } from "react";
import classes from "./../page.module.css";

export default function NewRecipeIngredientsForm({ recipeId, onSubmit }) {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientPercentage, setIngredientPercentage] = useState("");

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { name: ingredientName, percentage: ingredientPercentage },
    ]);
    setIngredientName("");
    setIngredientPercentage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIngredients = [];
    for (const ingredient of ingredients) {
      const { data, error } = await supabase
        .from("ingredients")
        .insert([{ name: ingredient.name }])
        .single();
      if (data) {
        newIngredients.push({
          recipe_id: recipeId,
          ingredient_id: data.id,
          percentage: ingredient.percentage,
        });
      }
      if (error) {
        console.error("Error creating ingredient:", error);
      }
    }
    onSubmit(newIngredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ingredientName}
        onChange={(e) => setIngredientName(e.target.value)}
        placeholder="Ingredient Name"
      />
      <input
        type="number"
        value={ingredientPercentage}
        onChange={(e) => setIngredientPercentage(e.target.value)}
        placeholder="Percentage"
      />
      <button type="button" onClick={addIngredient}>
        Add Ingredient
      </button>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <span>{ingredient.name}</span>
          <span>{ingredient.percentage}%</span>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

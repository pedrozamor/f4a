"use client";

import { useState } from "react";
import NewRecipeIngredientsForm from "./components/NewRecipeIngredientsForm";
import NewRecipeForm from "./components/NewRecipeForm";
import NewMainRecipeForm from "./components/NewMainRecipeForm";
import { createClient } from "@/utils/supabase/client";

export default function CreateRecipe() {
  const [mainRecipeId, setMainRecipeId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [step, setStep] = useState(1);

  const handleMainRecipeSubmit = (id) => {
    setMainRecipeId(id);
    setStep(2);
  };

  const handleRecipeSubmit = (newRecipes) => {
    setRecipes(newRecipes);
    setStep(3);
  };

  const supabase = createClient();
  const handleIngredientsSubmit = async (newIngredients) => {
    for (const recipe of recipes) {
      const { data, error } = await supabase.from("main_recipe_recipes").insert(
        newIngredients.map((ingredient) => ({
          main_recipe_id: mainRecipeId,
          recipe_id: recipe.recipe_id,
          percentage: recipe.percentage,
        }))
      );

      if (error) {
        console.error("Error associating ingredients:", error);
      }
    }

    // Redirigir o mostrar un mensaje de éxito
  };

  return (
    <div>
      {step === 1 && <NewMainRecipeForm onSubmit={handleMainRecipeSubmit} />}
      {step === 2 && (
        <NewRecipeForm
          mainRecipeId={mainRecipeId}
          onSubmit={handleRecipeSubmit}
        />
      )}
      {step === 3 && (
        <NewRecipeIngredientsForm
          recipeId={mainRecipeId}
          onSubmit={handleIngredientsSubmit}
        />
      )}
    </div>
  );
}

// components/DeleteButton.js
"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteRecipeIngredient } from "@/lib/recipes/actions";
import classes from "./DeleteIngredientButton.module.css";

export default function DeleteIngredientButton({
  recipeId,
  ingredientId,
  slug,
}) {
  async function handleDelete() {
    await deleteRecipeIngredient(recipeId, ingredientId, slug);
    // Puedes agregar lógica adicional aquí, como actualizar el estado del cliente o notificar al usuario
  }

  return (
    <button type="button" onClick={handleDelete}>
      <TrashIcon className={classes.deleteIcon} />
    </button>
  );
}

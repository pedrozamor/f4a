import { getIngredientList } from "@/app/recipes/lib/recipes";
import classes from "./RecipeIngredients.module.css";
import { updateRecipeIngredients } from "@/app/recipes/lib/actions";
import SubmitButton from "../../../components/SubmitButton";
import DeleteIngredientButton from "./DeleteIngredientButton";

export default async function RecipeIngredients({
  idRecipe,
  idMainRecipe,
  slug,
}) {
  const ingredientsList = await getIngredientList(idMainRecipe, idRecipe);

  return (
    <>
      <form className={classes.form} action={updateRecipeIngredients}>
        <input type="hidden" name="recipe_id" value={idRecipe} />
        <input type="hidden" name="slug" value={slug} />
        <table className={classes.ingredientsTable}>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Percentage</th>
              <th>Weight (grams)</th>
              <th>Delete Ingredient</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsList.map((ingredient) => (
              <tr key={ingredient.ingredient_id}>
                <td>{ingredient.name}</td>
                <td>
                  <input
                    type="hidden"
                    name="ingredient_id"
                    value={`ingredient_id_${ingredient.ingredient_id}`}
                  />

                  <input
                    type="number"
                    name={`percentage_${ingredient.ingredient_id}`}
                    defaultValue={ingredient.percentage}
                  />
                </td>
                <td className={classes.centerColumn}>
                  {ingredient.ingredient_weight}
                </td>
                <td className={classes.centerColumn}>
                  <DeleteIngredientButton
                    ingredientId={ingredient.ingredient_id}
                    recipeId={idRecipe}
                    slug={slug}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="action">
                <SubmitButton label="Save" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

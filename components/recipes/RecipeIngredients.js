import getRecipePercentageSummatory, {
  getRecipeIngredients,
} from "@/lib/recipes/recipes";
import classes from "./RecipeIngredients.module.css";
import { updateRecipeIngredients } from "@/lib/recipes/actions";
import SubmitButton from "../SubmitButton";
import DeleteIngredientButton from "../DeleteIngredientButton";

export default async function RecipeIngredients({ id, recipeWeight, slug }) {
  function calcIngredientWeight(percentage, totalWeight, sumPercentage) {
    return ((percentage * totalWeight) / sumPercentage).toFixed(0);
  }

  const ingredientsList = await getRecipeIngredients(id);
  const percentageSummatory = await getRecipePercentageSummatory(id);

  return (
    <>
      <form className={classes.form} action={updateRecipeIngredients}>
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
                <td>{ingredient.ingredient.name}</td>
                <td>
                  <input
                    type="number"
                    name={`percentage.${ingredient.ingredient_id}`}
                    defaultValue={ingredient.percentage}
                  />
                </td>
                <td className={classes.centerColumn}>
                  {calcIngredientWeight(
                    ingredient.percentage,
                    recipeWeight,
                    percentageSummatory
                  )}
                </td>
                <td className={classes.centerColumn}>
                  <DeleteIngredientButton
                    ingredientId={ingredient.ingredient_id}
                    recipeId={id}
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

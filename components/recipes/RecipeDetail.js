import { getMainRecipeRecipes } from "@/lib/recipes/recipes";
import RecipeHeader from "./RecipeHeader";
import RecipeIngredients from "./RecipeIngredients";
import classes from "./RecipeDetail.module.css";

export default async function RecipeDetail({ id, totalWeight }) {
  function CalcRecipeWeight(weight, recipePercentage) {
    return (recipePercentage * weight) / 100;
  }
  const listOfRecipes = await getMainRecipeRecipes(id);

  return (
    <>
      <ul className={classes.ul}>
        {listOfRecipes.map((recipe) => (
          <>
            <li key={`${recipe.recipe_id}Header`}>
              <div className={classes.ListOfRecipes}>
                <RecipeHeader
                  data={recipe}
                  recipeWeight={CalcRecipeWeight(
                    totalWeight,
                    recipe.percentage
                  )}
                />
                <RecipeIngredients
                  id={recipe.recipe_id}
                  recipeWeight={CalcRecipeWeight(
                    totalWeight,
                    recipe.percentage
                  )}
                />
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}

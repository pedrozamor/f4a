import { getRecipeDetails } from "@/app/recipes/lib/recipes";
import RecipeHeader from "./RecipeHeader";
import RecipeIngredients from "./RecipeIngredients";
import classes from "./RecipeDetail.module.css";

export default async function RecipeDetail({ id, slug }) {
  const listOfRecipes = await getRecipeDetails(id);

  return (
    <ul className={classes.ul}>
      {listOfRecipes.map((recipe) => (
        <li key={recipe.recipe_id}>
          <div className={classes.ListOfRecipes}>
            <RecipeHeader data={recipe} slug={slug} />
            <RecipeIngredients
              idRecipe={recipe.recipe_id}
              idMainRecipe={id}
              slug={slug}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

import RecipeItem from "./RecipeItem";
import classes from "./RecipesGrid.module.css";

export default function RecipesGrid({ recipes }) {
  console.log(recipes);
  return (
    <ul className={classes.recipes}>
      {recipes.map((recipe) => (
        <li key={recipe.slug}>
          <RecipeItem {...recipe} />
        </li>
      ))}
    </ul>
  );
}

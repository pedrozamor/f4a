import { updateRecipeHeader } from "@/lib/recipes/actions";
import PercentageSummatory from "./PercentageSummatory";
import classes from "./RecipeHeader.module.css";
import SubmitButton from "../SubmitButton";

export default function RecipeHeader({ data, recipeWeight, slug }) {
  return (
    <header className={classes.recipeHeader}>
      <div className={classes.title}>
        <h2>{data.recipe.name}</h2>
      </div>
      <form className={classes.form} action={updateRecipeHeader}>
        <input
          type="hidden"
          name="main_recipe_id"
          id="main_recipe_id"
          value={data.main_recipe_id}
        />
        <input
          type="hidden"
          name="recipe_id"
          id="recipe_id"
          value={data.recipe_id}
        />
        <input type="hidden" name="slug" id="slug" value={slug} />

        <p>
          <label htmlFor="percentage">Percentage</label>
          <input
            type="number"
            name="percentage"
            defaultValue={data.percentage}
          />
        </p>
        <p>
          <label htmlFor="recipeWeight">Recipe Weight</label>
          <input
            type="number"
            name="recipeWeight"
            defaultValue={recipeWeight}
            readOnly
          />
        </p>
        <PercentageSummatory id={data.recipe_id} />
        <p className="action">
          <SubmitButton label="Save" />
        </p>
      </form>
    </header>
  );
}

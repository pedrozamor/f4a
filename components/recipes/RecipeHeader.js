import { updateRecipeHeader } from "@/lib/recipes/actions";
import PercentageSummatory from "./PercentageSummatory";
import classes from "./RecipeHeader.module.css";
import SubmitButton from "../SubmitButton";
import Input from "../Input";

export default function RecipeHeader({ data, recipeWeight, slug }) {
  return (
    <header className={classes.recipeHeader}>
      <div className={classes.title}>
        <h2>{data.recipe.name}</h2>
      </div>
      <form className={classes.form} action={updateRecipeHeader}>
        <Input
          name={"main_recipe_id"}
          type={"hidden"}
          defaultValue={data.main_recipe_id}
        />
        <Input
          name={"recipe_id"}
          type={"hidden"}
          defaultValue={data.recipe_id}
        />
        <Input name={"slug"} type={"hidden"} defaultValue={slug} />
        <Input
          name={"percentage"}
          type={"number"}
          label={"Percentage"}
          defaultValue={data.percentage}
        />
        <Input
          name={"recipeWeight"}
          type={"number"}
          label={"Recipe Weight"}
          defaultValue={recipeWeight}
          isReadOnly={true}
        />
        <PercentageSummatory id={data.recipe_id} />
        <p className="action">
          <SubmitButton label="Save" />
        </p>
      </form>
    </header>
  );
}

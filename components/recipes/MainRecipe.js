import classes from "./MainRecipe.module.css";
import { notFound } from "next/navigation";
import RecipeDetail from "./RecipeDetail";
import SubmitButton from "../SubmitButton";
import { updateMainRecipe } from "@/lib/recipes/actions";
import SelectOption from "../SelectOption";
import {
  getCategory,
  getPercentageSecondaryRecipes,
  getStatus,
} from "@/lib/recipes/recipes";
import Message from "../Message";
import Input from "../Input";

export default async function MainRecipe({ data }) {
  if (!data) notFound();

  //Default value for the status select options
  const recipe_status_id = data.recipe_status_id;
  //Default value for the category select options
  const recipe_category_id = data.recipe_category_id;
  //Array of status to load the select options
  const arrayStatus = await getStatus();
  //Array of category to load the select options
  const arrayCategory = await getCategory();
  //Summatory of the secondary recipes percentage
  const sumRecipesPercentage = await getPercentageSecondaryRecipes(data.id);
  //Is the secondary recipes percentage summatory is not equal to 100, it must be corrected by the user. This value enables an error message below
  const isPercentageWrong = sumRecipesPercentage != 100;

  return (
    <>
      <header className={classes.recipeHeader}>
        <div className={classes.recipeInfo}>
          <h1>{data.name}</h1>
          <p className={classes.creator}>by {data.users.name}</p>
        </div>
        <form className={classes.form} action={updateMainRecipe}>
          <Input
            name={"id_main_recipe"}
            type={"hidden"}
            defaultValue={data.id}
          />
          <Input name={"slug"} type={"hidden"} defaultValue={data.slug} />
          <Input
            name={"default_total_weight"}
            type={"number"}
            label={"Total Weight"}
            defaultValue={data.default_total_weight}
          />
          <Input
            name={"percentage_profit"}
            type={"number"}
            label={"% Profit"}
            defaultValue={data.percentage_profit}
          />
          <Input
            name={"total_cost"}
            type={"number"}
            label={"Total Cost"}
            defaultValue={data.total_cost}
          />
          <Input
            name={"sale_price"}
            type={"number"}
            label={"Sale Price"}
            defaultValue={data.sale_price}
          />
          <SelectOption
            options={arrayStatus}
            default_value={recipe_status_id}
            title={"Recipe Status"}
            name={"recipe_status_id"}
          />
          <SelectOption
            options={arrayCategory}
            default_value={recipe_category_id}
            title={"Recipe Category"}
            name={"recipe_category_id"}
          />
          <p className="action">
            <SubmitButton label="Save" />
          </p>
          {isPercentageWrong && (
            <Message
              msg="The percentage summatory of the child recipes are not 100%. Please, check the values!"
              typeOfMessage={!isPercentageWrong}
            />
          )}
        </form>
      </header>
      <main>
        <RecipeDetail id={data.id} slug={data.slug} />
      </main>
    </>
  );
}

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
          <input
            name="id_main_recipe"
            id="id_main_recipe"
            type="hidden"
            value={data.id}
          />
          <input name="slug" id="slug" type="hidden" value={data.slug} />
          <p>
            <label htmlFor="default_total_weight">Total Weight</label>
            <input
              type="number"
              name="default_total_weight"
              id="default_total_weight"
              defaultValue={data.default_total_weight}
            />
          </p>
          <p>
            <label htmlFor="percentage_profit">% Profit</label>
            <input
              type="number"
              name="percentage_profit"
              id="percentage_profit"
              defaultValue={data.percentage_profit}
            />
          </p>
          <p>
            <label htmlFor="total_cost">Total Cost</label>
            <input
              type="number"
              name="total_cost"
              id="total_cost"
              defaultValue={data.total_cost}
            />
          </p>
          <p>
            <label htmlFor="sale_price">Sale Price</label>
            <input
              type="number"
              name="sale_price"
              id="sale_price"
              defaultValue={data.sale_price}
            />
          </p>
          <p>
            <SelectOption
              options={arrayStatus}
              default_value={recipe_status_id}
              title={"Recipe Status"}
              name={"recipe_status_id"}
            />
          </p>
          <p>
            <SelectOption
              options={arrayCategory}
              default_value={recipe_category_id}
              title={"Recipe Category"}
              name={"recipe_category_id"}
            />
          </p>
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
        <RecipeDetail
          id={data.id}
          totalWeight={data.default_total_weight}
          slug={data.slug}
        />
      </main>
    </>
  );
}

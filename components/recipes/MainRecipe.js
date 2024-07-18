import classes from "./MainRecipe.module.css";
import { notFound } from "next/navigation";
import RecipeDetail from "./RecipeDetail";
import SubmitButton from "../SubmitButton";
import { updateMainRecipe } from "@/lib/recipes/actions";

export default function MainRecipe({ data }) {
  if (!data) notFound();
  //console.log(data);
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
            <label htmlFor="recipe_status">Recipe Status</label>
            <select name="recipe_status" id="recipe_status">
              <option value="">Prueba</option>
            </select>
          </p>
          <p>
            <label htmlFor="recipe_category">Recipe Category</label>
            <select name="recipe_category" id="recipe_category">
              <option value="">Prueba</option>
            </select>
          </p>
          <p>
            <SubmitButton label="Save" />
          </p>
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

"use client";

import Input from "@/components/Input";
import SelectOption from "@/components/SelectOption";
import classes from "./../page.module.css";
import { useState } from "react";
import NewRecipeForm from "./NewRecipeForm";

export default function MainRecipeDetail({
  status,
  category,
  favorite,
  createNewMainRecipe,
}) {
  const [mainRecipeId, setMainRecipeId] = useState(undefined);

  async function createMainRecipeHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = await createNewMainRecipe(formData);
    setMainRecipeId(id);
  }
  return (
    <>
      <fieldset className={classes.fieldset}>
        <legend className={classes.legend}>Main Recipe</legend>
        <form className={classes.form} onSubmit={createMainRecipeHandler}>
          <Input type={"text"} name={"name"} label={"Name"} isRequired={true} />
          <Input
            type={"number"}
            name={"default_total_weight"}
            label={"Default Total Weight"}
            isRequired={true}
          />
          <Input
            type={"number"}
            name={"percentage_profit"}
            label={"Profit Percentage"}
            defaultValue={10}
          />
          <SelectOption
            options={favorite}
            title={"Is Favorite"}
            name={"is_favorite"}
          />
          <SelectOption
            options={status}
            title={"Recipe Status"}
            name={"recipe_status_id"}
          />
          <SelectOption
            options={category}
            title={"Recipe Category"}
            name={"recipe_category_id"}
          />
          <p className="action">
            <button type="submit" className={classes.button}>
              Add
            </button>
          </p>
        </form>
      </fieldset>
      {mainRecipeId && <NewRecipeForm mainRecipeId={mainRecipeId} />}
    </>
  );
}

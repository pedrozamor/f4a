"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateMainRecipe(formData) {
  const id = formData.get("id_main_recipe");
  const weight = formData.get("default_total_weight");
  const profit = formData.get("percentage_profit");
  const slug = formData.get("slug");

  const MainRecipe = {
    default_total_weight: weight,
    percentage_profit: profit,
  };

  const supabase = createClient();

  const response = await supabase
    .from("main_recipe")
    .update(MainRecipe)
    .filter("id", "eq", id);

  revalidatePath(`/${slug}`);
  console.log(response);
  return;
}

export async function updateRecipeHeader(formData) {
  const main_recipe_id = formData.get("main_recipe_id");
  const recipe_id = formData.get("recipe_id");
  const percentage = formData.get("percentage");
  const slug = formData.get("slug");

  const MainRecipeRecipe = { percentage: percentage };
  const supabase = createClient();

  const response = await supabase
    .from("main_recipe_recipes")
    .update(MainRecipeRecipe)
    .filter("main_recipe_id", "eq", main_recipe_id)
    .filter("recipe_id", "eq", recipe_id);

  console.log(response);
  revalidatePath(`/${slug}`);
  return;
}

export async function updateRecipeIngredients(formData) {
  const rawFormData = Object.fromEntries(formData.entries());
  /*const ingredient_id = formData.get("ingredient_id");
  const percentage = formData.get("percentage");*/

  console.log(rawFormData);
  /*const response = await supabase.from("recipe_ingredients").upsert([
    { id: 1, qty: 11 },
    { id: 2, qty: 9 },
    { id: 3, qty: 6 },
  ]);*/
}

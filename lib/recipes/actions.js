"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function updateMainRecipe(formData) {
  const id = formData.get("id_main_recipe");
  const weight = formData.get("default_total_weight");
  const profit = formData.get("percentage_profit");
  const status = formData.get("recipe_status_id");
  const category = formData.get("recipe_category_id");
  const slug = formData.get("slug");

  const MainRecipe = {
    default_total_weight: weight,
    percentage_profit: profit,
    recipe_status_id: status,
    recipe_category_id: category,
  };

  const supabase = createClient();

  const { error } = await supabase
    .from("main_recipe")
    .update(MainRecipe)
    .filter("id", "eq", id);

  if (error) {
    console.log(error);
    return redirect(`/${slug}?message=Unable to save the recipe. Try again!`);
  }
  revalidatePath(`/${slug}`);
  return;
}

export async function updateRecipeHeader(formData) {
  const main_recipe_id = formData.get("main_recipe_id");
  const recipe_id = formData.get("recipe_id");
  const percentage = formData.get("percentage");
  const slug = formData.get("slug");

  const MainRecipeRecipe = { percentage: percentage };
  const supabase = createClient();

  const { error } = await supabase
    .from("main_recipe_recipes")
    .update(MainRecipeRecipe)
    .filter("main_recipe_id", "eq", main_recipe_id)
    .filter("recipe_id", "eq", recipe_id);

  if (error) {
    console.log(error);
    return redirect(`/${slug}?message=Unable to save the recipe. Try again!`);
  }
  revalidatePath(`/${slug}`);
  return;
}

export async function deleteRecipeIngredient(recipe_id, ingredient_id, slug) {
  const supabase = createClient();
  const { error } = await supabase
    .from("recipe_ingredients")
    .delete()
    .filter("recipe_id", "eq", recipe_id)
    .filter("ingredient_id", "eq", ingredient_id);

  if (error) {
    console.log(error);
    return redirect(`/${slug}?message=Unable to save the recipe. Try again!`);
  }
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

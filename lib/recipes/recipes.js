import { createClient } from "@/utils/supabase/server";

export async function getMainRecipeRecipes(id) {
  const supabase = createClient();
  const response = await supabase
    .from("main_recipe_recipes")
    .select("main_recipe_id, recipe_id, percentage, recipe (name)")
    .filter("main_recipe_id", "eq", id);
  return response.data ?? [];
}

export async function getRecipeIngredients(id) {
  const supabase = createClient();
  const response = await supabase
    .from("recipe_ingredients")
    .select(`recipe_id, ingredient_id, percentage, ingredient (name) `)
    .filter("recipe_id", "eq", id);
  return response.data ?? [];
}

export default async function getRecipePercentageSummatory(id) {
  const supabase = createClient();
  const response = await supabase
    .from("recipe_ingredients_sum_percentage")
    .select("sum")
    .filter("recipe_id", "eq", id)
    .single();
  return response.data.sum;
}

export async function getStatus() {
  const supabase = createClient();
  const response = await supabase.from("recipe_status").select("id, name");
  return response.data ?? [];
}

export async function getCategory() {
  const supabase = createClient();
  const response = await supabase.from("recipe_category").select("id, name");
  return response.data ?? [];
}

export async function getPercentageSecondaryRecipes(id) {
  const supabase = createClient();
  const response = await supabase
    .from("secondary_recipes_sum_percentage")
    .select("sum")
    .filter("main_recipe_id", "eq", id)
    .single();
  return response.data.sum;

  /*
  select sum(percentage) from main_recipe_recipes
  where main_recipe_id = 'd05264bd-c07d-4283-b92f-aa2eb3c1adc6'
  */
}

/* const { error } = await supabase
  .from('countries')
  .update({ name: 'Australia' })
  .eq('id', 1) */

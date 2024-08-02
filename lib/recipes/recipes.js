import { createClient } from "@/utils/supabase/server";

export async function getIngredientList(main_recipe_id, recipe_id) {
  const supabase = createClient();
  const parameters = {
    p_recipe_id: recipe_id,
    p_main_recipe_id: main_recipe_id,
  };

  const { data, error } = await supabase.rpc("get_ingredient_list", parameters);
  if (error) {
    throw new Error(
      "Unable to load the list of ingredients. Please, try again. If the error persist, contact the system administrator"
    );
  }
  return data;
}

export async function getRecipeDetails(main_recipe_id) {
  const supabase = createClient();

  const parameters = {
    p_main_recipe_id: main_recipe_id,
  };

  const { data, error } = await supabase.rpc("get_recipe_details", parameters);
  if (error) {
    throw new Error(
      "Unable to load the list of ingredients. Please, try again. If the error persist, contact the system administrator"
    );
  }
  return data;
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
}

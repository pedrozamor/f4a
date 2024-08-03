"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import generateUniqueSlug from "./slugGenerator";

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
    throw new Error(
      "Unable to save the recipe. Please, try again. If the error persist, contact the system administrator"
    );
  }
  revalidatePath(`/${slug}`);
  return;
}

export async function deleteRecipeIngredient(recipe_id, ingredient_id, slug) {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("recipe_ingredients")
    .delete()
    .filter("recipe_id", "eq", recipe_id)
    .filter("ingredient_id", "eq", ingredient_id)
    .filter("user_id", "eq", data.user.id);

  console.log(error);

  if (error) {
    throw new Error(
      "Unable to delete the ingredient. Please, try again. If the error persist, contact the system administrator"
    );
  }
  revalidatePath(`/${slug}`);
  return;
}

export async function updateRecipeIngredients(formData) {
  const recipeId = formData.get("recipe_id");
  const slug = formData.get("slug");

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const updates = [];

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("percentage_")) {
      const ingredientId = key.replace("percentage_", "");
      updates.push({
        ingredient_id: ingredientId,
        recipe_id: recipeId,
        percentage: value,
        user_id: user.id,
      });
    }
  }

  try {
    const { error } = await supabase.from("recipe_ingredients").upsert(updates);
    console.log(error);
    /*if (error) {
      throw new Error(
        "Unable to update the percentages. Please, try again. If the error persist, contact the system administrator"
      );
    }*/
    revalidatePath(`/${slug}`);
    return;
  } catch (error) {
    console.error("Error updating recipe ingredients:", error);
    throw error;
  }
}

export async function newMainRecipe(formData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const uniqueSlug = await generateUniqueSlug(formData.get("name"));
  console.log(uniqueSlug);

  const dataInsert = {
    name: formData.get("name"),
    slug: uniqueSlug,
    default_total_weight: formData.get("default_total_weight"),
    percentage_profit: formData.get("percentage_profit"),
    recipe_status_id: formData.get("recipe_status_id"),
    recipe_category_id: formData.get("recipe_category_id"),
    is_favorite: formData.get("is_favorite"),
    user_id: data.user.id,
  };
  try {
    const { error } = await supabase.from("main_recipe").insert(dataInsert);

    if (error) {
      throw new Error(
        "Unable to create new recipe. Please, try again. If the error persist, contact the system administrator"
      );
    }
    redirect(`/recipes/new/${uniqueSlug}`);
    return;
  } catch (error) {
    console.error("Error updating recipe ingredients:", error);
    throw error;
  }
}

export async function newRecipe(recipes) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  for (const recipe of recipes) {
    if (!recipe || !recipe.name) {
      console.error("Invalid recipe:", recipe);
      continue;
    }

    const dataInsert = {
      name: recipe.name,
      user_id: user.id,
    };
    console.log("recipe: ", recipe);
    console.log("dataInsert: ", dataInsert);
  }
  /*const { dataReturn, error } = await supabase
    .from("recipe")
    .insert(dataInsert)
    .single();
  console.log("dataReturn: ", dataReturn);*/

  /*const { data, error } = await newRecipe(recipe.name);
    if (data) {
      newRecipes.push({
        main_recipe_id: mainRecipeId,
        recipe_id: data.id,
        percentage: recipe.percentage,
      });
    }*/

  //console.log("dataInsert: ", dataInsert);

  //return dataReturn;
}
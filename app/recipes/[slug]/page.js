import MainRecipe from "@/components/recipes/MainRecipe";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

async function Recipe({ slug }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("main_recipe")
    .select(`*, users (name), recipe_status (name), recipe_category (name)`)
    .match({ slug })
    .single();
  return <MainRecipe data={data} />;
}

export default function RecipeDetailsPage({ params }) {
  return <Recipe slug={params.slug} />;
}

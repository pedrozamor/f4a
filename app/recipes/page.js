import RecipesGrid from "@/components/recipes/RecipesGrid";
import classes from "./page.module.css";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const revalidate = 0;

async function Recipes() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("main_recipe")
    .select(`*, users (name), recipe_status (name), recipe_category (name)`);

  if (error) redirect("/error.js");
  return <RecipesGrid recipes={data} />;
}

export default function RecipesPage() {
  return (
    <main className={classes.main}>
      <div className={classes.header}>
        <h1>Your recipes</h1>
        <Link href="/recipes/new" className={classes.HeaderButton}>
          Create Recipe
        </Link>
      </div>
      <div className={classes.content}>
        <Suspense fallback={<p className={classes.loading}>Fetching Data</p>}>
          <Recipes />
        </Suspense>
      </div>
    </main>
  );
}

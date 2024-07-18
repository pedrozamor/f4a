import RecipesGrid from "@/components/recipes/RecipesGrid";
import classes from "./page.module.css";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const revalidate = 0;

async function Recipes() {
  const supabase = createClient();
  const { data, error } = await supabase.from("main_recipe").select();

  if (error) redirect("/error.js");
  return <RecipesGrid recipes={data} />;
}

export default function RecipesPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>Your recipes</h1>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching Data</p>}>
          <Recipes />
        </Suspense>
      </main>
    </>
  );
}

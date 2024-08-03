import NewMainRecipeForm from "./components/NewMainRecipeForm";
import NewRecipeForm from "./components/NewRecipeForm";
import classes from "./page.module.css";
import Link from "next/link";

export default function NewRecipe() {
  return (
    <main className={classes.main}>
      <div className={classes.header}>
        <h1>New Recipe</h1>
        <Link href={"/recipes"} className={classes.button}>
          Back
        </Link>
      </div>
      <NewMainRecipeForm />
      <NewRecipeForm />
    </main>
  );
}

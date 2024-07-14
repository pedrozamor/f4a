import Link from "next/link";
import classes from "./page.module.css";
//import ShowUser from "@/components/login/ShowUser";

export default function Home() {
  return (
    <>
      <main className={classes.main}>
        <section className={classes.card}>
          <h1>The tool to standardize your recipes</h1>
        </section>
        <section className={classes.card}>
          <p>
            By turning your recipes into formulas, you can calculate the actual
            production cost of your products. You just have to add the
            ingredient, its weight, its cost, and we do the rest.
          </p>
        </section>
      </main>
    </>
  );
}

import classes from "./RecipeItem.module.css";
import Link from "next/link";

export default function RecipeItem({ name, id, slug, summary, creator }) {
  return (
    <article className={classes.recipe}>
      <header>
        <div className={classes.headerText}>
          <h2>{name}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/recipes/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

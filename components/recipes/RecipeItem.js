import classes from "./RecipeItem.module.css";
import Link from "next/link";

export default function RecipeItem({
  name,
  slug,
  recipe_status,
  recipe_category,
  users,
}) {
  return (
    <article className={classes.recipe}>
      <header>
        <div className={classes.headerText}>
          <h2>{name}</h2>
          <p>by {users.name}</p>
        </div>
      </header>
      <div className={classes.content}>
        <table className={classes.recipeTable}>
          <tbody>
            <tr>
              <th>Category</th>
              <td>{recipe_category.name}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{recipe_status.name}</td>
            </tr>
          </tbody>
        </table>
        <div className={classes.actions}>
          <Link href={`/recipes/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

import SubmitButton from "../SubmitButton";

export default async function IngredientsList() {
  function calcIngredientWeight(percentage, totalWeight, sumPercentage) {
    return ((percentage * totalWeight) / sumPercentage).toFixed(0);
  }

  const ingredientsList = await getRecipeIngredients(id);
  const percentageSummatory = await getRecipePercentageSummatory(id);
  return (
    <table className={classes.ingredientsTable}>
      <thead>
        <tr>
          <th>Ingredient</th>
          <th>Percentage</th>
          <th>Weight (grams)</th>
        </tr>
      </thead>
      <tbody>
        {ingredientsList.map((ingredient) => (
          <tr key={ingredient.ingredient_id}>
            <td>{ingredient.ingredient.name}</td>
            <td>
              <input
                type="number"
                name={`percentage.${ingredient.ingredient_id}`}
                defaultValue={ingredient.percentage}
                onChange={async (e) => {
                  await updateRecipeIngredients(e.target.value);
                }}
              />
            </td>
            <td>
              {calcIngredientWeight(
                ingredient.percentage,
                recipeWeight,
                percentageSummatory
              )}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}>
            <SubmitButton label="Save" />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

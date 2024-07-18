import { createClient } from "@/utils/supabase/server";

export default async function PercentageSummatory({ id }) {
  const supabase = createClient();
  const response = await supabase
    .from("recipe_ingredients_sum_percentage")
    .select("sum")
    .filter("recipe_id", "eq", id);
  return (
    <p>
      <label htmlFor={`${id}sum`}>% Summatory</label>
      <input
        type="number"
        name={`${id}sum`}
        defaultValue={response.data[0].sum}
        readOnly
      />
    </p>
  );
}

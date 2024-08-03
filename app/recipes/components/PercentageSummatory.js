import { createClient } from "@/utils/supabase/server";
import Input from "../../../components/Input";

export default async function PercentageSummatory({ id }) {
  const supabase = createClient();
  const response = await supabase
    .from("recipe_ingredients_sum_percentage")
    .select("sum")
    .filter("recipe_id", "eq", id);
  return (
    <Input
      name={`${id}sum`}
      type={"number"}
      label={"% Summatory"}
      defaultValue={response.data[0].sum}
      isReadOnly={true}
    />
  );
}

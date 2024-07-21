import { getStatus } from "@/lib/recipes/recipes";

export default async function SelectOption({
  options,
  default_value,
  title,
  name,
}) {
  return (
    <>
      <label>{title}</label>
      <select name={name} defaultValue={default_value}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

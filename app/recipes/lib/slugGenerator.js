import { createClient } from "@/utils/supabase/server";

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
};

export default async function generateUniqueSlug(name) {
  const supabase = createClient();
  let slug = generateSlug(name);
  let { data } = await supabase
    .from("main_recipe")
    .select("slug")
    .ilike("slug", `${slug}%`);

  if (data.length === 0) return slug;

  const slugList = data.map((item) => item.slug);
  let newSlug = slug;
  let suffix = 1;

  while (slugList.includes(newSlug)) {
    newSlug = `${slug}-${suffix}`;
    suffix += 1;
  }

  return newSlug;
}

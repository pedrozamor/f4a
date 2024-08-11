import { getCategory, getStatus } from "@/app/recipes/lib/recipes";
//import { newMainRecipe, newRecipe } from "@/app/recipes/lib/actions";
import MainRecipeDetail from "./MainRecipeDetail";

export default async function NewMainRecipeForm() {
  //Array of status to load the select options
  const arrayStatus = await getStatus();
  //Array of category to load the select options
  const arrayCategory = await getCategory();
  //Array of Favorite options
  const arrayFavorite = [
    { id: true, name: "YES" },
    { id: false, name: "NO" },
  ];

  function onMainRecipeCreateHandler() {}

  return (
    <>
      <MainRecipeDetail
        status={arrayStatus}
        category={arrayCategory}
        favorite={arrayFavorite}
      />
    </>
  );
}

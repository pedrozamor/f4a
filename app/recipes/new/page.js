import Input from "@/components/Input";
import classes from "./page.module.css";
import SubmitButton from "@/components/SubmitButton";
import { getCategory, getStatus } from "@/app/recipes/lib/recipes";
import SelectOption from "@/components/SelectOption";
import Link from "next/link";
import { newMainRecipe } from "@/app/recipes/lib/actions";

export default async function NewRecipe() {
  //Array of status to load the select options
  const arrayStatus = await getStatus();
  //Array of category to load the select options
  const arrayCategory = await getCategory();
  //Array of Favorite options
  const arrayFavorite = [
    { id: true, name: "YES" },
    { id: false, name: "NO" },
  ];

  return (
    <>
      <main className={classes.main}>
        <div className={classes.header}>
          <h1>New Main Recipe</h1>
          <Link href={"/recipes"} className={classes.HeaderButton}>
            Back
          </Link>
        </div>
        <form className={classes.form} action={newMainRecipe}>
          <Input type={"text"} name={"name"} label={"Name"} isRequired={true} />
          <Input
            type={"number"}
            name={"default_total_weight"}
            label={"Default Total Weight"}
            isRequired={true}
          />
          <Input
            type={"number"}
            name={"percentage_profit"}
            label={"Profit Percentage"}
            defaultValue={10}
          />
          <SelectOption
            options={arrayFavorite}
            title={"Is Favorite"}
            name={"is_favorite"}
          />
          <SelectOption
            options={arrayStatus}
            title={"Recipe Status"}
            name={"recipe_status_id"}
          />
          <SelectOption
            options={arrayCategory}
            title={"Recipe Category"}
            name={"recipe_category_id"}
          />
          <p className="action">
            <SubmitButton label="Save" />
          </p>
        </form>
      </main>
    </>
  );
}

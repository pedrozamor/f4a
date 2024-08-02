import { createClient } from "@/utils/supabase/server";
import classes from "./../page.module.css";
import Input from "@/components/Input";

async function MainRecipeChilds({ slug }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("main_recipe")
    .select(`*, users (name), recipe_status (name), recipe_category (name)`)
    .match({ slug })
    .single();

  console.log(data);
  return (
    <>
      <main className={classes.main}>
        <div className={classes.header}>
          <h1>{data.name}</h1>
        </div>
        <form className={classes.form} action="">
          <Input type={"text"} name={"name"} label={"Name"} isRequired={true} />
        </form>
      </main>
    </>
  );
}

export default function NewRecipeDetailsPage({ params }) {
  return <MainRecipeChilds slug={params.slug} />;
}

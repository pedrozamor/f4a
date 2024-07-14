const { createClient } = require("@/utils/supabase/server");
const { cookies } = require("next/headers");
import classes from "./ShowUser.module.css";

export default async function ShowUser() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  return (
    !error && <p className={classes.user}>Welcome back {data.user.email}</p>
  );
}

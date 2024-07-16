const { createClient } = require("@/utils/supabase/server");
import classes from "./ShowUser.module.css";

export default async function ShowUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data && data.user) {
    return <p className={classes.user}>Hello, {data.user.email}</p>;
  }

  return null;
}

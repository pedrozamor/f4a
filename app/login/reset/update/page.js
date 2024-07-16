import { updatePassword } from "../../actions";
import classes from "../../page.module.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function handleToken(queryString) {
  const supabase = createClient();
  const token = request.url.split("?")[1]; // Obtener el token del query string
  const { error } = await supabase.auth.api.verifyPasswordResetToken(token);
  if (error) {
    redirect("/error");
  }
}

export default function forgotPassword(request) {
  handleToken(request);
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes.fields}>
          <p>
            <label htmlFor="password_1">New password:</label>
            <input id="password_1" name="password_1" type="password" required />
          </p>
          <p>
            <label htmlFor="password_2">Rewrite your password:</label>
            <input id="password_2" name="password_2" type="password" required />
          </p>
          <p className={classes.actions}>
            <button formAction={updatePassword}>Update Password</button>
          </p>
        </div>
      </form>
    </main>
  );
}

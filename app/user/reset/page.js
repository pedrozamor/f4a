import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import classes from "../page.module.css";
//import { updatePassword } from "../actions";

export default async function ResetPassword({ searchParams }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const resetPassword = async (formData) => {
    "use server";

    const password = formData.get("password");
    const supabase = createClient();

    if (searchParams.code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(
        searchParams.code
      );

      if (error) {
        return redirect(
          `/user/reset?message=Unable to reset Password. Link expired!`
        );
      }
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.log(error);
      return redirect(
        `/user/reset?message=Unable to reset Password. Try again!`
      );
    }

    redirect(
      `/user/login?message=Your Password has been reset successfully. Sign in.`
    );
  };

  if (searchParams?.error) {
    return redirect(`/user/forgot?message=${searchParams?.error_description}`);
  }

  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes.fields}>
          <p>
            <label className="text-md" htmlFor="password">
              New Password
            </label>
            <input
              className=""
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </p>
          <p>
            <label className="" htmlFor="password">
              Confirm New Password
            </label>
            <input
              className=""
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              required
            />
          </p>
          <p className={classes.actions}>
            <button formAction={resetPassword}>Reset</button>
          </p>

          {searchParams?.message && <p className="">{searchParams.message}</p>}
        </div>
      </form>
    </main>
  );
}

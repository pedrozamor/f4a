import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import classes from "../page.module.css";
import { resetPassword } from "../actions";

export default async function ForgotPassword({ searchParams }) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes.fields}>
          <p>
            <label htmlFor="email">Enter Email Address</label>
            <input
              name="email"
              placeholder="you@example.com"
              type="email"
              required
            />
          </p>
          <p className={classes.actions}>
            <button formAction={resetPassword}>Confirm</button>
          </p>
          <p>
            <Link href="/user/login" className="">
              Remember your password? Sign in
            </Link>
          </p>
          {searchParams?.message && <p className="">{searchParams.message}</p>}
        </div>
      </form>
    </main>
  );
}

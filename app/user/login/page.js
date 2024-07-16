import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import classes from "../page.module.css";
import { login } from "../actions";

export default async function Login({ searchParams }) {
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
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              className=""
              name="email"
              placeholder="you@example.com"
              required
            />
          </p>
          <p>
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              className=""
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </p>
          <p className={classes.actions}>
            <button formAction={login}>Sign In</button>
          </p>
          <p>
            <Link href="/user/signup" className="">
              Dont have an Account? Sign Up
            </Link>
          </p>
          <p>
            <Link href="/user/forgot" className="">
              Forgotten Password.
            </Link>
          </p>

          {searchParams?.message && <p className="">{searchParams.message}</p>}
        </div>
      </form>
    </main>
  );
}

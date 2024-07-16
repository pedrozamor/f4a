import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signup } from "../actions";
import classes from "../page.module.css";

export default async function Signup({ searchParams }) {
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
              type="email"
              required
            />
          </p>
          <p>
            <label className="text-md" htmlFor="password">
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
          <p>
            <label className="" htmlFor="password">
              Confirm Password
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
            <button formAction={signup}>Sign up</button>
          </p>
          <p>
            <Link href="/user/login" className="">
              Already have an account? Sign In
            </Link>
          </p>
          {searchParams?.message && <p className="">{searchParams.message}</p>}
        </div>
      </form>
    </main>
  );
}

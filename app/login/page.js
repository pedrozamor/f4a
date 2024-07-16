import { login, signup } from "./actions";
import classes from "./page.module.css";
import RedirectButton from "@/components/RedirectButton";

export default function LoginPage() {
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes.fields}>
          <p>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
          </p>
          <p>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
          </p>
          <p className={classes.actions}>
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
            <RedirectButton URL="/login/reset">
              Forgot your password?
            </RedirectButton>
          </p>
        </div>
      </form>
    </main>
  );
}

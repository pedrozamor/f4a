import { resetPassword } from "../actions";
import classes from "../page.module.css";

export default function forgotPassword() {
  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <div className={classes.fields}>
          <p>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
          </p>
          <p className={classes.actions}>
            <button formAction={resetPassword}>Send Confirmation email</button>
          </p>
        </div>
      </form>
    </main>
  );
}

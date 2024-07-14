import { signOut } from "@/lib/login/handleUsers";
import classes from "./MainHeaderButtons.module.css";

export default function SignOutButton() {
  return (
    <form>
      <button className={classes.HeaderButton} formAction={signOut}>
        Sign Out
      </button>
    </form>
  );
}

import Link from "next/link";
import classes from "./MainHeaderButtons.module.css";
import { isLogin } from "@/lib/login/handleUsers";
import SignOutButton from "./SignOutButton";

export default async function MainHeaderButtons() {
  const is_Login = await isLogin();

  return (
    <>
      {!is_Login && (
        <Link href="/user/login" className={classes.HeaderButton}>
          Sign In
        </Link>
      )}
      {is_Login && <SignOutButton />}
    </>
  );
}

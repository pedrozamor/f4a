"use client";

import { redirect } from "next/navigation";
import classes from "./MainHeaderButtons.module.css";

export default function LoginButton() {
  function redirectToLoginPage() {
    redirect("/login");
  }
  return (
    <form>
      <button className={classes.HeaderButton} onClick={redirectToLoginPage}>
        Login
      </button>
    </form>
  );
}

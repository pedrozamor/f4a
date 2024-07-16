import classes from "./MainHeader.module.css";
import Link from "next/link";
import NavLink from "./NavLink";
import F4aLogo from "../F4aLogo";
import MainHeaderButtons from "../login/MainHeaderButtons";
import ShowUser from "../login/ShowUser";

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <div className={classes.imgContainer}>
          <F4aLogo />
        </div>
        <p>
          Formula <span className={classes.redText}>4</span> All
        </p>
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/recipes">Recipes</NavLink>
          </li>
          <li>
            <NavLink href="/about">About</NavLink>
          </li>
          <li>
            <ShowUser />
          </li>
          <li>
            <MainHeaderButtons />
          </li>
        </ul>
      </nav>
    </header>
  );
}

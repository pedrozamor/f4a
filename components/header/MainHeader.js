import Link from "next/link";
import LogoImage from "@/assets/logo-f4a4.png";
import Image from "next/image";
import NavLink from "./NavLink";
//import MainHeaderButtons from "../login/MainHeaderButtons";

export default function MainHeader() {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white shadow-md">
      <Link
        href="/"
        className="flex items-center justify-center space-x-2 no-underline text-blue-800 font-bold font-montserrat tracking-wider uppercase text-xl"
      >
        <Image
          className="w-20 h-20 object-contain"
          src={LogoImage.src}
          alt="Logotipo"
          priority
          width="512"
          height="512"
        />
        <p>Formula 4 All</p>
      </Link>
      <nav className="">
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
          <li>{/*<MainHeaderButtons />*/}</li>
        </ul>
      </nav>
    </header>
  );
}

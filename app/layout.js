import { Inter } from "next/font/google";
import {} from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/header/MainHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Formula 4 All",
  description: "STANDARDIZE YOUR RECIPES",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}

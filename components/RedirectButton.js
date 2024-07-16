"use client";
import { useRouter } from "next/navigation";

export default function RedirectButton({ children, URL }) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(URL);
  };

  return (
    <button type="button" onClick={handleRedirect}>
      {children}
    </button>
  );
}

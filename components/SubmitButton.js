"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ label }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      {label}
    </button>
  );
}

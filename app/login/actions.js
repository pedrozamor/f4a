"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function login(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return redirect("/signup?message=Passwords do not match");
  }

  const data = {
    email: email,
    password: password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return redirect("/signup?message=Could not authenticate user");
  }

  return redirect(
    `/confirm?message=Check email(${email}) to continue sign in process`
  );

  /* if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");*/
}

export async function resetPassword(formData) {
  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email"),
    {
      redirectTo: "http://localhost:3000/login/reset/update",
    }
  );
  if (error) {
    redirect("/error");
  }
}

export async function updatePassword(formData) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: formData.get("password"),
  });

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

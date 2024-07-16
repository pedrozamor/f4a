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
    return redirect("/user/login?message=Could not authenticate user");
  }
  revalidatePath("/", "layout");
  return redirect("/");
}

export async function signup(formData) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return redirect("/user/signup?message=Passwords do not match");
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
    return redirect("/user/signup?message=Could not authenticate user");
  }

  return redirect(
    `/user/confirm?message=Check email(${email}) to continue sign in process`
  );
}

export async function resetPassword(formData) {
  const supabase = createClient();
  const origin = headers().get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email"),
    {
      redirectTo: `${origin}/user/reset`,
    }
  );
  console.log(error);
  if (error) {
    return redirect("/user/forgot?message=Could not authenticate user");
  }

  return redirect(
    "/user/confirm?message=Password Reset link has been sent to your email address"
  );
}

export async function updatePassword(formData) {
  const supabase = createClient();
  const password = formData.get("password");

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.log(error);
    return redirect(
      `/user/forgot?message=Unable to reset Password. Try again!`
    );
  }

  redirect(
    `/user/login?message=Your Password has been reset successfully. Sign in.`
  );
}

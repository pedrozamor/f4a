"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error === null) {
    revalidatePath("/");
    //redirect("/");
  }
}

export async function isLogin() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return data.user === null ? false : true;
}

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function signOut() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.signOut();
  if (error === null) {
    revalidatePath("/");
    //redirect("/");
  }
}

export async function isLogin() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  return data.user === null ? false : true;
}

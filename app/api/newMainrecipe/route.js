// app/api/newMainRecipe/route.js
import { newMainRecipe } from "@/app/recipes/lib/actions";

export async function POST(request) {
  const formData = await request.formData();
  try {
    const id = await newMainRecipe(formData);
    return new Response(JSON.stringify({ id }), { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

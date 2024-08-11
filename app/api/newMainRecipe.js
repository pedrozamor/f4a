// /pages/api/newMainRecipe.js
import { newMainRecipe } from "@/app/recipes/lib/actions";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const mainRecipeId = await newMainRecipe(req.body);
      res.status(200).json({ mainRecipeId });
    } catch (error) {
      res.status(500).json({ error: "Failed to create main recipe" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

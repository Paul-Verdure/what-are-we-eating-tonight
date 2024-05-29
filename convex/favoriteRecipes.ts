import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

export const getFavoriteRecipes = query({
  args: {},
  handler: async (ctx) => {
    const favoriteRecipes = await ctx.db.query("favoriteRecipes").collect();
    const user = await getCurrentUser(ctx);
    return Promise.all(
      favoriteRecipes.filter((recipe) => recipe.userId === user?.externalId)
    );
  },
});

export const addRecipeAndFavorite = mutation({
  args: {
    recipeId: v.string(),
    name: v.string(),
    ingredients: v.array(v.string()),
    instructions: v.array(v.string()),
  },
  handler: async (ctx, { recipeId, name, ingredients, instructions }) => {
    // Add the recipe to the user's favorite recipes
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("favoriteRecipes", {
      userId: user.externalId,
      recipeId,
      name,
      ingredients,
      instructions,
    });
  },
});
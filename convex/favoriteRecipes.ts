import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser, getCurrentUserOrThrow } from "./users";

export const getFavoriteRecipes = query({
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
    title: v.string(),
    description: v.string(),
    ingredients: v.array(v.string()),
    steps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // Add the recipe to the user's favorite recipes
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("favoriteRecipes", {
      userId: user.externalId,
      title: args.title,
      description: args.description,
      ingredients: args.ingredients,
      steps: args.steps,
    });
  },
});

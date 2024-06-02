import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { Card, CardContent } from "./components/ui/card";
import { FavoriteRecipeDetailsDialog } from "./components/FavoriteRecipeDetailsDialog/FavoriteRecipeDetailsDialog";

export default function MyRecipes() {
  const favoriteRecipes = useQuery(api.favoriteRecipes.getFavoriteRecipes);

  console.log("favoriteRecipes", favoriteRecipes);

  return (
    <div>
      <h1 className="font-semibold tracking-tight text-center">My Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {favoriteRecipes?.map((recipe) => (
          <Card key={recipe?._id}>
            <CardContent className="p-4">
              <h3 className="font-semibold tracking-tight">{recipe?.title}</h3>
              <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                {recipe?.description}
              </p>
              <FavoriteRecipeDetailsDialog recipe={recipe} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

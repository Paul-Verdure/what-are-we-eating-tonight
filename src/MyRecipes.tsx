import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";
import { Card, CardContent } from "./components/ui/card";
import { FavoriteRecipeDetailsDialog } from "./components/FavoriteRecipeDetailsDialog/FavoriteRecipeDetailsDialog";

export default function MyRecipes() {
  const favoriteRecipes = useQuery(api.favoriteRecipes.getFavoriteRecipes);

  console.log("favoriteRecipes", favoriteRecipes);

  return (
    <section className="container px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tighter">
          My favorite recipes
        </h1>
        {favoriteRecipes ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {favoriteRecipes.map((recipe) => (
              <Card key={recipe?._id}>
                <CardContent className="p-4 flex flex-col h-full justify-evenly gap-3">
                  <h3 className="font-semibold tracking-tight">
                    {recipe?.title}
                  </h3>
                  <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                    {recipe?.description}
                  </p>
                  <FavoriteRecipeDetailsDialog recipe={recipe} />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="animate-pulse container">
            <h3 className="font-semibold tracking-tight text-center">
              Loading your favorite recipes...
            </h3>
          </div>
        )}

        {favoriteRecipes?.length === 0 && (
          <div className="container">
            <h3 className="font-semibold tracking-tight text-center">
              You haven't saved any recipes yet.
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}

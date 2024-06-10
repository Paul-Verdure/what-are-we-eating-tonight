import { api } from '../convex/_generated/api'
import { useQuery } from 'convex/react'
import { Card, CardContent } from './components/ui/card'
import { FavoriteRecipeDetailsDialog } from './components/FavoriteRecipeDetailsDialog/FavoriteRecipeDetailsDialog'

export default function MyRecipes() {
  const favoriteRecipes = useQuery(api.favoriteRecipes.getFavoriteRecipes)

  return (
    <section className="text-center md:mb-12">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        My favorite recipes
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
        Here are the recipes you saved. Enjoy! 😋
      </p>
      {favoriteRecipes ? (
        <div className="mt-12 grid place-content-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {favoriteRecipes.map((recipe) => (
            <Card
              key={recipe?._id}
              className="max-w-sm overflow-hidden rounded shadow-lg"
            >
              <CardContent className="flex h-full flex-col justify-between gap-8 px-4 py-8">
                <h3 className="text-lg font-semibold tracking-tight">
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
        <div className="container animate-pulse mt-12">
          <h3 className="text-center font-semibold tracking-tight">
            Loading your favorite recipes... 😋
          </h3>
        </div>
      )}

      {favoriteRecipes?.length === 0 && (
        <div className="container">
          <h3 className="text-center font-semibold tracking-tight">
            You haven't saved any recipes yet.
          </h3>
        </div>
      )}
    </section>
  )
}

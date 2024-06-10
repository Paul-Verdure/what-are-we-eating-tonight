import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { api } from '../../../convex/_generated/api'
import {
  Authenticated,
  Unauthenticated,
  useAction,
  useMutation,
} from 'convex/react'
import React from 'react'
import { RecipeDetails } from '@/types'
import { PlusIcon } from '@radix-ui/react-icons'
import { SignInButton } from '@clerk/clerk-react'

type RecipeDetailsDialogProps = {
  title: string
}

export function RecipeDetailsDialog({ title }: RecipeDetailsDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [recipeDetails, setRecipeDetails] = React.useState<RecipeDetails>()
  const getRecipeDetails = useAction(api.openai.getRecipeDetails)

  const handleRecipeDetails = (recipe: string) => {
    getRecipeDetails({ title: recipe })
      .then((result) => {
        if (result) {
          const recipeDetails = JSON.parse(result)
          setRecipeDetails(recipeDetails)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const saveRecipe = useMutation(api.favoriteRecipes.addRecipeAndFavorite)

  const handleSaveRecipe = () => {
    if (!recipeDetails) {
      console.error('Recipe details are not available')
      return
    }
    setIsLoading(true)
    saveRecipe({
      title: recipeDetails.title,
      description: recipeDetails.description,
      ingredients: recipeDetails.ingredients,
      steps: recipeDetails.steps,
    })
      .then(() => {
        setIsLoading(false)
      })
      .then(() => {
        setIsOpen(false)
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const handleOpenDialog = () => {
    setIsOpen(true)
    handleRecipeDetails(title)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded bg-killarney-500 px-4 py-2 font-bold text-white hover:bg-killarney-700 hover:text-white"
          variant="outline"
          onClick={() => handleOpenDialog()}
        >
          Recipe details
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90%] overflow-y-auto sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recipe details</DialogTitle>
        </DialogHeader>
        <main className="flex flex-col gap-8">
          {recipeDetails ? (
            <>
              <div>
                <h1 className="text-xl font-semibold">
                  {recipeDetails?.title}
                </h1>
                <p>{recipeDetails?.description}</p>
              </div>
              <section>
                <h2 className="text-md font-semibold">Ingredients</h2>
                <ul className="grid list-disc gap-2 pl-6 text-sm">
                  {recipeDetails?.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="text-md font-semibold">Steps</h2>
                <ol className="grid list-decimal gap-2 pl-6 text-sm">
                  {recipeDetails?.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            </>
          ) : (
            <div className="container flex h-60 animate-pulse items-center justify-center">
              <h3 className="text-center font-semibold tracking-tight">
                Loading the recipe details... 🍳
              </h3>
            </div>
          )}
        </main>
        <DialogClose>
          <Authenticated>
            <Button
              disabled={isLoading || !recipeDetails}
              type="submit"
              onClick={() => handleSaveRecipe()}
              className="rounded bg-killarney-500 px-4 py-2 font-bold text-white hover:bg-killarney-700 hover:text-white"
            >
              <PlusIcon className="mr-2 h-6 w-6" />
              Save in My Recipes
            </Button>
          </Authenticated>
          <Unauthenticated>
            <SignInButton mode="modal" afterSignInUrl="/">
              <Button
                variant="outline"
                className="mt-12 rounded bg-killarney-500 px-4 py-2 font-bold text-white hover:bg-killarney-700 hover:text-white"
              >
                Sign in to save this recipe
              </Button>
            </SignInButton>
          </Unauthenticated>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

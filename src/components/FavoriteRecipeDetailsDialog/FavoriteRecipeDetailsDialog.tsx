import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import React from 'react'
import { RecipeDetails } from '@/types'

export function FavoriteRecipeDetailsDialog({
  recipe,
}: {
  recipe: RecipeDetails
}) {
  const { title, description, ingredients, steps } = recipe
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="mx-auto mt-4 flex items-center rounded-md bg-gradient-to-r from-killarney-500 to-killarney-600 px-4 py-2 text-white shadow-md shadow-killarney-300 transition-all duration-200 ease-in-out hover:from-killarney-500 hover:to-killarney-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-killarney-500 focus:ring-offset-2 focus:ring-offset-white"
          variant="outline"
          onClick={() => handleOpenDialog()}
        >
          Recipe details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recipe details</DialogTitle>
        </DialogHeader>
        <main className="flex flex-col gap-8">
          <>
            <div>
              <h1 className="text-lg font-semibold">{title}</h1>
              <p>{description}</p>
            </div>
            <section>
              <h2 className="text-md font-semibold">Ingredients</h2>
              <ul className="grid list-disc gap-2 pl-6 text-sm">
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-md font-semibold">Steps</h2>
              <ol className="grid list-decimal gap-2 pl-6 text-sm">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          </>
        </main>
      </DialogContent>
    </Dialog>
  )
}

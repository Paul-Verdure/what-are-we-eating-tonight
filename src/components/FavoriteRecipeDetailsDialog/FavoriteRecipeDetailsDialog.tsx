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
          <>
            <div>
              <h1 className="text-xl font-semibold">{title}</h1>
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

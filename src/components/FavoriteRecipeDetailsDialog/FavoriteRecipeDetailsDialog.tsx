import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { RecipeDetails } from "@/types";

export function FavoriteRecipeDetailsDialog({
  recipe,
}: {
  recipe: RecipeDetails;
}) {
  const { title, description, ingredients, steps } = recipe;
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="mt-auto"
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
              <h1 className="font-semibold text-lg">{title}</h1>
              <p>{description}</p>
            </div>
            <section>
              <h2 className="font-semibold text-md">Ingredients</h2>
              <ul className="list-disc pl-6 grid gap-2 text-sm">
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-semibold text-md">Steps</h2>
              <ol className="list-decimal pl-6 grid gap-2 text-sm">
                {steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          </>
        </main>
      </DialogContent>
    </Dialog>
  );
}

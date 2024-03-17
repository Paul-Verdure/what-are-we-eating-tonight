import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "../../../convex/_generated/api";
import { useAction } from "convex/react";
import React from "react";
import { RecipeDetails } from "@/types";

type RecipeDetailsDialogProps = {
  title: string;
};

export function RecipeDetailsDialog({ title }: RecipeDetailsDialogProps) {
  const getRecipeDetails = useAction(api.openai.getRecipeDetails);
  const [recipeDetails, setRecipeDetails] = React.useState<RecipeDetails>();

  const handleRecipeDetails = (recipe: string) => {
    getRecipeDetails({ title: recipe })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    handleRecipeDetails(title);
  }, [title]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Recipe details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Recipe details</DialogTitle>
        </DialogHeader>
        <main className="flex flex-col gap-8">
          {recipeDetails && (
            <>
              <div>
                <h1 className="font-semibold text-lg">{recipeDetails.title}</h1>
                <p>{recipeDetails.description}</p>
              </div>
              <section>
                <h2 className="font-semibold text-md">Ingredients</h2>
                <ul className="list-disc pl-6 grid gap-2 text-sm">
                  {recipeDetails.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-md">Steps</h2>
                <ol className="list-decimal pl-6 grid gap-2 text-sm">
                  {recipeDetails.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            </>
          )}
        </main>
        <DialogFooter>
          <Button type="submit">Save in My Recipes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

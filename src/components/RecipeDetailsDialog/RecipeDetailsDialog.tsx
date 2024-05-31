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
import { ConvexProvider, useAction, useMutation } from "convex/react";
import React from "react";
import { RecipeDetails } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { PlusIcon } from "@radix-ui/react-icons";

type RecipeDetailsDialogProps = {
  title: string;
};

export function RecipeDetailsDialog({ title }: RecipeDetailsDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [recipeDetails, setRecipeDetails] = React.useState<RecipeDetails>();
  const getRecipeDetails = useAction(api.openai.getRecipeDetails);

  console.log("isOpen", isOpen);

  const handleRecipeDetails = (recipe: string) => {
    getRecipeDetails({ title: recipe })
      .then((result) => {
        if (result) {
          const recipeDetails = JSON.parse(result);
          recipeDetails.id = uuidv4();
          setRecipeDetails(recipeDetails);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveRecipe = useMutation(api.favoriteRecipes.addRecipeAndFavorite);

  const handleSaveRecipe = () => {
    if (!recipeDetails) {
      console.error("Recipe details are not available");
      return;
    }

    setIsLoading(true);
    saveRecipe({
      recipeId: recipeDetails.id,
      name: recipeDetails.title,
      ingredients: recipeDetails.ingredients,
      instructions: recipeDetails.steps,
    })
      .then(() => {
        setIsLoading(false);
      })
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  // React.useEffect(() => {
  //   handleRecipeDetails(title);
  // }, [title]);

  const handleOpenDialog = () => {
    setIsOpen(true);
    handleRecipeDetails(title);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="mt-4"
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
          {recipeDetails && (
            <>
              <div>
                <h1 className="font-semibold text-lg">
                  {recipeDetails?.title}
                </h1>
                <p>{recipeDetails?.description}</p>
              </div>
              <section>
                <h2 className="font-semibold text-md">Ingredients</h2>
                <ul className="list-disc pl-6 grid gap-2 text-sm">
                  {recipeDetails?.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="font-semibold text-md">Steps</h2>
                <ol className="list-decimal pl-6 grid gap-2 text-sm">
                  {recipeDetails?.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            </>
          )}
        </main>
        <DialogFooter>
          <Button
            disabled={isLoading}
            type="submit"
            onClick={() => handleSaveRecipe()}
          >
            <PlusIcon className="w-6 h-6 mr-2" />
            Save in My Recipes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "convex/_generated/api";
import { useAction } from "convex/react";

type RecipeDetailsDialogProps = {
  title: string;
};

export function RecipeDetailsDialog({ title }: RecipeDetailsDialogProps) {
  const getRecipeDetails = useAction(api.openai.getRecipeDetails);

  const handleRecipeDetails = (recipe: string) => {
    getRecipeDetails({ title: recipe })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <div>
            <h1 className="font-semibold text-lg">Classic Pancakes</h1>
            <p>
              The perfect recipe for light and fluffy pancakes that are golden
              brown and delicious.
            </p>
          </div>

          <section>
            <h2 className="font-semibold text-md">Ingredients</h2>
            <ul className="list-disc pl-6 grid gap-2 text-sm">
              <li>1 1/2 cups all-purpose flour</li>
              <li>3 1/2 teaspoons baking powder</li>
              <li>1 teaspoon salt</li>
              <li>1 tablespoon white sugar</li>
              <li>1 1/4 cups milk</li>
              <li>1 egg</li>
              <li>3 tablespoons butter, melted</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-md">Steps</h2>
            <ol className="list-decimal pl-6 grid gap-2 text-sm">
              <li>
                In a large bowl, sift together the flour, baking powder, salt
                and sugar.
              </li>
              <li>Make a well in the center and pour in the milk.</li>
              <li>Stir until smooth and pour the batter onto the griddle.</li>
              <li>
                Cook until bubbles form on the surface, then flip and cook.
              </li>
            </ol>
          </section>
        </main>
        <DialogFooter>
          <Button type="submit">Save in My Recipes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

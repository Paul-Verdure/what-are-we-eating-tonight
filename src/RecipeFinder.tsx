import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { RecipeOptions } from "./types";

export default function RecipeFinder() {
  const INGREDIENTS = [
    "garlic",
    "tomato",
    "onion",
    "zucchini",
    "mozzarella",
    "basil",
    "olive oil",
  ];
  const [response, setResponse] = useState<RecipeOptions>([]);
  const [loading, setLoading] = useState(false);
  const getTitles = useAction(api.openai.getRecipesTitles);

  console.log(response);

  function handleClick() {
    setLoading(true);
    getTitles({ ingredients: INGREDIENTS })
      .then((result) => {
        console.log(result);
        if (result) {
          setResponse(JSON.parse(result));
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold tracking-tighter">Find Recipes</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Enter up to 10 ingredients to find the perfect recipe.
          </p>
          <div className="flex flex-wrap gap-2">
            <div>
              <div>Tomato</div>
            </div>
            <div>
              <div>Onion</div>
            </div>
            <div>
              <div>Garlic</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Enter an ingredient" />
            <Button >Add Ingredient</Button>
          </div>
          <Button variant="outline" onClick={handleClick}>Find Recipes</Button>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="animate-pulse">
                <Card>
                  <CardContent>
                    <h3 className="font-semibold tracking-tight">Loading...</h3>
                  </CardContent>
                </Card>
              </div>
            ) : (
              response?.map((recipe) => (
                <Card>
                  <CardContent>
                    <h3 className="font-semibold tracking-tight">
                      {recipe?.title}
                    </h3>
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                      {recipe?.description}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

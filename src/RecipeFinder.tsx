import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { RecipeOptions } from "./types";
import { v4 as uuidv4 } from "uuid";

import { FinderInputs } from "./components/FinderInputs/FinderInputs";
import {
  foodPreferences,
  mealChoices,
} from "./components/FinderInputs/checkboxLists";
import { Checkbox } from "./components/ui/checkbox";
import { Cross1Icon } from "@radix-ui/react-icons";
import { RecipeDetailsDialog } from "./components/RecipeDetailsDialog/RecipeDetailsDialog";

const defaultIngredients = [
  "potato",
  "carrot",
  "onion",
  "garlic",
  "tomato",
  "pasta",
  "butter",
  "creamcheese",
  "chicken",
];

export default function RecipeFinder() {
  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>(defaultIngredients);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>();
  const [response, setResponse] = useState<RecipeOptions>([]);
  const [loading, setLoading] = useState(false);
  const getTitles = useAction(api.openai.getRecipesTitles);

  function handleClick() {
    setLoading(true);
    getTitles({
      ingredients: selectedIngredients,
      preferences: selectedPreferences,
    })
      .then((result) => {
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

  function removeIngredient(ingredient: string) {
    setSelectedIngredients((prev: string[]) =>
      prev.filter((item) => item !== ingredient)
    );
  }

  const isListFull = selectedIngredients.length === 10;

  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold tracking-tighter">
            What are we eating tonight
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Check what's in the fridge and let's find a recipe for tonight's
            dinner.
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients?.map((ingredient) => (
              <span
                key={ingredient}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full flex gap-1 items-center"
              >
                {ingredient}
                <Cross1Icon
                  className="cursor-pointer"
                  onClick={() => removeIngredient(ingredient)}
                />
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <FinderInputs
              setSelectedIngredients={setSelectedIngredients}
              isListFull={isListFull}
            />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              {foodPreferences?.map((preference) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    key={preference.id}
                    id={preference.id}
                    checked={selectedPreferences.includes(preference.id)}
                    onCheckedChange={() => {
                      if (selectedPreferences.includes(preference.id)) {
                        setSelectedPreferences(
                          selectedPreferences.filter(
                            (item) => item !== preference.id
                          )
                        );
                      } else {
                        setSelectedPreferences([
                          ...selectedPreferences,
                          preference.id,
                        ]);
                      }
                    }}
                  />
                  <label htmlFor={preference.id}>{preference.label}</label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {mealChoices?.map((choice) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    key={choice.id}
                    id={choice.id}
                    checked={selectedMeal?.includes(choice.id)}
                    onCheckedChange={() => {
                      if (selectedMeal?.includes(choice.id)) {
                        setSelectedMeal("");
                      } else {
                        setSelectedMeal(choice.id);
                      }
                    }}
                  />
                  <label htmlFor={choice.id}>{choice.label}</label>
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" onClick={handleClick}>
            Find Recipes
          </Button>
          {loading ? (
            <div className="animate-pulse container">
              <h3 className="font-semibold tracking-tight text-center">
                Loading...
              </h3>
            </div>
          ) : (
            <>
              {response?.length !== 0 && (
                <h3 className="font-semibold tracking-tight text-center">
                  {response?.length} Recipes Found - Select one to view cooking
                  steps
                </h3>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {response?.map((recipe) => (
                  <Card key={uuidv4()}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold tracking-tight">
                        {recipe?.title}
                      </h3>
                      <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                        {recipe?.description}
                      </p>
                      <RecipeDetailsDialog title={recipe?.title} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

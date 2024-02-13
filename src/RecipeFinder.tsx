import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { RecipeOptions } from "./types";

import { FinderInputs } from "./components/FinderInputs/FinderInputs";
import { foodPreferences } from "./components/FinderInputs/checkboxLists";
import { Checkbox } from "./components/ui/checkbox";

export default function RecipeFinder() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<string>();
  const [response, setResponse] = useState<RecipeOptions>([]);
  const [loading, setLoading] = useState(false);
  const getTitles = useAction(api.openai.getRecipesTitles);

  console.log(response);

  function handleClick() {
    setLoading(true);
    getTitles({ ingredients: selectedIngredients })
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

  console.log('selectedPreferences', selectedPreferences);
  console.log('preferences', foodPreferences);

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
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-full"
              >
                {ingredient}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <FinderInputs setSelectedIngredients={setSelectedIngredients} />
          </div>
          <div className="flex flex-wrap gap-2">
            {foodPreferences?.map((preference) => (
              <div className="flex items-center space-x-2">
                <label htmlFor={preference.id}>{preference.label}</label>
                <Checkbox
                  key={preference.id}
                  id={preference.id}
                  checked={selectedPreferences.includes(preference.id)}
                  onChange={() => {
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
              </div>
            ))}
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {response?.map((recipe) => (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold tracking-tight">
                      {recipe?.title}
                    </h3>
                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                      {recipe?.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

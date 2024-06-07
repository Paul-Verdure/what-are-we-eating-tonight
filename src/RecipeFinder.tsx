import { Button } from '@/components/ui/button'
import { CardContent, Card } from '@/components/ui/card'
import { useState } from 'react'
import { useAction } from 'convex/react'
import { api } from '../convex/_generated/api'
import { RecipeOptions } from './types'
import { v4 as uuidv4 } from 'uuid'

import { FinderInputs } from './components/FinderInputs/FinderInputs'
import {
  foodPreferences,
  mealChoices,
} from './components/FinderInputs/checkboxLists'
import { Checkbox } from './components/ui/checkbox'
import { Cross1Icon } from '@radix-ui/react-icons'
import { RecipeDetailsDialog } from './components/RecipeDetailsDialog/RecipeDetailsDialog'

const defaultIngredients = [
  'potato',
  'carrot',
  'onion',
  'garlic',
  'tomato',
  'pasta',
  'butter',
  'creamcheese',
  'chicken',
]

export default function RecipeFinder() {
  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>(defaultIngredients)
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [selectedMeal, setSelectedMeal] = useState<string>()
  const [response, setResponse] = useState<RecipeOptions>([])
  const [loading, setLoading] = useState(false)
  const getTitles = useAction(api.openai.getRecipesTitles)

  function handleClick() {
    setLoading(true)
    getTitles({
      ingredients: selectedIngredients,
      preferences: selectedPreferences,
    })
      .then((result) => {
        if (result) {
          setResponse(JSON.parse(result))
          setLoading(false)
        }
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  function removeIngredient(ingredient: string) {
    setSelectedIngredients((prev: string[]) =>
      prev.filter((item) => item !== ingredient)
    )
  }

  const isListFull = selectedIngredients.length === 10

  return (
    <section className="text-center md:mb-12">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        What are we eating tonight
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Check what's in the fridge and let's find a recipe for tonight's dinner.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {selectedIngredients?.map((ingredient) => (
          <span
            key={ingredient}
            className="flex items-center gap-1 rounded-full bg-killarney-500 px-3 py-1 text-white"
          >
            {ingredient}
            <Cross1Icon
              className="cursor-pointer"
              onClick={() => removeIngredient(ingredient)}
            />
          </span>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <FinderInputs
          setSelectedIngredients={setSelectedIngredients}
          isListFull={isListFull}
        />
      </div>
      <div className="mt-4 flex gap-8">
        <div className="flex flex-col gap-2">
          {foodPreferences?.map((preference) => (
            <div className="flex items-center space-x-2" key={preference.id}>
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
                    )
                  } else {
                    setSelectedPreferences([
                      ...selectedPreferences,
                      preference.id,
                    ])
                  }
                }}
              />
              <label htmlFor={preference.id}>{preference.label}</label>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {mealChoices?.map((choice) => (
            <div className="flex items-center space-x-2" key={choice.id}>
              <Checkbox
                key={choice.id}
                id={choice.id}
                checked={selectedMeal?.includes(choice.id)}
                onCheckedChange={() => {
                  if (selectedMeal?.includes(choice.id)) {
                    setSelectedMeal('')
                  } else {
                    setSelectedMeal(choice.id)
                  }
                }}
              />
              <label htmlFor={choice.id}>{choice.label}</label>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        onClick={handleClick}
        className="rounded bg-killarney-500 px-4 py-2 font-bold text-white hover:bg-killarney-700"
      >
        Find Recipes
      </Button>
      <section className="mt-12">
        {loading ? (
          <div className="container animate-pulse">
            <h3 className="text-center font-semibold tracking-tight">
              Loading...
            </h3>
          </div>
        ) : (
          <>
            {response?.length !== 0 && (
              <h3 className="text-center text-2xl font-semibold tracking-tight">
                {response?.length} Recipes Found - Select one to view cooking
                steps
              </h3>
            )}
            <div className="mt-8 grid place-content-center gap-6 md:grid-cols-2 lg:grid-cols-4">
              {response?.map((recipe) => (
                <Card
                  key={uuidv4()}
                  className="max-w-sm overflow-hidden rounded shadow-lg"
                >
                  <CardContent className="flex h-full flex-col justify-evenly gap-8 px-4 py-8">
                    <h3 className="text-lg font-semibold tracking-tight">
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
      </section>
    </section>
  )
}

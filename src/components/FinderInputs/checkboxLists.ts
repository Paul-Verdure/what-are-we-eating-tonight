import { CheckboxItems } from "@/types";

export const foodPreferences: CheckboxItems = [
  {
    id: "vegetarian",
    label: "Vegetarian",
  },
  {
    id: "vegan",
    label: "Vegan",
  },
  {
    id: "gluten-free",
    label: "Gluten-free",
  },
  {
    id: "dairy-free",
    label: "Dairy-free",
  },
  {
    id: "nut-free",
    label: "Nut-free",
  },
  {
    id: "egg-free",
    label: "Egg-free",
  },
  {
    id: "seafood-free",
    label: "Seafood-free",
  },
  {
    id: "soy-free",
    label: "Soy-free",
  },
  {
    id: "pork-free",
    label: "Pork-free",
  },
] as const;

export const mealChoices: CheckboxItems = [
  {
    id: "breakfast",
    label: "Breakfast",
  },
  {
    id: "lunch",
    label: "Lunch",
  },
  {
    id: "dinner",
    label: "Dinner",
  },
  {
    id: "snack",
    label: "Snack",
  },
] as const;

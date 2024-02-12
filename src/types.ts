export type IngredientsOptions = {
  id: number;
  name: string;
}[];

export type Recipe = {
  title: string;
  description: string;
};

export type RecipeOptions = Recipe[];

export type CheckboxItem = {
  id: string;
  label: string;
};

export type CheckboxItems = CheckboxItem[];
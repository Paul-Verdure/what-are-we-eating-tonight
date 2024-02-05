export type IngredientsOptions = {
  id: number;
  name: string;
}[];

export type Recipe = {
  recipe: string;
  ingredients: string[];
};

export type RecipeOptions = Recipe[];
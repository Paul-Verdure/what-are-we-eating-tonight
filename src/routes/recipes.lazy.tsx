import MyRecipes from '@/MyRecipes';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/recipes')({
  component: Recipes,
})

function Recipes() {
  return <MyRecipes />
}
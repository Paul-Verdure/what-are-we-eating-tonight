import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/recipes')({
  component: Recipes,
})

function Recipes() {
  return <div className="p-2">My Recipes</div>
}
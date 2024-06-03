import MyRecipes from "@/MyRecipes";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/recipes")({
  component: Recipes,
});

function Recipes() {
  return (
    <main className="container max-w-6xl flex flex-col gap-8 mt-10">
      <MyRecipes />
    </main>
  );
}

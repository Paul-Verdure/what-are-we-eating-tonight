import { api } from "../convex/_generated/api";
import { useQuery } from "convex/react";


export default function MyRecipes() {
  
 const favoriteRecipes = useQuery(api.favoriteRecipes.getFavoriteRecipes)

 console.log('favoriteRecipes', favoriteRecipes)


  return (
    <div>
      <h1>My Recipes</h1>
    </div>
  );
}

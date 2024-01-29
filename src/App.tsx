import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import {
  Authenticated,
  Unauthenticated,
  useAction,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "../convex/_generated/api";
import { toNamespacedPath } from "path";
import { useState } from "react";

export default function App() {
  //
  const INGREDIENTS = [
    "garlic",
    "tomato",
    "onion",
    "zucchini",
    "mozzarella",
    "basil",
    "olive oil",
  ];
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const getTitles = useAction(api.openai.getRecipesTitles);

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Convex + React (Vite) + Clerk Auth
      </h1>
      <Authenticated>
        <SignedIn />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setLoading(true);
            getTitles({ ingredients: INGREDIENTS })
              .then((titles) => {
                setLoading(false);
                setResponse(titles);
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Get Recipes
        </button>
      </div>
    </main>
  );
}

function SignedIn() {
  return (
    <>
      <p>Welcome!</p>
    </>
  );
}

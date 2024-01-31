import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
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
  const [response, setResponse] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const getTitles = useAction(api.openai.getRecipesTitles);

  console.log(response);

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
              .then((titles: (string | null)[]) => {
                setLoading(false);
                if (titles?.length !== 0) {
                  setResponse(
                    titles.filter((title): title is string => title !== null)
                  );
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }}
        >
          Get Recipes
        </button>
        <section>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {response.map((title, index) => {
                return <p key={index}>{title}</p>;
              })}
            </div>
          )}
        </section>
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

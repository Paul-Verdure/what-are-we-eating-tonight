import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import RecipeFinder from "./RecipeFinder";

export default function App() {
  //

  return (
    <main className="container max-w-6xl flex flex-col gap-8 mt-10">
      <Authenticated>
        <RecipeFinder />
      </Authenticated>
      <Unauthenticated>
      <section className="text-center md:mb-12">
      <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
        Welcome to Recipe Finder! 🍳
      </h1>
      <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
        Sign in to find the perfect recipe! 🍽️
      </p>

          <SignInButton mode="modal">
            <Button variant="outline" className="rounded bg-killarney-500 px-4 py-2 font-bold text-white hover:bg-killarney-700 hover:text-white mt-12">Sign in</Button>
          </SignInButton>
      </section>
      </Unauthenticated>
    </main>
  );
}


import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";
import { RecipeOptions } from "./types";
import RecipeFinder from "./RecipeFinder";

export default function App() {
  //

  return (
    <main className="container max-w-6xl flex flex-col gap-8">
      <Authenticated>
        <RecipeFinder />
      </Authenticated>
      <Unauthenticated>
        <div className="flex justify-center">
          <SignInButton mode="modal">
            <Button>Sign in</Button>
          </SignInButton>
        </div>
      </Unauthenticated>
    </main>
  );
}


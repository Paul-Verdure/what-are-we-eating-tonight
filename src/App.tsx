import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
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


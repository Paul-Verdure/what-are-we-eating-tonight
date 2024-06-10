import { SignIn, SignInButton, SignOutButton } from '@clerk/clerk-react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Authenticated, Unauthenticated } from 'convex/react'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="py-2 px-4 flex gap-8">
        <Link to="/" className="[&.active]:font-bold">
          Recipe Finder
        </Link>{' '}
        <Authenticated>
        <Link to="/recipes" className="[&.active]:font-bold">
          My favorite recipes
        </Link>
        </Authenticated>
        <div className="ml-auto">
         <Authenticated> 
        <SignOutButton />
        </Authenticated>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
        </div>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
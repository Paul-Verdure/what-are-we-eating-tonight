import { SignOutButton } from '@clerk/clerk-react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="py-2 px-4 flex gap-8">
        <Link to="/" className="[&.active]:font-bold">
          Recipe Finder
        </Link>{' '}
        <Link to="/recipes" className="[&.active]:font-bold">
          My favorite recipes
        </Link>
        <div className="ml-auto">
        <SignOutButton />
        </div>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
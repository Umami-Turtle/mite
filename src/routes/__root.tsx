import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MiteLayout from "@/components/layout";

export const Route = createRootRoute({
  component: () => (
    <>
      <MiteLayout>
        <Outlet />
      </MiteLayout>
      <TanStackRouterDevtools />
    </>
  ),
});

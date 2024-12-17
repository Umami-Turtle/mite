import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import MiteLayout from "@/components/layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: () => {
    const queryClient = new QueryClient();
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <MiteLayout>
            <Outlet />
          </MiteLayout>
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </>
    );
  },
});

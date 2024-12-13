import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    Route.router?.navigate?.({
      to: "/media/copy-arena",
    });
  });
  return <div></div>;
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/extensions/installed")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/extensions/installed"!</div>;
}

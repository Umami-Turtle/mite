import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/extensions/browse")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/extensions/browse"!</div>;
}

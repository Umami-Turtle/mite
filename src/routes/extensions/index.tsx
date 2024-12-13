import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/extensions/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/extensions/"!</div>;
}

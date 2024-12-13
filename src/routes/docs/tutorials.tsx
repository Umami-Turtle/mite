import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/tutorials')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/docs/tutorials"!</div>
}

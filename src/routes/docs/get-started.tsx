import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/get-started')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/docs/get-started"!</div>
}

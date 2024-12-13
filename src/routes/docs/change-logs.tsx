import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/change-logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/docs/change-logs"!</div>
}

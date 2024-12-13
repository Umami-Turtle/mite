import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs/intro')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/docs/intro"!</div>
}

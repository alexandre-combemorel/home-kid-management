import { Button, Stack } from "@ultraviolet/ui"
import { Link, type Register } from "@tanstack/react-router"

const ROUTES_MAP: {
  label: string
  path: keyof Register["router"]["routesByPath"]
}[] = [
  {
    label: "🗓️ Planning",
    path: "/",
  },
  {
    label: "✅ Tache",
    path: "/task",
  },
  {
    label: "📌 Score",
    path: "/score",
  },
]

export const Menu = () => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      {ROUTES_MAP.map((route) => (
        <Link key={route.path} to={route.path}>
          <Button variant="ghost" sentiment="neutral">
            {route.label}
          </Button>
        </Link>
      ))}
    </Stack>
  )
}

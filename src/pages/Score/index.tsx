import { createRoute } from "@tanstack/react-router"
import { Score } from "./Score"
import { rootRoute } from "../../rootRoute"

export const scoreRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/score",
  component: Score,
})

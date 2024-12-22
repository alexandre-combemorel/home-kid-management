import { createRoute } from "@tanstack/react-router"
import { Planning } from "./Planning"
import { rootRoute } from "../../rootRoute"

export const planningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Planning,
})

import { createRoute } from "@tanstack/react-router"
import { Score } from "./Score"
import { rootRoute } from "../../rootRoute"
import { beforeLoad } from "../../helpers/router"

export const scoreRoute = createRoute({
  beforeLoad,
  getParentRoute: () => rootRoute,
  path: "/score",
  component: Score,
})

import { createRoute } from "@tanstack/react-router"
import { Planning } from "./Planning"
import { rootRoute } from "../../rootRoute"
import { beforeLoad } from "../../helpers/router"

export const planningRoute = createRoute({
  beforeLoad,
  getParentRoute: () => rootRoute,
  path: "/",
  component: Planning,
})

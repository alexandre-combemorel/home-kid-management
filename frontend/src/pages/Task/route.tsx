import { createRoute } from "@tanstack/react-router"
import { Task } from "./Task"
import { rootRoute } from "../../rootRoute"
import { beforeLoad } from "../../helpers/router"

export const taskRoute = createRoute({
  beforeLoad,
  getParentRoute: () => rootRoute,
  path: "/task/$momentId",
  component: Task,
})

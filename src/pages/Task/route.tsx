import { createRoute } from "@tanstack/react-router"
import { Task } from "./Task"
import { rootRoute } from "../../rootRoute"

export const taskRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/task/$momentId",
  component: Task,
})

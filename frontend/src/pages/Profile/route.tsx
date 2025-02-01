import { createRoute } from "@tanstack/react-router"
import { Profile } from "./Profile"
import { rootRoute } from "../../rootRoute"
import { beforeLoad } from "../../helpers/router"

export const profileRoute = createRoute({
  beforeLoad,
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
})

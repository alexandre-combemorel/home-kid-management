import { RouterProvider, createRouter } from "@tanstack/react-router"
import { taskRoute } from "./pages/Task"
import { rootRoute } from "./rootRoute"
import { scoreRoute } from "./pages/Score"
import { planningRoute } from "./pages/Planning"

const routeTree = rootRoute.addChildren([taskRoute, scoreRoute, planningRoute])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  return <RouterProvider router={router} />
}

export default App

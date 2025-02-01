import { RouterProvider, createRouter } from "@tanstack/react-router"
import { taskRoute } from "./pages/Task"
import { rootRoute } from "./rootRoute"
import { scoreRoute } from "./pages/Score"
import { planningRoute } from "./pages/Planning"
import { useAuth } from "./providers/AuthProvider/AuthProvider"
import { loginRoute } from "./pages/Login/route"
import { profileRoute } from "./pages/Profile/route"

const routeTree = rootRoute.addChildren([
  taskRoute,
  scoreRoute,
  planningRoute,
  loginRoute,
  profileRoute,
])

const router = createRouter({
  routeTree,
  context: {
    auth: undefined,
  },
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export default App

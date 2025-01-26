import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import { ApplicationLayout } from "./layouts/ApplicationLayout"
import { Header } from "./components/Header/Header"
import { Footer } from "./components/Footer/Footer"
import type { AuthContextType } from "./providers/AuthProvider/types"

export type RouterContext = {
  auth?: AuthContextType
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Header />
      <ApplicationLayout>
        <Outlet />
      </ApplicationLayout>
      <Footer />
    </>
  ),
})

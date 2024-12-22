import { createRootRoute, Outlet } from "@tanstack/react-router"
import { ApplicationLayout } from "./layouts/ApplicationLayout"
import { Header } from "./components/Header/Header"

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <ApplicationLayout>
        <Outlet />
      </ApplicationLayout>
      ,
    </>
  ),
})

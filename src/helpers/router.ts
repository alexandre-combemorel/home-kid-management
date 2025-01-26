import { redirect } from "@tanstack/react-router"
import type { RouterContext } from "../rootRoute"

export const beforeLoad = ({ context }: { context: RouterContext }) => {
  if (!context.auth?.user) {
    throw redirect({
      to: "/login",
    })
  }
}

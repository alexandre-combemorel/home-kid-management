import { strapi } from "./base"

export const getUser = () => {
  return strapi.fetchUser()
}

import { strapi } from "./base"

export const login = ({ email, password }: { email: string; password: string }) => {
  return strapi.login({ identifier: email, password })
}

export const logout = () => {
  return strapi.logout()
}

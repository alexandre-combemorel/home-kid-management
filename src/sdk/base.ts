import { toast } from "@ultraviolet/ui"
import Strapi from "strapi-sdk-js"

const strapi = new Strapi({
  url: import.meta.env.VITE_BACKEND_URL,
})

// Add a response interceptor
strapi.axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const typedError = error as Error
    toast.error(typedError.message)
    return Promise.reject(error)
  },
)

export { strapi }

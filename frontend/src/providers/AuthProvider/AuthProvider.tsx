import type { ReactNode } from "react"
import { createContext, useContext, useState, useTransition } from "react"
import { useEffect } from "react"
import type { AuthContextType, UserType } from "./types"
import { api } from "../../sdk"
import { Loader } from "@ultraviolet/ui"

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  setUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserType | null>()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      if (api.doesUserExist()) {
        try {
          const userReturned = await api.getUser()
          const user = userReturned as UserType
          setUserData(user)
          return
        } catch (e) {
          console.error("Couldn't fetch user: ", e)
        }
      }
      setUserData(null)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user: userData, setUser: setUserData }}>
      {isPending || userData === undefined ? <Loader /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export type UserType = {
  blocked: boolean
  confirmed: boolean
  createdAt: Date
  documentId: string
  email: string
  id: number
  provider: string
  publishedAt: Date
  updatedAt: Date
  username: string
}

export type AuthContextType = {
  user: UserType | undefined
  setUser: (user?: UserType) => void
}

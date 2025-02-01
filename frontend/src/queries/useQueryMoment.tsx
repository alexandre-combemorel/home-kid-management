import { api } from "../sdk"
import { useQuery } from "@tanstack/react-query"

export const useQueryMoment = (documentId: string) => {
  return useQuery({
    queryKey: ["moment"],
    queryFn: async () => api.getMoment(documentId),
  })
}

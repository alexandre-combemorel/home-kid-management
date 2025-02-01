import { api } from "../sdk"
import { useQuery } from "@tanstack/react-query"

export const useQueryMoments = () => {
  return useQuery({
    queryKey: ["moments"],
    queryFn: api.getMoments,
  })
}

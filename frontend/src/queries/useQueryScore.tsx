import { api } from "../sdk"
import { useQuery } from "@tanstack/react-query"

export const useQueryScore = ({ startDate }: { startDate: Date }) => {
  return useQuery({
    queryKey: ["score"],
    queryFn: async () => api.getScoresForTheWeek({ startDate }),
  })
}

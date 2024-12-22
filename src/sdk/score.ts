import { strapi } from "./base"
import type { PayloadActions } from "./types"

export type ScoreTypeInput = {
  result: PayloadActions
  momentDocumentId: string
  variation: number
}

export type ScoreTypeResult = {
  createdAt: Date
  documentId: string
  result: PayloadActions
  variation: number
}

export const setScore = ({ momentDocumentId, result, variation }: ScoreTypeInput) => {
  return strapi.create<ScoreTypeResult>("scores", {
    result,
    moment: momentDocumentId,
    variation,
  })
}

export const getScoresForTheWeek = ({ startDate }: { startDate: Date }) => {
  return strapi.find<ScoreTypeResult[]>("scores", {
    filters: {
      createdAt: {
        $gt: startDate,
      },
    },
  })
}

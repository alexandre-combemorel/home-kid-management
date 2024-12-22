import type { PayloadActions } from "../../../sdk/types"

export const calculateVariation = (formPayload: PayloadActions) => {
  let countTotalAction = 0
  let countTotalSuccessAction = 0
  for (const taskId of Object.keys(formPayload)) {
    const listOfActionKeys = Object.keys(formPayload[taskId])
    countTotalAction += listOfActionKeys.length
    for (const actionId of listOfActionKeys) {
      const actionResult = formPayload[taskId][actionId]
      if (actionResult) {
        countTotalSuccessAction += 1
      }
    }
  }

  const pourcentageSuccess = (countTotalSuccessAction * 100) / countTotalAction

  // Finale score between
  // 0% to 30% decrease -2
  if (pourcentageSuccess < 30) {
    return -2
    // 30% to 60% decrease -1
  }
  if (pourcentageSuccess < 60) {
    return -1
    // 60% to 90% even
  }
  if (pourcentageSuccess < 90) {
    return 0
    // 90% to 100% increase 1
  }
  return 1
}

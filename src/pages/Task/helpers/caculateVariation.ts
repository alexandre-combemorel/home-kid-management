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

  const countTotalFailedAction = countTotalAction - countTotalSuccessAction

  if (countTotalFailedAction === 0) {
    return 0.5
  }
  if (countTotalFailedAction === 1) {
    return 0
  }
  if (countTotalFailedAction === 2) {
    return -1
  }
  return -2
}

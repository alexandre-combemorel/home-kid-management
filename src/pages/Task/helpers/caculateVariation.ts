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

  if (countTotalFailedAction <= 1) {
    return 1
  }
  if (countTotalFailedAction <= 3) {
    return 0
  }
  if (countTotalFailedAction <= 5) {
    return -1
  }
  return -2
}

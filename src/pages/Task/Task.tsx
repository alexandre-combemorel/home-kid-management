import { Button, Loader, Stack, Text } from "@ultraviolet/ui"
import { taskRoute } from "./route"
import { useCallback, useMemo, useState } from "react"
import { ImageTag } from "../../components/ImageTag"
import { Form, SelectableCardField, Submit, useForm, useWatch } from "@ultraviolet/form"
import { errors } from "../../helpers/errors"
import { FormActions } from "./components"
import styled from "@emotion/styled"
import { useQueryMoment } from "../../queries"
import type { PayloadActions } from "../../sdk/types"
import { calculateVariation } from "./helpers/caculateVariation"
import { Result } from "./components/Result"
import { api } from "../../sdk"

const SelectableCardFieldStyled = styled(SelectableCardField)`
  padding: 0;
`
const StackStyled = styled(Stack)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space["2"]};
`

const ButtonSkip = styled(Button)`
  position: absolute;
  right: 4px;
  top: 4px;
`

type FormType = {
  taskValidated: string[]
  taskSkipped: string[]
  [key: string]: boolean | string[]
}

export const Task = () => {
  const { momentId } = taskRoute.useParams()
  const [score, setScore] = useState<number>()

  const { data: moment, isPending } = useQueryMoment(momentId)

  const listOfTaskFromMoment = useMemo(() => moment?.data.tasks ?? [], [moment])

  const methods = useForm<FormType>({
    defaultValues: {
      taskValidated: [],
      taskSkipped: [],
    },
  })

  const taskValidated = useWatch({ control: methods.control, name: "taskValidated" })
  const taskSkipped = useWatch({ control: methods.control, name: "taskSkipped" })

  const onToggleActionsTask = useCallback(
    (taskId: string, validated: boolean) => {
      const taskValidatedNew = validated
        ? [...taskValidated, `task_${taskId}`]
        : taskValidated.filter((tid) => tid !== `task_${taskId}`)

      methods.setValue("taskValidated", taskValidatedNew)
    },
    [methods, taskValidated],
  )

  const areAllTaskValidated = useMemo(
    () => taskValidated.length === listOfTaskFromMoment?.length,
    [taskValidated, listOfTaskFromMoment],
  )

  const onToggleSkipTask = useCallback(
    (taskId: string, isSkipping: boolean) => {
      const taskSkippedNew = isSkipping
        ? [...taskSkipped, `task_${taskId}`]
        : taskSkipped.filter((tid) => tid !== `task_${taskId}`)

      methods.setValue("taskSkipped", taskSkippedNew)
    },
    [taskSkipped, methods],
  )

  const isTaskSkipped = useCallback(
    (taskId: string) => !!taskSkipped.find((tid) => tid === `task_${taskId}`),
    [taskSkipped],
  )

  const onSubmit = useCallback(
    async (values: FormType) => {
      if (areAllTaskValidated) {
        const taskAndActions = values.taskValidated
          .filter((taskId) => !taskSkipped.includes(taskId))
          .reduce<PayloadActions>((acc, taskId) => {
            const listOfKeys = Object.keys(values).filter((key) => key.startsWith(taskId))

            acc[taskId] = listOfKeys.reduce<{ [key2: string]: boolean }>((acc2, taskactionkey) => {
              const actionkey = taskactionkey.split("-")[1]
              acc2[actionkey] = !!values[taskactionkey]

              return acc2
            }, {})

            return acc
          }, {})

        const scoreCalculated = calculateVariation(taskAndActions)
        setScore(scoreCalculated)
        await api.setScore({
          momentDocumentId: momentId,
          result: taskAndActions,
          variation: scoreCalculated,
        })
      }
    },
    [areAllTaskValidated, momentId, taskSkipped],
  )

  if (typeof score === "number") {
    return <Result score={score} />
  }

  return (
    <Stack alignItems="center">
      {isPending ? (
        <Loader />
      ) : (
        <Form methods={methods} errors={errors} onSubmit={onSubmit}>
          <Stack alignItems="center" gap={3}>
            <Submit disabled={!areAllTaskValidated}>
              Terminer ({taskValidated.length}/{listOfTaskFromMoment.length}) 👍
            </Submit>
            <Stack direction="row" gap={2} wrap alignItems="flex-start">
              {listOfTaskFromMoment.map((task) => {
                const isCurrentTaskSkipped = isTaskSkipped(task.documentId)
                return (
                  <SelectableCardFieldStyled
                    key={task.documentId}
                    aria-label={task.title}
                    name={"taskValidated"}
                    value={`task_${task.documentId}`}
                    type="checkbox"
                    disabled={isCurrentTaskSkipped}
                  >
                    <StackStyled
                      onClick={(event) => event.stopPropagation()}
                      gap={2}
                      alignItems="center"
                    >
                      <ButtonSkip
                        variant="ghost"
                        size="xsmall"
                        onClick={() => onToggleSkipTask(task.documentId, !isCurrentTaskSkipped)}
                      >
                        {isCurrentTaskSkipped ? "Unskip" : "Skip"}
                      </ButtonSkip>
                      <Text as="p" variant="headingSmallStrong">
                        {task.title}
                      </Text>
                      <ImageTag src={task.img.url} />
                      {!isCurrentTaskSkipped ? (
                        <FormActions
                          isValidated={taskValidated.includes(`task_${task.documentId}`)}
                          task={task}
                          onValidate={() => {
                            onToggleActionsTask(task.documentId, true)
                          }}
                          onUnvalidate={() => {
                            onToggleActionsTask(task.documentId, false)
                          }}
                        />
                      ) : null}
                    </StackStyled>
                  </SelectableCardFieldStyled>
                )
              })}
            </Stack>
          </Stack>
        </Form>
      )}
    </Stack>
  )
}

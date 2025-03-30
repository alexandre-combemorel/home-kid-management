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

const SubmitButtonStyled = styled(Submit)`
  font-size: ${({ theme }) => theme.typography.headingLargeStronger};
  height: auto;
  padding: ${({ theme }) => theme.space["2"]};
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

  const taskValidated = useWatch({
    control: methods.control,
    name: "taskValidated",
  })
  const taskSkipped = useWatch({
    control: methods.control,
    name: "taskSkipped",
  })

  const onToggleActionsTask = useCallback(
    (taskId: string, validated: boolean) => {
      const taskIdToValidate = `task_${taskId}`
      const taskValidatedNew = validated
        ? [...taskValidated, taskIdToValidate]
        : taskValidated.filter((tid) => tid !== taskIdToValidate)

      methods.setValue("taskValidated", taskValidatedNew)
    },
    [methods, taskValidated],
  )

  const areAllTaskValidated = useMemo(
    () => taskValidated.length + taskSkipped.length === listOfTaskFromMoment?.length,
    [taskValidated.length, taskSkipped.length, listOfTaskFromMoment?.length],
  )

  const onToggleSkipTask = useCallback(
    (taskId: string, isSkipping: boolean) => {
      const taskIdToSkip = `task_${taskId}`
      let taskSkippedNew;
      if (isSkipping) {
        taskSkippedNew = [...taskSkipped, taskIdToSkip]
        methods.setValue("taskValidated", taskValidated.filter((tid) => tid !== taskIdToSkip))
      } else {
        taskSkippedNew = taskSkipped.filter((tid) => tid !== taskIdToSkip)
      }

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

  const SubmitButton = useMemo(() => {
    return <SubmitButtonStyled disabled={!areAllTaskValidated}>
      Terminer ({taskValidated.length + taskSkipped.length}/{listOfTaskFromMoment.length})
      👍
    </SubmitButtonStyled>
  }, [areAllTaskValidated, taskValidated, taskSkipped, listOfTaskFromMoment])

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
            {SubmitButton}
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
                        size="small"
                        onClick={() => onToggleSkipTask(task.documentId, !isCurrentTaskSkipped)}
                      >
                        {isCurrentTaskSkipped ? "Unskip" : "Skip"}
                      </ButtonSkip>
                      <Text as="p" variant="headingLargeStrong" placement="center">
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
            {SubmitButton}
          </Stack>
        </Form>
      )}
    </Stack>
  )
}

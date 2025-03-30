import { Button, Separator, Stack, Text } from "@ultraviolet/ui"
import { CheckboxField } from "@ultraviolet/form"
import styled from "@emotion/styled"
import { EmojiTag } from "../../../components/EmojiTag"
import type { Task } from "../../../sdk/types"

type FormActionsType = {
  isValidated: boolean
  task: Task
  onValidate: React.MouseEventHandler<HTMLElement>
  onUnvalidate: React.MouseEventHandler<HTMLElement>
}

const StackStyled = styled(Stack)`
  height: 100%;
  justify-content: center;
`

export const FormActions = ({ onValidate, onUnvalidate, task, isValidated }: FormActionsType) => {
  return (
    <StackStyled gap={3} width={"266px"}>
      <StackStyled gap={2}>
        {isValidated ? (
          <StackStyled alignItems="center">
            <EmojiTag size="medium">✔️</EmojiTag>
          </StackStyled>
        ) : (
          task.actions.map((action, index) => {
            return (
              <>
                {index > 0 && <Separator />}
                <CheckboxField
                  key={action.documentId}
                  name={`task_${task.documentId}-action_${action.documentId}`}
                >
                  <Text as="p" variant="headingSmall">
                    {action.title}
                  </Text>
                </CheckboxField>
              </>
            )
          })
        )}
      </StackStyled>
      {isValidated ? (
        <Button onClick={onUnvalidate} variant="ghost">
          ←
        </Button>
      ) : (
        <Button onClick={onValidate}>OK</Button>
      )}
    </StackStyled>
  )
}

import { Button, Modal, Text } from "@ultraviolet/ui"
import { useCallback, type ReactElement } from "react"

type ModalActionType = {
  disclosure: ReactElement
  onClose: () => void
}

export const ModalAction = ({ disclosure, onClose: onCLoseParam }: ModalActionType) => {
  const onClose = useCallback(
    (close: () => void) => {
      close()
      onCLoseParam()
    },
    [onCLoseParam],
  )
  return (
    <Modal disclosure={disclosure}>
      {({ close }) => {
        return (
          <>
            <Text as="p" sentiment="neutral" variant="body">
              Content should be present in center of the modal
            </Text>
            <Button onClick={() => onClose(close)}>Valider</Button>
          </>
        )
      }}
    </Modal>
  )
}

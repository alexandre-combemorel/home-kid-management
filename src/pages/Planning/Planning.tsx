import { Alert, Loader, Separator, Stack, Text } from "@ultraviolet/ui"
import { SelectableCardField, useForm } from "@ultraviolet/form"
import { ImageTag } from "../../components/ImageTag"
import { EmojiTag } from "../../components/EmojiTag"
import styled from "@emotion/styled"
import { useNavigate } from "@tanstack/react-router"
import { useQueryMoments } from "../../queries"

const EmojiWrapper = styled.div`
  width: 100%;
  text-align: center;
`

type FormMoment = {
  moment: string
}

export const Planning = () => {
  const navigate = useNavigate()
  const { control } = useForm<FormMoment>({
    defaultValues: {
      moment: "",
    },
  })

  const { isPending, data: moments, error } = useQueryMoments()
  if (error) {
    return <Alert sentiment="danger">Something went wrong</Alert>
  }

  return (
    <Stack alignItems="center" gap={4}>
      <Text as="h1" variant="heading">
        Planning des moments
      </Text>

      <Stack gap={3}>
        <Stack alignItems="center">
          <SelectableCardField
            control={control}
            label="Trouver le moment"
            name="moment"
            type="radio"
            value="auto"
          >
            <EmojiWrapper>
              <EmojiTag size="big">🔎</EmojiTag>
            </EmojiWrapper>
          </SelectableCardField>
        </Stack>
        <Separator />
        <Stack direction="row" gap={2}>
          {isPending || !moments ? (
            <Loader />
          ) : (
            moments.data.map((moment) => (
              <SelectableCardField
                control={control}
                key={moment.documentId}
                label={moment.label}
                name="moment"
                type="radio"
                onChange={() => {
                  navigate({ to: `/task/${moment.documentId}` })
                }}
              >
                <ImageTag src={moment.img.url} />
              </SelectableCardField>
            ))
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

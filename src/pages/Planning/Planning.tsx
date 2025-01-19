import { Alert, Loader, Stack, Text } from "@ultraviolet/ui"
import { SelectableCardField, useForm } from "@ultraviolet/form"
import { ImageTag } from "../../components/ImageTag"
import { EmojiTag } from "../../components/EmojiTag"
import styled from "@emotion/styled"
import { useNavigate } from "@tanstack/react-router"
import { useQueryMoments, useQueryScore } from "../../queries"
import { getStartDay, Time } from "../../helpers/time"

const EmojiWrapper = styled.div`
  width: 100%;
  text-align: center;
`

type FormMoment = {
  moment: string
}

console.log("test 2")

export const Planning = () => {
  const navigate = useNavigate()
  const { control } = useForm<FormMoment>({
    defaultValues: {
      moment: "",
    },
  })

  const { isPending, data: moments, error } = useQueryMoments()
  const dayStart = getStartDay()
  const { data: scores } = useQueryScore({ startDate: dayStart })

  if (error) {
    return <Alert sentiment="danger">Something went wrong</Alert>
  }

  return (
    <Stack alignItems="center" gap={4}>
      <Text as="h1" variant="heading">
        Planning des moments
      </Text>

      <Stack gap={3}>
        <Stack direction="row" gap={2} alignItems="start" wrap justifyContent="center">
          {isPending || !moments ? (
            <Loader />
          ) : (
            moments.data.map((moment) => {
              const timeStart = new Time(moment.timeStart)
              const timeEnd = new Time(moment.timeEnd)

              return (
                <Stack key={moment.documentId} gap={2}>
                  <SelectableCardField
                    control={control}
                    label={
                      <Text as="p" variant="bodyStronger">
                        {moment.label}
                      </Text>
                    }
                    name="moment"
                    type="radio"
                    onChange={() => {
                      navigate({ to: `/task/${moment.documentId}` })
                    }}
                    disabled={scores?.data.some(
                      (score) => score.moment.documentId === moment.documentId,
                    )}
                  >
                    <Text as="p" variant="bodySmall">
                      {timeStart.toStringHHMM()} à {timeEnd.toStringHHMM()}
                    </Text>
                    <ImageTag src={moment.img.url} />
                  </SelectableCardField>
                  {Time.isTimeCurrentlyHappening(timeStart, timeEnd) && (
                    <EmojiWrapper>
                      <EmojiTag size="medium">👆</EmojiTag>
                    </EmojiWrapper>
                  )}
                </Stack>
              )
            })
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

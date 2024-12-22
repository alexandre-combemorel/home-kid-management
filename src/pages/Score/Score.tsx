import { Stack, Text } from "@ultraviolet/ui"
import { useQueryScore } from "../../queries"
import { getStartOfTheWeek } from "../../helpers/time"
import { config } from "../../config"
import { useMemo } from "react"
import { Line, LineChart, ReferenceArea, XAxis, YAxis } from "recharts"
import {
  MAPPING_DAY_OF_THE_WEEK_REVERSE,
  MAPPING_NUM_DAY_NAME_DAY_ORDERED,
} from "../../constants/time"

export const Score = () => {
  const weekStart = getStartOfTheWeek(new Date())
  const { data: scores } = useQueryScore({ startDate: weekStart })
  const calculatedScore = useMemo(
    () => scores?.data.reduce((acc, scoreItem) => acc + scoreItem.variation, config.STARTING_SCORE),
    [scores],
  )

  // a function returning an array of score day by day of the week starting from STARTING_SCORE
  // the array should have 7 elements containing { dayOfTheWeek: number, value: number }
  // each element should be the sum of the variation of all the scores of the day added to the previous day score
  // the first element should be the STARTING_SCORE
  const scoresByDay = useMemo(() => {
    const listOfScore = Object.values(MAPPING_NUM_DAY_NAME_DAY_ORDERED).map((day) => {
      return {
        name: day.name,
        value: day.num === 5 ? config.STARTING_SCORE : undefined,
      }
    })
    return listOfScore.map((score, index) => {
      if (index === 0) return score
      return {
        name: score.name,
        value: scores?.data.reduce(
          (acc, scoreItem) => {
            const scoreDate = new Date(scoreItem.createdAt)
            if (scoreDate.getDay() === MAPPING_DAY_OF_THE_WEEK_REVERSE[score.name]) {
              return (acc ?? 0) + scoreItem.variation
            }
            return acc
          },
          listOfScore[index - 1].value,
        ),
      }
    })
  }, [scores])

  return (
    <Stack alignItems="center" gap={3}>
      <Text as="p" variant="headingLargeStrong">
        Score actuel: {calculatedScore}
      </Text>
      <LineChart width={700} height={500} data={scoresByDay}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 16]} />

        <ReferenceArea y1={13} y2={16} fill="#0017ff" fillOpacity={0.5} />
        <ReferenceArea y1={7} y2={13} fill="#00a104" fillOpacity={0.5} />
        <ReferenceArea y1={4} y2={7} fill="#fff224" fillOpacity={0.5} />
        <ReferenceArea y1={0} y2={4} fill="#ff9418" fillOpacity={0.5} />
        <Line type="monotone" dataKey="value" stroke="#ffffff" strokeWidth={4} />
      </LineChart>
    </Stack>
  )
}

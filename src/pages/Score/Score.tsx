import { Stack, Text } from "@ultraviolet/ui"
import { useQueryScore } from "../../queries"
import { getStartOfTheWeek } from "../../helpers/time"
import { config } from "../../config"
import { useMemo } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"
import {
  MAPPING_DAY_OF_THE_WEEK_REVERSE,
  MAPPING_NUM_DAY_NAME_DAY_ORDERED,
} from "../../constants/time"
import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"

const StackStyled = styled(Stack)`
  width: 100%;
  height: 400px;
`

export const Score = () => {
  const { colors } = useTheme()
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
        value: day.num === -1 ? config.STARTING_SCORE : undefined,
        order: day.order,
      }
    })
    let scorePreviousDay = config.STARTING_SCORE
    return listOfScore.map((score, index) => {
      if (index === 0) return score
      let foundData = false
      const scoreForTheDay = scores?.data.reduce((acc, scoreItem) => {
        const scoreDate = new Date(scoreItem.createdAt)
        if (scoreDate.getDay() === MAPPING_DAY_OF_THE_WEEK_REVERSE[score.name]) {
          foundData = true
          return (acc ?? 0) + scoreItem.variation
        }
        return acc
      }, scorePreviousDay)
      scorePreviousDay = scoreForTheDay ?? 0
      const isCurrentScoreBeforeToday =
        score.order <
        (MAPPING_NUM_DAY_NAME_DAY_ORDERED.find((day) => day.num === new Date().getDay())?.order ??
          0)
      return {
        name: score.name,
        value: foundData || isCurrentScoreBeforeToday ? scoreForTheDay : undefined,
      }
    })
  }, [scores])

  return (
    <Stack alignItems="center" gap={3}>
      <Text as="p" variant="headingLargeStrong">
        🏅 Score actuel: {calculatedScore}
      </Text>
      <StackStyled>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={scoresByDay}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 16]} width={40} />
            <CartesianGrid
              vertical={true}
              horizontal={false}
              strokeDasharray="3 3"
              stroke={colors.neutral.backgroundStrongerHover}
            />

            <ReferenceArea y1={13} y2={16} fill="#0017ff" fillOpacity={0.5} />
            <ReferenceArea y1={7} y2={13} fill="#00a104" fillOpacity={0.5} />
            <ReferenceArea y1={4} y2={7} fill="#fff224" fillOpacity={0.5} />
            <ReferenceArea y1={2} y2={4} fill="#ff9418" fillOpacity={0.5} />
            <ReferenceArea y1={0} y2={2} fill="#ff0000" fillOpacity={0.5} />
            <Line type="monotone" dataKey="value" stroke={colors.primary.text} strokeWidth={4} />
          </LineChart>
        </ResponsiveContainer>
      </StackStyled>
    </Stack>
  )
}

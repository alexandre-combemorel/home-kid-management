import { Link } from "@tanstack/react-router"
import { Stack, Text, Button } from "@ultraviolet/ui"
import { useMemo } from "react"

export const Result = ({ score }: { score: number }) => {
  const result = useMemo(() => {
    if (score > 0) {
      return {
        title: "Bravo !!!",
        img: "/images/winning.jpeg",
      }
    }
    if (score === 0) {
      return {
        title: "C'est bien !",
        img: "/images/even.jpeg",
      }
    }
    return {
      title: "Peu mieux faire !",
      img: "/images/losing.jpeg",
    }
  }, [score])

  return (
    <Stack gap={2} alignItems="center">
      <Text as="h2" variant="headingLargeStrong">
        {result.title}
      </Text>
      <img src={result.img} alt="" width="300px" />
      <Link to="/score">
        <Button>Voir mon score</Button>
      </Link>
    </Stack>
  )
}

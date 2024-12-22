import styled from "@emotion/styled"
import { Text } from "@ultraviolet/ui"

const TextEmoji = styled.span`
    &.small {
        font-size: 2rem;
        line-height: 3rem;
    }
    &.medium {
        font-size: 3rem;
        line-height: 4rem;
    }
    &.big {
        font-size: 4rem;
        line-height: 5rem;
    }
`
type EmojiTagType = {
  children: string
  size?: "small" | "medium" | "big"
}

export const EmojiTag = ({ children: emoji, size = "small" }: EmojiTagType) => {
  return (
    <Text as="p" variant="body">
      <TextEmoji className={size}>{emoji}</TextEmoji>
    </Text>
  )
}

import styled from "@emotion/styled"
import { Stack, Text } from "@ultraviolet/ui"

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.neutral.background};
  border-top: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  gap: ${({ theme }) => theme.space["1"]};
  width: 100%;
  padding: ${({ theme }) => `${theme.space["1"]}`} 0;
`

export const Footer = () => {
  return (
    <FooterContainer>
      <Stack alignItems="center">
        <Text as={"p"} variant="bodySmall">
          Version: 1.0.0
        </Text>
      </Stack>
    </FooterContainer>
  )
}

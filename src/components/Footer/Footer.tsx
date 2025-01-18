import styled from "@emotion/styled"
import { Stack, Text } from "@ultraviolet/ui"
import pkg from "../../../package.json"

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
          Version: {pkg.version}
        </Text>
      </Stack>
    </FooterContainer>
  )
}

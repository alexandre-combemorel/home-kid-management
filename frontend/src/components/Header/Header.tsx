import { useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { Button, Stack, SwitchButton, up } from "@ultraviolet/ui"
import type { ThemeValue } from "../../providers/ThemeProvider/ThemeProvider"
import { Menu } from "./Menu/Menu"
import { Link } from "@tanstack/react-router"
import { useAuth } from "../../providers/AuthProvider/AuthProvider"

const HeaderContainer = styled.header`
  min-height: 60px;

  &[data-top-show-section='false'] {
    height: 0;
    min-height: 0;
    padding: 0;
    overflow: hidden;
  }

  position: relative;
  top: 0;
  background-color: ${({ theme }) => theme.colors.neutral.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.space["1"]};
  min-width: 100%;
  padding: ${({ theme }) => `${theme.space["1"]}`};

  ${up(
    "medium",
    `
      position: sticky;
      z-index: 1;
      justify-content: space-between;`,
  )}
`

export const Header = () => {
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  return (
    <HeaderContainer>
      <Menu />
      <Stack direction="row" gap={2}>
        <Link key={"profile"} to={"/profile"}>
          <Button variant="ghost" sentiment="neutral">
            👤 {user?.email.split("@")[0]}
          </Button>
        </Link>
        <SwitchButton
          name="theme"
          value={theme}
          leftButton={{ label: "light", value: "light" }}
          rightButton={{ label: "dark", value: "dark" }}
          onChange={(event) => {
            const value = event.target.getAttribute("value")
            setTheme(value as ThemeValue)
          }}
        />
      </Stack>
    </HeaderContainer>
  )
}

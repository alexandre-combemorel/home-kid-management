import styled from "@emotion/styled"
import type { ReactNode } from "react"

const StyledMain = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overscroll-behavior-y: none;
`

const StyledGrid = styled.div`
  flex: 1;
  min-width: 400px;
  max-width: 100%;

  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: ${({ theme }) => theme.space["2"]} ${({ theme }) => theme.space["3"]};
`

export const ApplicationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledMain id="maincontent">
      <StyledGrid>{children}</StyledGrid>
    </StyledMain>
  )
}

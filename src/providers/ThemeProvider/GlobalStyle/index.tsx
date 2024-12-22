import type { Theme } from '@emotion/react'
import { Global, css } from '@emotion/react'
import { normalize } from '@ultraviolet/ui'
import '@ultraviolet/fonts/fonts.css'

const baseStyles = (theme: Theme) => css`
  ${normalize()}
  :root {
    color-scheme: ${
      theme.theme === 'dark' || theme.theme === 'darker' ? 'dark' : 'light'
    };
  }

  html,
  body {
    height: 100%;
  }

  body {
    color: ${theme.colors.neutral.text};
    background-color: ${theme.colors.neutral.background};
    font-family: ${theme.typography.body.fontFamily};
  }

  a {
    text-decoration: none;
  }

  ul {
    margin: 0;
  }

  iframe {
    border: none;
  }
`

const extraStyles = css`
  #root {
    display: flex;
    flex-direction: column;
    /*
      CNS-869 - Please don't remove zindex
    */
    z-index: 0;
    position: relative;
    overscroll-behavior-y: none;
  }
`

const customTransitionAnimation = css`
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-delay: -1ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  }
`

export const GlobalStyle = () => (
  <Global styles={[baseStyles, extraStyles, customTransitionAnimation]} />
)

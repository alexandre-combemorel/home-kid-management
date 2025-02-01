import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"
import { consoleDarkerTheme } from "@ultraviolet/themes"
import { darkTheme as scwUiDarkTheme, theme as scwUiLightTheme } from "@ultraviolet/ui"
import type { ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { GlobalStyle } from "./GlobalStyle"

export type ThemeValue = "unknown_console_theme" | "light" | "dark" | "system" | "darker"

export type HomeKidManagementTheme = {
  setTheme: (newTheme: ThemeValue) => void
} & typeof scwUiLightTheme

const THEMES_MAP = {
  light: scwUiLightTheme,
  dark: scwUiDarkTheme,
  darker: consoleDarkerTheme,
} as const

/**
 * This is the key used to store the theme in the localStorage.
 */
const THEME_ITEM_STORAGE = "theme"

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(scwUiLightTheme)

  const setThemeByName = useCallback((newTheme: ThemeValue) => {
    if (newTheme === "unknown_console_theme") {
      setTheme(scwUiLightTheme)
      localStorage.setItem(THEME_ITEM_STORAGE, "light")

      return
    }

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

      setTheme(THEMES_MAP[systemTheme] ? THEMES_MAP[systemTheme] : THEMES_MAP.light)
      localStorage.setItem(THEME_ITEM_STORAGE, newTheme)

      return
    }

    setTheme(THEMES_MAP[newTheme] ?? THEMES_MAP.light)
    localStorage.setItem(THEME_ITEM_STORAGE, newTheme)
  }, [])

  useEffect(() => {
    setThemeByName("system")
  }, [setThemeByName])

  return (
    <EmotionThemeProvider theme={{ ...theme, setTheme: setThemeByName }}>
      <GlobalStyle />
      {children}
    </EmotionThemeProvider>
  )
}

import "@emotion/react"
import type { HomeKidManagementTheme } from "../providers/ThemeProvider/ThemeProvider.tsx"

declare module "@emotion/react" {
  // https://emotion.sh/docs/typescript#define-a-theme

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends HomeKidManagementTheme {}
}

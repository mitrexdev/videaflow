"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ComponentProps } from "react"

/**
 * next-themes provider. `attribute="class"` toggles the `dark` class on
 * <html>, which our globals.css `.dark` block keys off. `defaultTheme="light"`
 * keeps the editorial light look until a visitor opts into dark/system.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

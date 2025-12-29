import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeStorage] = useLocalStorage<Theme>("theme", "light")
  const [mounted, setMounted] = useState(false)

  // Apply theme to document
  useEffect(() => {
    setMounted(true)
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeStorage((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  const setTheme = (newTheme: Theme) => {
    setThemeStorage(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  }

  // Prevent flash of unstyled content
  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export default ThemeContext

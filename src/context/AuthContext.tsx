import React, { createContext, useState, useEffect, ReactNode } from "react"
import authService from "../services/authService"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setTokenState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!token

  // Helper function to set token (stores directly without JSON.stringify)
  const setToken = (newToken: string | null) => {
    setTokenState(newToken)
    if (newToken) {
      localStorage.setItem("token", newToken)
    } else {
      localStorage.removeItem("token")
    }
  }

  // Load user and token from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const storedToken = localStorage.getItem("token")
      const storedUser = localStorage.getItem("user")
      
      if (storedToken && storedUser) {
        try {
          setTokenState(storedToken)
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse user data:", error)
          localStorage.removeItem("user")
          localStorage.removeItem("token")
        }
      }
      setIsLoading(false)
    }

    loadUser()
    // Only run once on mount
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      if (response.success && response.data) {
        setToken(response.data.token)
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await authService.register(userData)
      if (response.success && response.data) {
        setToken(response.data.token)
        setUser(response.data.user)
      }
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext

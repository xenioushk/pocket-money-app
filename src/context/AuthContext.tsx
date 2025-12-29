import React, { createContext, useState, useEffect, ReactNode } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
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
  const [token, setToken, removeToken] = useLocalStorage<string | null>("authToken", null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!token

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Verify token and get user data
          const userData = await authService.getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error("Failed to load user:", error)
          removeToken()
          setUser(null)
        }
      }
      setIsLoading(false)
    }

    loadUser()
  }, [token, removeToken])

  const login = async (email: string, password: string) => {
    try {
      const response = (await authService.login(email, password)) as any
      setToken(response.token)
      setUser(response.user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = (await authService.register(userData)) as any
      setToken(response.token)
      setUser(response.user)
    } catch (error) {
      console.error("Registration failed:", error)
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    removeToken()
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

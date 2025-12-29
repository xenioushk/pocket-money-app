export interface Job {
  id: number
  job_hash: string
  title: string
  description: string
  price: number
  location: string
  category: string
  category_slug: string
  created_at: string
  updated_at?: string
  user_id?: number
  status?: "active" | "inactive" | "completed"
}

export interface JobFormData {
  title: string
  description: string
  price: number
  location: string
  category: string
  recaptcha: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  count?: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface SearchParams {
  query: string
  category?: string
  location?: string
  minPrice?: number
  maxPrice?: number
}

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  phone?: string
  created_at: string
  updated_at?: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user: User
  message?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

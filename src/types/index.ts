// Job Types
export interface Job {
  id: number
  user_id: number
  title: string
  description: string
  category_id: number
  price: number
  duration: string
  city: string
  date: string
  status: "active" | "inactive" | "completed" | "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
  // Joined fields from database
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  category_name?: string
  category_slug?: string
  images?: JobImage[]
}

export interface JobImage {
  id: number
  job_id: number
  image_url: string
  is_primary: boolean
  created_at: string
}

export interface JobFormData {
  title: string
  description: string
  category_id: number
  price: number
  duration: string
  city: string
  date: string
  status?: "active" | "inactive" | "completed" | "pending" | "approved" | "rejected"
}

// Category Types
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  created_at: string
}

// User Types
export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  phone?: string
  role: "user" | "admin"
  created_at: string
}

// Auth Types
export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
    refreshToken: string
  }
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

// Favorites Types
export interface Favorite {
  id: number
  user_id: number
  job_id: number
  created_at: string
  // Joined job data
  job?: Job
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface SearchParams {
  q: string
  page?: number
  limit?: number
}

export interface JobQueryParams {
  category_id?: number
  city?: string
  status?: string
  min_price?: number
  max_price?: number
  page?: number
  limit?: number
  search?: string
}

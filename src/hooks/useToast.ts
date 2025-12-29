import { toast, ToastOptions } from "react-toastify"

interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => void
  error: (message: string, options?: ToastOptions) => void
  info: (message: string, options?: ToastOptions) => void
  warning: (message: string, options?: ToastOptions) => void
  promise: <T>(
    promise: Promise<T>,
    messages: {
      pending: string
      success: string
      error: string
    }
  ) => Promise<T>
}

/**
 * Custom hook for toast notifications
 * Wraps react-toastify with default options
 */
export const useToast = (): UseToastReturn => {
  const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }

  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options })
  }

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options })
  }

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options })
  }

  const warning = (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options })
  }

  const promiseToast = async <T>(
    promise: Promise<T>,
    messages: {
      pending: string
      success: string
      error: string
    }
  ): Promise<T> => {
    return toast.promise(promise, {
      pending: messages.pending,
      success: messages.success,
      error: messages.error,
    })
  }

  return {
    success,
    error,
    info,
    warning,
    promise: promiseToast,
  }
}

export default useToast

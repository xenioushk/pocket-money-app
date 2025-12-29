import { useState, useEffect } from "react"

/**
 * Custom hook to debounce a value
 * Useful for search inputs to avoid excessive API calls
 *
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cleanup function to cancel the timeout if value changes
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

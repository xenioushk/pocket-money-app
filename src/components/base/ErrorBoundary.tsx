import { Component, ReactNode, ErrorInfo } from "react"
import ErrorFallback from "./ErrorFallback"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo)
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      return this.props.fallback || <ErrorFallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

export default ErrorBoundary

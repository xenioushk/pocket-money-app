interface ErrorFallbackProps {
  error: Error | null
  resetError?: () => void
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Error Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>

          {/* Error Message */}
          <p className="text-gray-600 mb-6">We're sorry, but something unexpected happened. Please try again.</p>

          {/* Error Details (only in development) */}
          {import.meta.env.DEV && error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-red-800 mb-2">Error Details:</p>
              <p className="text-sm text-red-700 font-mono break-words">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-sm text-red-600 cursor-pointer">Stack Trace</summary>
                  <pre className="text-xs text-red-600 mt-2 overflow-auto max-h-40">{error.stack}</pre>
                </details>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {resetError && (
              <button onClick={resetError} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200">
                Try Again
              </button>
            )}
            <button onClick={() => (window.location.href = "/")} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200">
              Go to Homepage
            </button>
          </div>

          {/* Support Link */}
          <p className="mt-6 text-sm text-gray-500">
            If this problem persists, please{" "}
            <a href="/contact" className="text-blue-600 hover:text-blue-700 underline">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback

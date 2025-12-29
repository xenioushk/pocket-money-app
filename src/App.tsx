import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { lazy, Suspense } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import ErrorBoundary from "./components/base/ErrorBoundary"
import PrivateRoute from "./components/base/PrivateRoute"
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"
import loader from "./loader.gif"

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Lazy load all page components for code splitting
const Home = lazy(() => import("./components/pages/Home"))
const AboutUs = lazy(() => import("./components/pages/AboutUs"))
const SearchBox = lazy(() => import("./components/search/SearchBox"))
const Terms = lazy(() => import("./components/pages/Terms"))
const Category = lazy(() => import("./components/pages/Category"))
const SingleJob = lazy(() => import("./components/pages/SingleJob"))
const AddJob = lazy(() => import("./components/form/AddJob"))
const EditJob = lazy(() => import("./components/form/EditJob"))
const Login = lazy(() => import("./components/pages/Login"))
const Register = lazy(() => import("./components/pages/Register"))
const Profile = lazy(() => import("./components/pages/Profile"))
const Dashboard = lazy(() => import("./components/pages/Dashboard"))

// Loading fallback component
const PageLoader: React.FC = () => (
  <div className="grid justify-items-center mt-10">
    <img src={loader} alt="Loading..." />
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <ToastContainer position="top-center" autoClose={3000} />
              <Header />
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/search-job" element={<SearchBox />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/category/:catSlug" element={<Category />} />
                  <Route path="/job/:id" element={<SingleJob />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected Routes - Require Authentication */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/add-job"
                    element={
                      <PrivateRoute>
                        <AddJob />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/job/edit/:jobHash/:jobId"
                    element={
                      <PrivateRoute>
                        <EditJob />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Suspense>
              <Footer />
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App

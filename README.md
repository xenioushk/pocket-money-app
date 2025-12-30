# 💰 Pocket Money App

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.2-06b6d4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

**A modern, full-featured platform for managing micro jobs and gig work**

[Live Demo](https://pocket-money-23.netlify.app/) · [Report Bug](https://github.com/yourusername/pocket-money-app/issues) · [Request Feature](https://github.com/yourusername/pocket-money-app/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Architecture](#-architecture)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Pocket Money App is a comprehensive job management platform that connects people looking for quick tasks with those offering micro jobs. Built with modern React patterns and TypeScript, it provides a seamless experience for posting, browsing, and managing small gigs.

### Key Highlights

- ✅ **Modern Stack**: React 18, TypeScript, Vite, TailwindCSS
- ✅ **State Management**: TanStack Query (React Query) for server state
- ✅ **Type Safety**: Full TypeScript coverage with strict mode
- ✅ **Authentication**: Context-based auth with protected routes
- ✅ **Form Handling**: React Hook Form with validation
- ✅ **Responsive Design**: Mobile-first approach with Tailwind
- ✅ **Dark Mode**: Full dark mode with ThemeContext and local storage persistence
- ✅ **Code Splitting**: Lazy loading for optimal performance
- ✅ **Error Boundaries**: Graceful error handling
- ✅ **URL State Management**: Sorting and pagination in URL
- ✅ **Category Management**: Admin interface for CRUD operations
- ✅ **Job Counts**: Real-time job counts in category sidebar
- ✅ **Modern Components**: Confirmation dialogs, pagination, theme toggle

---

## ✨ Features

### 🔐 User Authentication

- User registration with validation
- Secure login/logout
- Protected routes for authenticated users
- Profile management
- Persistent authentication state

### 💼 Job Management

- **Browse Jobs**: Filter by category with sidebar navigation
- **Search**: Real-time search with modern dropdown UI and debouncing
- **Post Jobs**: Create new job listings with rich details
- **Edit Jobs**: Update existing job posts
- **Categories**: Organized job categorization with job counts
- **Sorting**: Sort jobs by date, price, or title (ascending/descending)
- **Pagination**: Modern pagination with URL persistence
- **URL State**: Sorting and pagination reflected in URL for bookmarking

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach (mobile, tablet, desktop)
- **Dark Mode**: Full dark mode support with theme toggle
- **Modern UI**: Glassmorphism effects, gradients, and smooth animations
- **Loading States**: Skeleton loaders and spinners
- **Toast Notifications**: Modern gradient toasts for user feedback
- **Breadcrumb Navigation**: Context-aware navigation
- **Category Sidebar**: Job counts and active state indicators
- **Search Dropdown**: Rich search results with icons and metadata
- **Accessibility**: ARIA labels and keyboard navigation support

### 🎯 Admin Features

- **Job Management**: Approve, reject, or delete job posts
- **Category Management**: Full CRUD operations for categories
- **User Creation**: Create new users with admin/user roles
- **Status Control**: Change job status with confirmation dialogs
- **Bulk Operations**: Filter and manage multiple jobs
- **Protected Routes**: Role-based access control

### 🛡️ Security & Privacy

- **reCAPTCHA**: Spam protection for contact forms
- **Form Validation**: Client and server-side validation
- **Input Sanitization**: XSS protection
- **Protected API Routes**: JWT-based authentication
- **Role-Based Access**: Admin and user permissions
- **Confirmation Dialogs**: Prevent accidental deletions

### Core

- **React 18.2** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 5.4** - Build tool & dev server

### State Management & Data Fetching

- **TanStack Query 5.90** - Server state management
- **React Context API** - Global state (Auth, Theme)
- **React Hook Form 7.39** - Form state management

### Routing & Navigation

- **React Router 6.4** - Client-side routing

### Styling

- **TailwindCSS 3.2** - Utility-first CSS
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### HTTP & API

- **Axios 1.1** - HTTP client with interceptors

### Additional Libraries

- **React Toastify** - Toast notifications
- **Google reCAPTCHA** - Bot protection

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher (or yarn/pnpm)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pocket-money-app.git
   cd pocket-money-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:

   ```env
   VITE_PM_API_URL=https://your-backend-url.com
   VITE_SEC_SITE_KEY=your_recaptcha_site_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
pocket-money-app/
├── public/                 # Static assets
│   └── index.html         # HTML template
├── src/
│   ├── components/        # React components
│   │   ├── base/         # Base components (Pagination, ConfirmDialog, ThemeToggle, etc.)
│   │   ├── form/         # Form components (AddJob, EditJob, FormInput, etc.)
│   │   ├── jobs/         # Job-related components (JobItem, Jobs)
│   │   ├── layout/       # Layout components (JobsLayout with sidebar)
│   │   ├── pages/        # Page components (Home, Category, AdminDashboard, ManageCategories, etc.)
│   │   ├── search/       # Search components (SearchBox with modern dropdown)
│   │   └── shared/       # Shared components (Header, Footer)
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── ThemeContext.tsx     # Dark mode theme state
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.ts           # Authentication hook
│   │   ├── useDebounce.ts       # Debounce hook for search
│   │   ├── useJobs.ts           # Jobs data fetching hook
│   │   ├── useTheme.ts          # Theme toggle hook
│   │   └── useToast.ts          # Toast notifications hook
│   ├── services/         # API services
│   │   ├── api.ts              # Axios instance with interceptors
│   │   ├── authService.ts      # Authentication API
│   │   ├── categoryService.ts  # Category CRUD operations
│   │   └── jobService.ts       # Job operations
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts            # All interfaces (Job, Category, User, etc.)
│   ├── App.tsx           # Main app component with routing
│   ├── index.tsx         # Entry point
│   └── index.css         # Global styles with Tailwind utilities
├── database_seeds.sql    # 115 sample jobs for development
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.cjs   # Tailwind configuration with dark mode
└── README.md             # This file
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev       # Start development server (http://localhost:5173)
npm run start     # Alias for npm run dev
```

### Production

```bash
npm run build     # Build for production (outputs to /build)
npm run preview   # Preview production build locally
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_PM_API_URL=https://your-backend-api.com

# Google reCAPTCHA (optional - app works without it)
VITE_SEC_SITE_KEY=your_recaptcha_site_key_here
```

### Environment Variables Explained

| Variable            | Description                  | Required |
| ------------------- | ---------------------------- | -------- |
| `VITE_PM_API_URL`   | Backend API base URL         | Yes      |
| `VITE_SEC_SITE_KEY` | Google reCAPTCHA v2 site key | No\*     |

\*App will function without reCAPTCHA, but spam protection will be disabled.

---

## 🏗️ Architecture

### Design Patterns

- **Component Composition**: Reusable, composable components
- **Custom Hooks**: Logic abstraction and reusability
- **Context API**: Global state management for auth and theme
- **Server State**: TanStack Query for caching and synchronization
- **Code Splitting**: Lazy loading for route-based code splitting

### Key Features

#### 1. **Type Safety**

All components use TypeScript interfaces:

```typescript
interface JobProps {
  job: Job
  single?: boolean
}
```

#### 2. **Server State Management**

TanStack Query handles all server interactions:

```typescript
const { data: jobs, isLoading } = useJobs()
const createJobMutation = useCreateJob()
```

#### 3. **Protected Routes**

Authentication-based route protection:

```typescript
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

#### 4. **Error Boundaries**

Graceful error handling:

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</ErrorBoundary>
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Destructure props in function parameters
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting (Prettier recommended)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite](https://vitejs.dev)

---

## 📞 Contact & Support

- **Live Demo**: [https://pocket-money-23.netlify.app/](https://pocket-money-23.netlify.app/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/pocket-money-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pocket-money-app/discussions)

---

<div align="center">

**Made with ❤️ using React & TypeScript**

⭐ Star this repo if you find it helpful!

</div>

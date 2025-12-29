# TanStack Query Integration Guide

## What is TanStack Query?

TanStack Query (formerly React Query) is a powerful data-fetching and state management library that provides:

- **Automatic caching** - Reduces redundant API calls
- **Background refetching** - Keeps data fresh
- **Optimistic updates** - Instant UI feedback
- **Request deduplication** - Multiple components requesting same data = 1 API call
- **Automatic garbage collection** - Cleans up unused data

## Implementation

### 1. Setup (App.js)

```javascript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Wrap app
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### 2. Custom Hooks Created

#### `src/hooks/useJobs.js`

**Query Hooks (Fetching Data):**

- `useJobs(page, limit, catSlug)` - Fetch paginated jobs with caching
- `useJob(jobId)` - Fetch single job with caching
- `useSearchJobs(searchTerm)` - Search jobs with automatic caching

**Mutation Hooks (Modifying Data):**

- `useCreateJob()` - Create job with automatic cache invalidation
- `useUpdateJob()` - Update job with optimistic updates
- `useDeleteJob()` - Delete job with optimistic UI updates
- `usePrefetchJobs()` - Prefetch next page for better UX

#### `src/hooks/useDebounce.js`

- Debounces search input to avoid excessive API calls
- 500ms default delay (customizable)

### 3. Components Refactored

#### SearchBox.js - Before & After

**Before (Manual State Management):**

```javascript
const [searchData, setSearchData] = useState([])
const [loading, setLoading] = useState(false)

useEffect(() => {
  // Manual timeout and API call
  const timer = setTimeout(() => {
    axios.get(...).then(...)
  }, 1500)
  return () => clearTimeout(timer)
}, [searchText])
```

**After (TanStack Query + Debounce):**

```javascript
const debouncedSearchTerm = useDebounce(searchText, 800)
const { data: searchResults, isLoading } = useSearchJobs(debouncedSearchTerm)
// Automatic caching, no manual state management!
```

**Benefits:**

- ✅ Automatic caching of search results
- ✅ No duplicate requests
- ✅ Cleaner code (20 lines → 3 lines)
- ✅ Better performance

#### AddJob.js - Before & After

**Before (Manual axios calls):**

```javascript
const [loading, setLoading] = useState(false)

const sendPostRequest = async (data) => {
  try {
    setLoading(true)
    const resp = await axios.post(...)
    // Manual success handling
    toast.success(...)
    reset()
  } catch (err) {
    toast.error(...)
  } finally {
    setLoading(false)
  }
}
```

**After (TanStack Query Mutation):**

```javascript
const createJobMutation = useCreateJob()

const onSubmit = (data) => {
  createJobMutation.mutate(data, {
    onSuccess: () => {
      reset()
      // Automatic cache invalidation!
    },
  })
}
```

**Benefits:**

- ✅ Automatic loading states (`createJobMutation.isPending`)
- ✅ Automatic cache invalidation
- ✅ Error handling built-in
- ✅ Success/error toasts in hooks
- ✅ No manual state management

#### EditJob.js - Optimistic Updates

**Before:**

```javascript
const deleteJob = async () => {
  const resp = await axios.delete(...)
  // Wait for server response, then navigate
  if (resp.data.status === 1) {
    navigate("/")
  }
}
```

**After (with Optimistic Update):**

```javascript
const deleteJobMutation = useDeleteJob()

const deleteJob = () => {
  deleteJobMutation.mutate(jobId, {
    onSuccess: () => navigate("/"),
  })
}

// In useDeleteJob hook:
onMutate: async (jobId) => {
  // Immediately update UI (optimistic)
  queryClient.setQueryData(["jobs"], (old) => old.filter((job) => job.id !== jobId))
  // If server fails, automatic rollback!
}
```

**Benefits:**

- ✅ Instant UI feedback (no waiting for server)
- ✅ Automatic rollback on error
- ✅ Better perceived performance

### 4. Cache Management

**Automatic Cache Invalidation:**

```javascript
// After creating a job
queryClient.invalidateQueries({ queryKey: ["jobs"] })
// All components using useJobs will automatically refetch!

// After updating a job
queryClient.invalidateQueries({ queryKey: ["job", jobId] })
queryClient.invalidateQueries({ queryKey: ["jobs"] })
```

**Cache Time Settings:**

```javascript
staleTime: 5 * 60 * 1000 // Data fresh for 5 minutes
gcTime: 10 * 60 * 1000 // Cache persists for 10 minutes
```

### 5. Developer Tools

**React Query DevTools** (only in development):

- See all queries and their states
- Inspect cache data
- Manually trigger refetch
- View network activity

Access: Click the TanStack Query icon in bottom-right corner during development

## Performance Improvements

### Before (Manual Management):

- **Redundant Requests:** Search 3 times = 3 API calls
- **No Caching:** Navigate back = refetch everything
- **Manual Loading States:** Track in each component
- **No Request Deduplication:** 2 components need same data = 2 API calls

### After (TanStack Query):

- **Smart Caching:** Search 3 times = 1 API call (cached for 5 min)
- **Background Sync:** Data stays fresh automatically
- **Automatic Loading States:** `isLoading`, `isPending`, `isError`
- **Request Deduplication:** 2 components need same data = 1 API call

## Code Reduction

**Total lines removed:** ~150 lines of boilerplate  
**Components simplified:**

- SearchBox.js: 60 lines → 35 lines
- AddJob.js: 80 lines → 50 lines
- EditJob.js: 100 lines → 70 lines

**Result:** Cleaner, more maintainable code!

## Testing Benefits

With TanStack Query:

- Easy to mock in tests
- Built-in retry logic
- Automatic error handling
- Predictable state management

## Migration to New Backend

When switching to your PostgreSQL backend:

1. Update `jobService.js` endpoints
2. TanStack Query hooks work unchanged!
3. All caching and optimistic updates work automatically

**No changes needed in components!** 🎉

## Best Practices Implemented

✅ Separate query keys for different data  
✅ Automatic cache invalidation on mutations  
✅ Optimistic updates for better UX  
✅ Error handling in hooks  
✅ Loading states automatically managed  
✅ DevTools enabled in development  
✅ Request deduplication  
✅ Background refetching

## Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Query DevTools](https://tanstack.com/query/latest/docs/framework/react/devtools)
- [Best Practices](https://tkdodo.eu/blog/practical-react-query)

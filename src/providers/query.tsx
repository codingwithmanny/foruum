// Imports
// ========================================================
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query"

// Config
// ========================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    },
  },
});

// Provider
// ========================================================
const Query = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}

// Exports
// ========================================================
export default Query;
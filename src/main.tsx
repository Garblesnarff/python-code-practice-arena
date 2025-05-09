
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { SearchProvider } from "./contexts/SearchContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <SearchProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
)

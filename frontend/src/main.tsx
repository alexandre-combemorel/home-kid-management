import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import App from "./routes.tsx"
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider.tsx"
import { ToastContainer } from "@ultraviolet/ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthProvider from "./providers/AuthProvider/AuthProvider.tsx"
const queryClient = new QueryClient()

// Main
// biome-ignore lint/style/noNonNullAssertion: this is root dom access for react
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryClientProvider>
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </StrictMode>,
  )
}

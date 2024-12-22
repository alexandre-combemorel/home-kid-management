import ReactDOM from "react-dom/client"
import { StrictMode } from "react"
import App from "./routes.tsx"
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider.tsx"
import { ToastContainer } from "@ultraviolet/ui"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <ToastContainer position="bottom-right" />
      </ThemeProvider>
    </StrictMode>,
  )
}

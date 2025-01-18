import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  // @ts-expect-error wrong type provided by @vitejs/plugin-react-swc
  plugins: [react()],
  server: {
    port: 3000,
  },
})

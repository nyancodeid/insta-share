import { defineConfig } from "vite"
import { resolve } from "path";
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
  plugins: [vue()]
})

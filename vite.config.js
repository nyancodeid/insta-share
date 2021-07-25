import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  resolve: {
    alias: {
      "@src": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "InstaShare - Instant File Sharing",
        short_name: "InstaShare",
        description : "Instant File Sharing powered by IPFS Protocol",
        theme_color: "#212121",
        registerType: "autoUpdate",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ]
})

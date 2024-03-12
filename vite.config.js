import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,vue}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg,ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "assets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // <== 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "fonts/*.ttf",
        "images/*.png",
      ],
      manifest: {
        name: "Tomodo",
        short_name: "Tomodo",
        start_url: "/",
        description:
          "Tomodo is application to do list for make human productive. Create todo right now, let's do great today, don't busy be productive.",
        theme_color: "#ffffff",
        screenshots: [
          {
            src: "screenshots/wide-1.jpg",
            sizes: "768x432",
            form_factor: "wide",
            label: "home",
          },
          {
            src: "screenshots/wide-2.jpg",
            sizes: "768x432",
            form_factor: "wide",
            label: "detail collection",
          },
          {
            src: "screenshots/wide-3.jpg",
            sizes: "768x432",
            form_factor: "wide",
            label: "import collection",
          },
          {
            src: "screenshots/wide-4.jpg",
            sizes: "768x432",
            form_factor: "wide",
            label: "form update collection",
          },
          {
            src: "screenshots/narrow-1.jpg",
            sizes: "375x667",
            form_factor: "narrow",
            label: "home",
          },
          {
            src: "screenshots/narrow-2.jpg",
            sizes: "375x667",
            form_factor: "narrow",
            label: "detail collection",
          },
          {
            src: "screenshots/narrow-3.jpg",
            sizes: "375x667",
            form_factor: "narrow",
            label: "update collection",
          },
          {
            src: "screenshots/narrow-4.jpg",
            sizes: "375x667",
            form_factor: "narrow",
            label: "import collection",
          },
        ],
        shortcuts: [
          {
            name: "Import Collection",
            short_name: "Import",
            description: "Import the collection",
            url: "/import",
            icons: [
              {
                src: "icons/pwa-import-white.png",
                sizes: "192x192",
              },
            ],
          },
        ],
        icons: [
          {
            src: "icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

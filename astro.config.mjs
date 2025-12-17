import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  site: "https://www.cgcapps.cl",
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
    },
    remotePatterns: [{ protocol: "https" }],
  },
  build: {
    inlineStylesheets: "auto",
    assets: "_astro",
  },
  compressHTML: true,
  vite: {
    assetsInclude: [
      "**/*.svg",
      "**/*.png",
      "**/*.jpg",
      "**/*.gif",
      "**/*.webp",
    ],
    build: {
      cssCodeSplit: true,
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
          },
        },
      },
    },
  },
});

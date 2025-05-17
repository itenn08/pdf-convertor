import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";
import EnvironmentPlugin from "vite-plugin-environment";

const pwaManifest = {
  registerType: "prompt" as const,
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon.png",
    "icons/icon-48x48.png",
    "icons/icon-72x72.png",
    "icons/icon-96x96.png",
    "icons/icon-128x128.png",
    "icons/icon-144x144.png",
    "icons/icon-152x152.png",
    "icons/icon-192x192.png",
    "icons/icon-256x256.png",
    "icons/icon-384x384.png",
    "icons/icon-512x512.png",
  ],
  build: {
    assetsDir: "assets",
  },
  manifest: {
    name: "PDF Generator",
    short_name: "PDF Gen",
    description: "A simple PDF generator application",
    icons: [
      {
        src: "icons/icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        src: "icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    theme_color: "#d6d6d6",
    background_color: "#d6d6d6",
    display: "standalone" as const,
    scope: "/" as const,
    start_url: "/" as const,
    orientation: "portrait" as const,
  },
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaManifest), EnvironmentPlugin("all")],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

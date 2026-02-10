import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      refresh: true,
      ssr: "resources/js/ssr.tsx",
    }),
    tailwindcss(),
    react({}),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
      "@/Components": path.resolve(__dirname, "./resources/js/Components"),
      "@/lib": path.resolve(__dirname, "./resources/js/lib"),
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});

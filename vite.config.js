import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // ১. এই লাইনটি নতুন যোগ করবেন

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // ২. এখানে কমা দিয়ে tailwindcss() যোগ করবেন
  ],
});

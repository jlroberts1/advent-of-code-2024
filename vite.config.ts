import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteProblemLoader } from "./vite-plugin-problem-loader";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.txt"],
  plugins: [react(), viteProblemLoader()],
});

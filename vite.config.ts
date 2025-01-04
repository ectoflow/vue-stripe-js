import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  build: {
    lib: {
      name: "vue-stripe-js",
      entry: "src/main.ts",
      fileName: (format) => `vue-stripe.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue()],
})

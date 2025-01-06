import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      name: "vue-stripe-js",
      fileName: "vue-stripe",
      formats: ["es", "umd", "cjs"],
      entry: ["src/main.ts"],
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
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      rollupTypes: true,
    }),
  ],
})

import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/main.ts'),
            name: 'kol-loot',
            // the proper extensions will be added
            fileName: 'kol-loot',
        },
        minify: false,
        terserOptions: {
          compress: false,
          mangle: false,
        },
    },
    base: '/kol-loot/'
});

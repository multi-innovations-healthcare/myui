import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(() => {
  const envBasePath = "/myui/";

  return {
    plugins: [
      react(),
      tailwindcss(),
      dts({ insertTypesEntry: true, include: ['src'], tsconfigPath: './tsconfig.app.json' })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'MyUI',
        formats: ['es', 'umd'],
        fileName: (format) => `myui.${format}.js`
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM'
          }
        }
      }
    },
    base: envBasePath,
    server: {
      host: '0.0.0.0',
      port: 8889,
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
  }
})

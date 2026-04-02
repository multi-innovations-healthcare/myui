import { defineConfig, type ConfigEnv, type UserConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import Icons from 'unplugin-icons/vite'
import compression from 'vite-plugin-compression'
import visualizer from 'rollup-plugin-visualizer'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {

  const HOST = process.env.HOST || "0.0.0.0";
  const PORT = Number(process.env.PORT) || 8889;
  const envBasePath = "/";
  const isProd = mode === "production";
  const outDir = path.resolve(__dirname, process.env.OUT_DIR || "./dist");
  /** Docs / deploy server SPA (index.html). Default build remains the npm library. */
  const buildSite = process.env.VITE_BUILD_TARGET === "site";

  const buildTime = new Date();
  const buildTimeFormatted = `${String(buildTime.getDate()).padStart(2, "0")}/${String(buildTime.getMonth() + 1).padStart(2, "0")}/${buildTime.getFullYear()} ${String(buildTime.getHours()).padStart(2, "0")}:${String(buildTime.getMinutes()).padStart(2, "0")}:${String(buildTime.getSeconds()).padStart(2, "0")}`;

  if (isProd) {
    const kind = buildSite ? "Site (SPA)" : "Library";
    console.log(`🚀 Building ${kind} for Production | Time: ${buildTimeFormatted} | Directory: ${outDir}`);
  }

  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
        include: /\.[jt]sx?$/
      }),
      tailwindcss(),
      ...(buildSite
        ? []
        : [
            dts({ insertTypesEntry: true, include: ['src'], tsconfigPath: './tsconfig.app.json' }),
            cssInjectedByJsPlugin(),
          ]),
      Icons({
        compiler: 'jsx',
        jsx: 'react',
        autoInstall: true,
        defaultStyle: 'display: inline-block',
      }),
      ...(isProd
        ? [
          compression({
            algorithm: "brotliCompress",
            ext: ".br",
            threshold: 10240,
          }),
          compression({
            algorithm: "gzip",
            ext: ".gz",
            threshold: 10240,
          }),
        ] : []),
      ...(!isProd
        ? [
          visualizer({
            open: false,
            filename: "stats.html",
            gzipSize: true,
            brotliSize: true,
          }),
        ]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    base: envBasePath,
    server: {
      host: HOST,
      port: PORT,
      proxy: {
        "/api": {
          target: "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/ws": {
          target: "ws://localhost:3001",
          ws: true,
        },
      },
      allowedHosts: ["all"],
      cors: {
        origin: ["*"],
        credentials: true,
      },
    },
    define: {
      __APP_BUILD_TIME__: JSON.stringify(buildTimeFormatted),
    },
    build: buildSite
      ? {
          target: "esnext",
          outDir,
          cssCodeSplit: true,
          sourcemap: !isProd,
          minify: isProd ? "oxc" : false,
          chunkSizeWarningLimit: 1500,
          reportCompressedSize: false,
          rollupOptions: {
            checks: { pluginTimings: false },
          },
        }
      : {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'MyUI',
            formats: ['es', 'umd'],
            fileName: (format) => `myui.${format}.js`
          },
          target: "esnext",
          outDir,
          cssCodeSplit: true,
          sourcemap: !isProd,
          minify: "oxc",
          chunkSizeWarningLimit: 1500,
          reportCompressedSize: false,
          rollupOptions: {
            // Rolldown-only: silence "PLUGIN_TIMINGS" when plugins dominate (icons/dts/babel).
            checks: { pluginTimings: false },
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: {
              globals: {
                react: "React",
                "react-dom": "ReactDOM",
                "react/jsx-runtime": "react/jsx-runtime",
              },
              entryFileNames: "assets/[hash].js",
              chunkFileNames: "assets/[hash].js",
              assetFileNames: "assets/[hash].[ext]",
              ...(isProd && {
                minify: {
                  mangle: true,
                  compress: {
                    dropConsole: true,
                    dropDebugger: true,
                  },
                },
              }),
            },
          },
        },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  }
})

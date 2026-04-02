import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import './lib/dayjs'
import App from './App.tsx'


const { BASE_URL, MODE } = import.meta.env as { BASE_URL: string; MODE: string };

const routerBasename =
  !BASE_URL || BASE_URL === "/" ? "" : BASE_URL.replace(/\/$/, "");

if (MODE === "production") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const message =
      typeof args[0] === "string" ? args[0] : args[0]?.toString?.();
    if (message?.includes("404") || message?.includes("Not Found")) return;
    originalConsoleError(...args);
  };
}

if (MODE === "production") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    const message =
      typeof args[0] === "string" ? args[0] : args[0]?.toString?.();
    if (message?.includes("404") || message?.includes("Not Found")) return;
    originalConsoleError(...args);
  };
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('❌ Root element with id "root" not found.');
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import './lib/dayjs' // Initializing dayjs with Thai plugins and defaults
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/myui">
      <App />
    </BrowserRouter>
  </StrictMode>,
)

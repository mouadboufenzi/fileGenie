import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import './index.css'

/** 
 * This is the entry point for the frontend application. 
 * It renders the App component into the root element. (frontend/public/index.html)
 */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

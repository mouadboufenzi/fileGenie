import "@mantine/core/styles.css";
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'
import { theme } from './theme.ts'

import App from './App.tsx'
import Error404 from './pages/Error404.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    children: []
  }
])


/** 
 * This is the entry point for the frontend application. 
 * It renders the App component into the root element. (frontend/public/index.html)
 */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
)

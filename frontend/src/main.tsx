import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './assets/index.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { theme } from './theme.ts';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { AuthProvider } from './components/auth-provider.tsx';
import { Layout } from './components/layout.tsx';

/** 
 * This is the entry point for the frontend application. 
 * It renders the App component into the root element. (frontend/public/index.html)
 */

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    touret: typeof router;
  }
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <MantineProvider theme={theme}>
        <Notifications />
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </MantineProvider>
    </AuthProvider>
  </StrictMode>,
);

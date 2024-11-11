import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './assets/index.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { theme } from './theme.ts';
import { router } from './router.tsx';
import { Layout } from './components/layout.tsx';

/** 
 * This is the entry point for the frontend application. 
 * It renders the App component into the root element. (frontend/public/index.html)
 */

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <Layout>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Layout>
    </MantineProvider>
  </StrictMode>,
);

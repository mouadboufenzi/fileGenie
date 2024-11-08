import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

import { theme } from '../theme';
import { MemoryRouter, RouterProvider, RouterProviderProps } from 'react-router-dom';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={theme}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </MantineProvider>
    ),
  });
};

export function route(router: RouterProviderProps['router']) {
  return testingLibraryRender(<></>, {
    wrapper: () => (
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    ),
  });
}

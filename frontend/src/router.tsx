import { createBrowserRouter } from 'react-router-dom';

import App from './pages/App.tsx';
import Error404 from './pages/errors/Error404.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    children: []
  }
]);

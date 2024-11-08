import { createBrowserRouter } from 'react-router-dom';

import App from './pages/app.tsx';
import Error404 from './pages/errors/error404.tsx';
import Login from './pages/auth/login.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      }
    ]
  }
]);

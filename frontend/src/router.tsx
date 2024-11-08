import { createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from './components/protected-route.tsx';

import App from './pages/app.tsx';
import Error404 from './pages/errors/error404.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/auth/login.tsx';
import Register from './pages/auth/register.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/home',
        element: <ProtectedRoute><Home /></ProtectedRoute>,
      }
    ]
  }
]);

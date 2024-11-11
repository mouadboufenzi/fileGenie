import { useLocalStorage } from '@mantine/hooks';

import LoginPage from './auth/login';
import Home from './home/home';

export default function App() {
  const [token] = useLocalStorage({ key: 'token', defaultValue: '' });

  if (token) return <Home />;
  return <LoginPage />;
}
import { useLocalStorage } from '@mantine/hooks';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [token] = useLocalStorage({
    key: 'token',
    defaultValue: '',
  });

  if (token) return children;
  return <Navigate to="/login" />;
}
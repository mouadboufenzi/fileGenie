import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuth } from '../auth-provider';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Navigate to="/profile" />;
}

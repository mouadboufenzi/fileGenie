import { Button } from '@mantine/core';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../components/auth-provider';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Button onClick={logout}>Déconnexion</Button>;
}

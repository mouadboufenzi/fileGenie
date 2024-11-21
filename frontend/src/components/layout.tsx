import { Card, Group, Image, Stack, Title } from '@mantine/core';
import { useAuth } from '../auth-provider';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return children;

  return (
    <Stack gap="md">
      <Card p={0} shadow="xs" radius={0}>
        <Group justify="space-between" p="xs">
          <Group 
            align="center" 
            gap="xs" 
            className="cursor-pointer" 
            onClick={() => window.location.href = '/'}
            data-testid="logo"
          >
            <Image src="/icon.png" h={30} />
            <Title order={3} lh="30px" ff="Archivo">FileGenie</Title>
          </Group>

          <Image
            data-testid="profile-icon"
            src="/user_icon.png"
            h={25}
            className="cursor-pointer"
            onClick={() => window.location.href = '/profile'}
          />
        </Group>
      </Card>

      {children}
    </Stack>
  );
}
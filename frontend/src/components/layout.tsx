import { Card, Group, Image, Stack, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { FaCircleUser } from 'react-icons/fa6';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [token] = useLocalStorage({ key: 'token', defaultValue: '' });
  if (!token) return children;

  return (
    <Stack gap="md">
      <Card p={0} shadow="xs" radius={0}>
        <Group justify="space-between" p="xs">
          <Group align="center" gap="xs" className="cursor-pointer" onClick={() => window.location.href = '/'}>
            <Image src="/icon.png" h={30} />
            <Title order={3} lh="30px" ff="Archivo">FileGenie</Title>
          </Group>

          <FaCircleUser 
            size={25} 
            color="#999" 
            className="cursor-pointer"
            onClick={() => window.location.href = '/profile'}
          />
        </Group>
      </Card>

      {children}
    </Stack>
  );
}
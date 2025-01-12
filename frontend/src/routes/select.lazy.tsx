import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Group, Card, Image, Text, Stack } from '@mantine/core';

export const Route = createLazyFileRoute('/select')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const handleClick = (fileType: string) => {
    void navigate({ to: '/file', search: { type: fileType } });
  };

  return (
    <Stack
      maw="800"
      ml="auto"
      mr="auto"
      h="calc(100vh - 150px - (2 * var(--mantine-spacing-md)))"
      justify="center"
      align="center"
    >
      <Text fw={500} size="lg" mb="md">
        Quel type de fichier voulez-vous générer ?
      </Text>
      <Group align="center" gap="3rem" justify="center">
        {/* JSON */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          w="140"
          style={{
            cursor: 'pointer',
            borderColor: 'var(--mantine-color-yellow-text)',
          }}
          onClick={() => handleClick('json')}
        >
          <Image src="/json.png" alt="JSON" height={60} fit="contain" />
          <Text
            c="yellow"
            ta="center"
            style={{ fontWeight: 600, marginTop: '0.5rem' }}
          >
            JSON
          </Text>
        </Card>

        {/* XML */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          w="140"
          style={{
            cursor: 'pointer',
            borderColor: 'var(--mantine-color-red-text)',
          }}
          onClick={() => handleClick('xml')}
        >
          <Image src="/xml.png" alt="XML" height={60} fit="contain" />
          <Text
            c="red"
            ta="center"
            style={{ fontWeight: 600, marginTop: '0.5rem' }}
          >
            XML
          </Text>
        </Card>

        {/* CSV */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          w="140"
          style={{
            cursor: 'pointer',
            borderColor: 'var(--mantine-color-green-text)',
          }}
          onClick={() => handleClick('csv')}
        >
          <Image src="/csv.png" alt="CSV" height={60} fit="contain" />
          <Text
            c="green"
            ta="center"
            style={{ fontWeight: 600, marginTop: '0.5rem' }}
          >
            CSV
          </Text>
        </Card>

        {/* YML */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          w="140"
          style={{
            cursor: 'pointer',
            borderColor: 'var(--mantine-color-violet-text)',
          }}
          onClick={() => handleClick('yml')}
        >
          <Image src="/yml.png" alt="YML" height={60} fit="contain" />
          <Text
            c="violet"
            ta="center"
            style={{ fontWeight: 600, marginTop: '0.5rem' }}
          >
            YAML
          </Text>
        </Card>
      </Group>
    </Stack>
  );
}

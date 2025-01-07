import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Group, Card, Image, Text, Container } from '@mantine/core';

export const Route = createLazyFileRoute('/typefile')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate(); // Hook pour naviguer dynamiquement

  const handleClick = (fileType : string) => {
    void navigate({ to: '/createfile', search: { type: fileType } }); // Ajout de la query string
  };

  return (
    <Container style={{ marginTop: '5rem', textAlign: 'center' }}>
      <Text fw={500} size="lg" mb="md">
        Quel type de fichier voulez-vous générer ?
      </Text>
      <Group align="center" gap="xl" justify="center">
        {/* JSON */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('json')}
        >
          <Image src="/Json.png" alt="JSON" height={60} fit="contain" />
          <Text c="orange" ta="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            JSON
          </Text>
        </Card>

        {/* XML */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('xml')}
        >
          <Image src="/XML.png" alt="XML" height={60} fit="contain" />
          <Text c="red" ta="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            XML
          </Text>
        </Card>

        {/* CSV */}
        <Link to="/csv">
          <Card
            shadow="sm"
            radius="md"
            withBorder
            style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          >
            <Image src="/csv.png" alt="CSV" height={60} fit="contain" />
            <Text c="green" ta="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
              CSV
            </Text>
          </Card>
        </Link>

        {/* YML */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('yml')}
        >
          <Image src="/yml.png" alt="YML" height={60} fit="contain" />
          <Text c="purple" ta="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            YML
          </Text>
        </Card>
      </Group>
    </Container>
  );
}

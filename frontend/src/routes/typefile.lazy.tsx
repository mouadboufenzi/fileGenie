import * as React from 'react';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
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
      <Text weight={500} size="lg" mb="md">
        Quel type de fichier voulez-vous générer ?
      </Text>
      <Group position="center" spacing="xl" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* JSON */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('json')}
        >
          <Image src="/public/Json.png" alt="JSON" height={60} fit="contain" />
          <Text color="orange" align="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
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
          <Image src="/public/XML.png" alt="XML" height={60} fit="contain" />
          <Text color="red" align="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            XML
          </Text>
        </Card>

        {/* CSV */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('csv')}
        >
          <Image src="/public/csv.png" alt="CSV" height={60} fit="contain" />
          <Text color="green" align="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            CSV
          </Text>
        </Card>

        {/* YML */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          style={{ width: '140px', margin: '1rem', textAlign: 'center', cursor: 'pointer' }}
          onClick={() => handleClick('yml')}
        >
          <Image src="/public/YML.png" alt="YML" height={60} fit="contain" />
          <Text color="purple" align="center" style={{ fontWeight: 600, marginTop: '0.5rem' }}>
            YML
          </Text>
        </Card>
      </Group>
    </Container>
  );
}

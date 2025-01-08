import { Title, Text, Image, Group, Stack, Button, ActionIcon, Table, TextInput, Card } from '@mantine/core';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useEffect, useState, useTransition } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

import { useAuth } from '../auth-provider';
import { fetchAPI } from '../utils/fetch';
import { UserInfo } from '../types/userInfo';
import { LuClock3 } from 'react-icons/lu';
import { useForm } from '@mantine/form';
import { showNotification } from '../utils/show-notification';
import { GenericMessage } from '../types/genericMessage';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPending, startTransition] = useTransition();
  const { logout, isAuthenticated } = useAuth();
  const [user, setUser] = useState<UserInfo | null>(null);

  const [isEditing, setEditing] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      name: (value) => (value.length >= 3 ? null : 'Le nom doit contenir au moins 3 caractères'),
    },
  });

  const getUserData = () => {
    void fetchAPI<UserInfo>('/api/user/info', 'GET')
      .then((data) => {
        if ('userId' in data) {
          data.files = []; // TODO remove this once implemented

          setUser(data);
          form.setValues({
            email: data.email,
            name: data.name,
          });
        }
      });
  };

  useEffect(() => {
    getUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = () => {
    startTransition(() => {
      void fetchAPI<GenericMessage>('/api/user/info', 'PUT', form.getValues())
        .then((data) => {
          if (!('error' in data)) {
            showNotification(data.message);
            getUserData();
            setEditing(false);
          }
        });
    });
  };

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return (
    <Stack maw="1080" w="100%" ml="auto" mr="auto" gap="40">
      <Title ff="Archivo">Profil</Title>
     
      {isEditing && (
        <form onSubmit={form.onSubmit(() => handleSubmit())}>
          <Stack w="100%" align="center" ml="auto" mr="auto" maw="400px" >
            <CiEdit size="60" />
            <Title order={3} c="violet" ff="Archivo">Éditez vos informations</Title>
            <Stack w="100%">
              <TextInput 
                label="Nom"
                withAsterisk
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput 
                label="Email"
                withAsterisk
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <Button color="violet" type="submit" mt="md" loading={isPending}>
                Enregistrer
              </Button>
              <Button color="violet" variant="light" onClick={() => setEditing(false)}>Annuler</Button>
            </Stack>
          </Stack>
        </form>
      )}

      {!isEditing && (
        <Stack gap="40" align="center">
          <Card withBorder radius="md" w="100%" shadow="sm">
            <Group wrap="nowrap" justify="space-between" align="start">
              <Group wrap="nowrap" align="center">
                <Image src="/user_icon.png" h={90} />

                <Stack gap="0" h="100%">
                  <Group gap={0}>
                    <Text ff="Archivo" size="xl" fw="600" c="#555">{user?.name}</Text>
                    <ActionIcon size="input-sm" bg="transparent" c="black" onClick={() => setEditing(true)}>
                      <CiEdit size="20" />
                    </ActionIcon>
                  </Group>
                  <Text ff="Inter" size="md" c="#555">{user?.email}</Text>
                  
                </Stack>
              </Group>

              <Button
                color="red"
                variant="outline"
                rightSection={<MdLogout />}
                justify="space-between"
                onClick={logout}
              >
                Déconnexion
              </Button>
            </Group>
          </Card>
        
          <Stack w="100%">
            <Group justify="space-between" w="100%">
              <Group gap="5">
                <LuClock3 color="rgb(121, 80, 242)" size="20" />
                <Title order={3} c="violet" ff="Archivo">Historique de générations</Title>
              </Group>
              <Button color="violet" w="200" onClick={() => window.location.href = '/typefile'}>Nouvelle configuration</Button>
            </Group>

            {user?.files.length === 0 && (
              <Text c="gray">Aucun fichier n'a encore été généré</Text>
            )}

            {user?.files && user.files.length > 0 && (
              <Table verticalSpacing="sm" striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Créateur</Table.Th>
                    <Table.Th>Nom du fichier</Table.Th>
                    <Table.Th>Type de configuration</Table.Th>
                    <Table.Th>Version</Table.Th>
                    <Table.Th>Date de création</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  TODO
                </Table.Tbody>
              </Table>
            )}

          </Stack>
        </Stack>
      )}

    </Stack>
  );
}

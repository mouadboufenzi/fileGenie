import { Title, Text, Image, Group, Stack, Button, ActionIcon, Table, TextInput } from '@mantine/core';
import { createLazyFileRoute, Navigate } from '@tanstack/react-router';
import { useAuth } from '../components/auth-provider';

import { useEffect, useState, useTransition } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { MdLogout } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

import { fetchAPI } from '../utils/fetch';
import { UserInfo } from '../types/userInfo';
import { LuClock3 } from 'react-icons/lu';
import { useForm } from '@mantine/form';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPending, startTransition] = useTransition();
  const { logout, isAuthenticated } = useAuth();
  const [user, setUser] = useState<UserInfo | null>(null);


  useEffect(() => {
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
  // => infinite loop if "form" is added to the dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return (
    <Stack maw="1080" w="100%" ml="auto" mr="auto" gap="80">
      <Group ml="calc(-50px - var(--mantine-spacing-md))">
        <ActionIcon size="50" bg="transparent" c="black">
          <IoMdArrowBack size="45" />
        </ActionIcon>
        <Title ff="Archivo">Profil Utilisateur</Title>
      </Group>
          <Group justify="space-between">
            <Group wrap="nowrap" align="start">
              <Image src="/user_icon.png" h={90} />

              <Stack gap={0} h="100%">
                <Group gap={0}>
                  <Text ff="Archivo" size="xl" fw="600" c="#555">{user?.name}</Text>
                  <ActionIcon size="input-sm" bg="transparent" c="black" onClick={() => setEditing(true)}>
                    <CiEdit size="20" />
                  </ActionIcon>
                </Group>
                <Text ff="Inter" size="md" c="#555">{user?.email}</Text>
              </Stack>

            </Group>

            <Button color="red" rightSection={<MdLogout />} onClick={logout}>Déconnexion</Button>
          </Group>

          <Stack>
            <Group gap="5">
              <LuClock3 color="rgb(121, 80, 242)" size="20" />
              <Title order={3} c="violet" ff="Archivo">Historique de générations</Title>
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
  );
}
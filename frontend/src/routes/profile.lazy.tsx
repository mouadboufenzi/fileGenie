import { Title, Text, Image, Group, Stack, Button, ActionIcon, Table, TextInput, Card } from '@mantine/core';
import { createLazyFileRoute, Navigate, useNavigate } from '@tanstack/react-router';

import { useEffect, useState, useTransition } from 'react';
import { MdChevronRight, MdLogout } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

import { useAuth } from '../auth-provider';
import { fetchAPI } from '../utils/fetch';
import { UserInfo } from '../types/userInfo';
import { LuClock3 } from 'react-icons/lu';
import { useForm } from '@mantine/form';
import { showNotification } from '../utils/show-notification';
import { GenericMessage } from '../types/genericMessage';
import { ConfigurationFile } from '../types/config';
import { IoMdClose } from 'react-icons/io';
import { Config } from './file';

export const Route = createLazyFileRoute('/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isPending, startTransition] = useTransition();
  const { logout, isAuthenticated } = useAuth();
  const [user, setUser] = useState<UserInfo | null>(null);

  const [isEditing, setEditing] = useState(false);
  const navigate = useNavigate();

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
          void fetchAPI<ConfigurationFile[]>(`/api/config/${data.userId.toString()}/configs`, 'GET')
            .then((files) => {
              if ('error' in files) console.error(files.error);
              else {
                data.files = files;
                
                setUser(data);
                form.setValues({
                  email: data.email,
                  name: data.name,
                });

                console.log(data);
              }
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

  const handleFileClick = (file: ConfigurationFile) => {
    void navigate({ to: '/file', search: { type: file.configType, fileId: file.configId } });
  };

  const handleNewConfigClick = () => {
    void navigate({ to: '/select' });
  };

  const handleFileDelete = (configId: number) => {
    void fetchAPI<GenericMessage>(`/api/config/${configId.toString()}`, 'DELETE')
      .then((data) => {
        if (!('error' in data)) {
          showNotification(data.message);
          getUserData();
        }
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
              <Button color="violet" w="200" onClick={() => handleNewConfigClick()}>Nouvelle configuration</Button>
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
                    <Table.Th>Nombre de versions</Table.Th>
                    <Table.Th>Type de configuration</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {user.files.map((file) => (
                    <Table.Tr key={file.configId} p="0">
                      <Table.Td p="5">{user.name}</Table.Td>
                      <Table.Td p="5">{file.configName}</Table.Td>
                      <Table.Td p="5">{Object.keys(JSON.parse(file.configFile) as Config).length}</Table.Td>
                      <Table.Td p="5">
                        <Group gap="5">
                          <Image src={`/${file.configType.toLowerCase()}.png`} alt="CSV" height={35} fit="contain" />
                          {file.configType}
                        </Group>
                      </Table.Td>
                      <Table.Td p="5" w="calc(130px + 36px + 5px)" >
                        <Group gap="5" wrap="nowrap">
                          <Button
                            w="130"
                            color="violet" 
                            variant="light" 
                            onClick={() => handleFileClick(file)}
                            rightSection={<MdChevronRight />}
                            justify="space-between"
                          >
                            Voir
                          </Button>
                          <ActionIcon 
                            w="36" 
                            h="36" 
                            color="red" 
                            variant="light" 
                            onClick={() => handleFileDelete(file.configId)}
                          >
                            <IoMdClose />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            )}

          </Stack>
        </Stack>
      )}

    </Stack>
  );
}

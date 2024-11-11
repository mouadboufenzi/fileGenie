import { Stack, Image, Title, TextInput, Group, Checkbox, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createLazyFileRoute, Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useTransition } from 'react';

import { fetchAPI } from '../utils/fetch';
import { useAuth } from '../components/auth-provider';
import { showNotification } from '../utils/show-notification';

export const Route = createLazyFileRoute('/login')({
  component: Index,
});

function Index() {
  const [isPending, startTransition] = useTransition();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', remember: false },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length >= 8 ? null : 'Le mot de passe doit contenir au moins 8 caractères'),
    }
  });

  const handleSubmit = () => {
    startTransition(() => {
      void fetchAPI<{ token: string }>('/api/auth/login', 'POST', form.getValues())
        .then((data) => {
          if ('token' in data) {
            login(data.token);
            showNotification('Vous êtes connecté');
            void navigate({ to: '/profile' });
          }
        });
    });
  };

  if (isAuthenticated) return <Navigate to="/profile" />;
  
  return (
    <form onSubmit={form.onSubmit(() => handleSubmit())}>
      <Stack
        maw="500" ml="auto" mr="auto"
        h="100vh"
        justify="center"
        align="center"
      >
        <Image src="/icon.png" w="120" />
        <Title ff="Archivo">Connexion</Title>

        <Stack w="100%">
          <TextInput
            label="Email"
            placeholder="example@email.com"
            type="email"
            withAsterisk
            key={form.key('email')}
            {...form.getInputProps('email')}
          />

          <TextInput
            label="Mot de passe"
            type="password"
            placeholder="Entrez au moins 8 caractères"
            withAsterisk
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stack>

        <Group wrap="nowrap" w="100%" justify="space-between" mb="30">
          <Checkbox
            color="violet"
            label="Se souvenir de moi"
            disabled // TODO: implement remember me
            key={form.key('remember')}
            {...form.getInputProps('remember')}
          />
          <Link style={{ fontSize: '0.875rem' }} to="/reset-password">Mot de passe oublié ?</Link>
        </Group>

        <Stack w="100%" gap="xs">
          <Button
            color="violet"
            fullWidth
            type="submit"
            loading={isPending}
          >
            Se connecter
          </Button>

          <Link to="/register">
            <Button color="violet" fullWidth variant="light">Créer un compte</Button>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
}

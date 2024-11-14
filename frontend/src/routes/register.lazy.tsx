import { Stack, Image, Title, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createLazyFileRoute, Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useTransition } from 'react';
import { fetchAPI } from '../utils/fetch';
import { showNotification } from '../utils/show-notification';
import { GenericMessage } from '../types/genericMessage';
import { useAuth } from '../auth-provider';

export const Route = createLazyFileRoute('/register')({
  component: Register,
});

function Register() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (value) => (value.length > 3 ? null : 'Votre nom est requis'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length >= 8 ? null : 'Le mot de passe doit contenir au moins 8 caractères'),
    },
  });

  const handleSubmit = () => {
    startTransition(() => {
      void fetchAPI<GenericMessage>('/api/auth/register', 'POST', form.getValues())
        .then((data) => {
          if ('error' in data) {
            showNotification(data.message, false);
          }
          else if ('message' in data) {
            showNotification(data.message);
            void navigate({ to: '/login' });
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
        <Title ff="Archivo">Inscription</Title>

        <Stack w="100%" >
          <TextInput
            label="Nom"
            placeholder="John Doe"
            type="text"
            withAsterisk
            key={form.key('name')}
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Email"
            placeholder="exemple@email.fr"
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

        <Stack w="100%" gap="xs" mt="30">
          <Button
            color="violet"
            fullWidth
            type="submit"
            loading={isPending}
          >
            S'inscrire
          </Button>

          <Link to="/login">
            <Button color="violet" fullWidth variant="light">Vous avez déjà un compte?</Button>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
}
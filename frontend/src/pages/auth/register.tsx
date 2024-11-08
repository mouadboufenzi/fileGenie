import { Button, Image, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';

import { showNotification } from '../../utils/show-notification';
import type { HttpException } from '../../types/httpException';
import { GenericMessage } from '../../types/genericMessage';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '', email: '', password: '' },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Votre nom est requis'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length >= 8 ? null : 'Le mot de passe doit contenir au moins 8 caractères'),
    },
  });

  const handleSubmit = () => {
    // @ts-expect-error - async function is not awaited (no issue)
    startTransition(async () => {
      // TODO: move url to .env
      return fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.getValues())
      })
        .then((response) => response.json())
        .then((data: GenericMessage | HttpException) => {
          if ('error' in data) {
            showNotification(data.message, false);
          }

          if ('message' in data && !('error' in data)) {
            navigate('/login');
            showNotification('Inscription réussi, connectez-vous!');
          }
        });
    });
  };

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
          <Button color="violet" fullWidth variant="light" onClick={() => navigate('/login')}>Vous avez déjà un compte?</Button>
        </Stack>
      </Stack>
    </form>
  );
}
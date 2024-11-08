import { Button, Checkbox, Group, Image, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { HttpException } from '../../types/httpException';
import { showNotification } from '../../utils/show-notification';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [token, setToken] = useLocalStorage({
    key: 'token',
    defaultValue: '',
  });

  useEffect(() => {
    if (!token) return;

    showNotification('Vous êtes connecté', true);
    startTransition(() => {
      setTimeout(() => {
        navigate('/');
      }, 200);
    });
  }, [token, navigate]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', remember: false },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      password: (value) => (value.length >= 2 ? null : 'Le mot de passe doit contenir au moins 8 caractères'),
    }
  });

  const handleSubmit = () => {
    // @ts-expect-error - async function is not awaited (no issue)
    startTransition(async () => {

      // TODO: move url to .env
      return fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.getValues())
      })
        .then((response) => response.json())
        .then((data: { token: string } | HttpException) => {
          if ('token' in data) {
            setToken(data.token);
          }

          if ('error' in data) {
            console.error(data.message);
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
          <Button color="violet" fullWidth variant="light" onClick={() => navigate('/register')}>Créer un compte</Button>
        </Stack>
      </Stack>
    </form>
  );
}
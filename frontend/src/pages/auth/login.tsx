import { Button, Checkbox, Group, Image, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <Stack
      maw="500" ml="auto" mr="auto"
      h="100vh"
      justify="center"
      align="center"
    >
      <Image src="/icon.png" w="120" />
      <Title>Connexion</Title>

      <Stack w="100%" >
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Email"
          placeholder="example@email.com"
          type="email"
        />

        <TextInput
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          label="Password"
          type="password"
          placeholder="Entrez au moins 8 caractères"
        />
      </Stack>

      <Group wrap="nowrap" w="100%" justify="space-between" mb="30">
        <Checkbox
          color="violet"
          label="Se souvenir de moi"
          checked={remember}
          onChange={(e) => setRemember(e.currentTarget.checked)}
        />
        <Link style={{ fontSize: '0.875rem' }} to="/reset-password">Mot de passe oublié ?</Link>
      </Group>

      <Stack w="100%" gap="xs">
        <Button color="violet" fullWidth>Se connecter</Button>
        <Button color="violet" fullWidth variant="light">Créer un compte</Button>
      </Stack>
    </Stack>
  );
}
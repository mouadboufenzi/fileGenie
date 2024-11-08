/* istanbul ignore file */

import { Button, Image, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  return (
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
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          label="Nom"
          placeholder="John Doe"
          type="text"
        />
        
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Email"
          placeholder="exemple@email.fr"
          type="email"
        />

        <TextInput
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          label="Mot de passe"
          type="password"
          placeholder="Entrez au moins 8 caractères"
        />
      </Stack>

      <Stack w="100%" gap="xs" mt="30">
        <Button color="violet" fullWidth>S'inscrire</Button>
        <Button color="violet" fullWidth variant="light" onClick={() => navigate('/login')}>Vous avez déjà un compte?</Button>
      </Stack>
    </Stack>
  );
}
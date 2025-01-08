import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';
import { useForm } from '@mantine/form';
import { Stack, TextInput, Text, Button } from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { Field, FieldType } from '../types/field';
import { fetchAPI } from '../utils/fetch';
import { FieldContainer, FieldWithValues } from '../components/fieldContainer';

interface SearchParams {
  type: string
}

export const Route = createFileRoute('/createfile')({
  component: CreateFile,
  validateSearch: (search: Record<string, string>): SearchParams => {
    if (!search.type) throw new Error('Missing type');

    return {
      type: search.type,
    };
  },
});

function CreateFile() {
  /* eslint-disable-next-line */
  const { type } = Route.useSearch() as SearchParams;
  const { isAuthenticated } = useAuth();
  const [isLoading, startTransition] = useTransition();
  const navigate = useNavigate();

  const [config, setConfig] = useState<FieldWithValues[]>([]);
  const [allFields, setAllFields] = useState<Field[]>([]);

  useEffect(() => {
    void fetchAPI<Field[]>('/api/field/all', 'GET').then((data) => {
      if ('error' in data) console.error(data.error);
      else setAllFields(data.filter((f) => type === 'csv' ? f.type === FieldType.PRIMITIVE : true));
    });
  }, [type]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      configurationName: '',
      configType: '',
    },
  });

  const handleSubmit = () => {
    startTransition(() => {
      form.setFieldValue('configType', type.toUpperCase());

      void fetchAPI('/api/config/save', 'POST', {
        configurationName: form.getValues().configurationName,
        configurationType: form.getValues().configType,
        configuration: JSON.stringify(config),
      })
        .then((data) => {
          if ('error' in data) console.error(data);
          else void navigate({ to: '/profile' });
        });
    });

  };

  if (!isAuthenticated) return <Navigate to="/profile" />;

  return (
    <form onSubmit={form.onSubmit(() => handleSubmit())}>
      <Stack
        maw="800"
        ml="auto"
        mr="auto"
        mih="calc(100vh - 50px - (2 * var(--mantine-spacing-md)))"
        justify="start"
        align="center"
      >
        <Text fw={500} size="lg" mb="md">
          Fichier de configuration {type.toUpperCase()}
        </Text>
        <TextInput
          required
          label="Nom de la configuration"
          type="text"
          w="100%"
          {...form.getInputProps('configurationName')}
        />

        {/* {JSON.stringify(fields, null, 2)} */}

        <FieldContainer
          selectableFields={allFields}
          onConfigChange={(config) => setConfig(config)}
        />

        <Button loading={isLoading} fullWidth color="violet" variant="light" type="submit">
          Sauvegarder
        </Button>
      </Stack>
    </form>
  );
}

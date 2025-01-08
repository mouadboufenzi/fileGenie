import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth-provider';
import { useForm } from '@mantine/form';
import { Stack, TextInput, Text, Button, Select } from '@mantine/core';
import { useEffect, useState, useTransition } from 'react';
import { Field, FieldType } from '../types/field';
import { fetchAPI } from '../utils/fetch';
import { FieldContainer, FieldWithValues } from '../components/fieldContainer';
import { ConfigurationFile } from '../types/config';
import { getLatestVersion } from '../utils/semver';

interface SearchParams {
  type: string;
  fileId?: string;
}

export type Config = Record<string, FieldWithValues[]>;

export const Route = createFileRoute('/file')({
  component: CreateFile,
  validateSearch: (search: Record<string, string>): SearchParams => {
    if (!search.type) throw new Error('Missing type');

    return {
      type: search.type,
      fileId: search.fileId,
    };
  },
});

function CreateFile() {
  /* eslint-disable-next-line */
  const { type, fileId } = Route.useSearch() as SearchParams
  const { isAuthenticated } = useAuth();
  const [isLoading, startTransition] = useTransition();
  const navigate = useNavigate();

  const [config, setConfig] = useState<Config>({ '1.0': [] });
  const [allFields, setAllFields] = useState<Field[]>([]);

  const [currentVersion, setCurrentVersion] = useState('1.0');
  const [currentConfig, setCurrentConfig] = useState<FieldWithValues[]>([]);

  useEffect(() => {
    setCurrentConfig(config[currentVersion] ?? []);
  // eslint-disable-next-line
  }, [currentVersion]);

  useEffect(() => {
    if (!fileId) return;

    void fetchAPI<ConfigurationFile>(`/api/config/data/${fileId}`, 'GET')
      .then((data) => {
        if ('error' in data) console.error(data.error);
        else {
          const tmpConfig = JSON.parse(data.configFile) as Config;
          const latestVersion = getLatestVersion(Object.keys(tmpConfig));
          const nextVersion = latestVersion.split('.').map(Number).map((v, i) => (i === 1 ? v + 1 : v)).join('.');

          setCurrentVersion(nextVersion);
          setConfig({ 
            ...tmpConfig, 
            [nextVersion]: tmpConfig[latestVersion] // copy latest version to next version instead of starting from scratch
          });
          form.setFieldValue('configurationName', data.configName);
        }
      });

  // eslint-disable-next-line
  }, [fileId]);

  useEffect(() => {
    void fetchAPI<Field[]>('/api/field/all', 'GET').then((data) => {
      if ('error' in data) console.error(data.error);
      else
        setAllFields(
          data.filter((f) =>
            type === 'csv' ? f.type === FieldType.PRIMITIVE : true,
          ),
        );
    });
  }, [type]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      configId: fileId,
      configurationName: '',
      configType: '',
    },
  });

  const handleSubmit = () => {
    startTransition(() => {
      form.setFieldValue('configType', type.toUpperCase());
      form.setFieldValue('configVersion', currentVersion);

      if (Object.keys(config).length > 1) {
        for (const [version, fields] of Object.entries(config)) {
          // Remove empty versions
          // eslint-disable-next-line
          if (fields.length === 0) delete config[version];
        }
      }

      void fetchAPI('/api/config/save', 'POST', {
        configurationId: form.getValues().configId,
        configurationName: form.getValues().configurationName,
        configurationType: form.getValues().configType,
        configuration: JSON.stringify(config),
      }).then((data) => {
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
          {fileId ? 'Édition' : 'Création'} du fichier de configuration {type.toUpperCase()}
        </Text>

        <TextInput
          required
          label="Nom de la configuration"
          type="text"
          w="100%"
          {...form.getInputProps('configurationName')}
        />

        {fileId && (
          <Select
            required
            label="Version de la configuration"
            w="100%"
            data={Object.keys(config).map((v) => ({ label: v, value: v }))}
            value={currentVersion}
            clearable={false}
            onChange={(value) => value && setCurrentVersion(value)}
          />
        )}

        {/* {currentVersion}
        <br/>
        {JSON.stringify(config, null, 2)} */}

        <FieldContainer
          selectableFields={allFields}
          config={currentConfig}
          onConfigChange={(newConfig) => {
            setConfig({ ...config, [currentVersion]: newConfig });
            setCurrentConfig(newConfig);
          }}
        />

        <Button
          loading={isLoading}
          fullWidth
          color="violet"
          variant="light"
          type="submit"
        >
          Sauvegarder
        </Button>
      </Stack>
    </form>
  );
}

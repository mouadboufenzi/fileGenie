import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useAuth } from '../auth-provider'
import { useForm } from '@mantine/form'
import { Stack, TextInput, Text, Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Field } from '../types/field'
import { fetchAPI } from '../utils/fetch'
import { FieldContainer, FieldWithValues } from '../components/fieldContainer'

interface SearchParams {
  type: string
}

export const Route = createFileRoute('/createfile')({
  component: CreateFile,
  validateSearch: (search): SearchParams => {
    if (!search.type) throw new Error('Missing type')

    return {
      type: search.type,
    } as SearchParams
  },
})

function CreateFile() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/profile" />

  const [allFields, setAllFields] = useState<Field[]>([]);
  const { type } = Route.useSearch() as SearchParams;

  useEffect(() => {
    void fetchAPI<Field[]>('/api/field/all', 'GET').then((data) => {
      if ('error' in data) console.error(data.error)
      else setAllFields(data)
    })
  }, [])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      configurationName: '',
      configType: '',
    },
  })

  const handleSubmit = () => {
    form.setFieldValue('configType', type);
    
    // TODO: integrate with the backend
    console.log(form.getValues(), config);
  }

  // TODO: integrate with the backend
  const [config, setConfig] = useState<FieldWithValues[]>([])

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
        <Text fw="400" size="md">
          Générer un fichier de configuration {type.toUpperCase()}
        </Text>
        <TextInput
          required
          label="Nom de la configuration"
          type="text"
          w="100%"
          {...form.getInputProps('configurationName')}
        />

        {/* {JSON.stringify(fields, null, 2)} */}

        <Text fw="500" ta="left" w="100%" lh="1.55" size="sm" mb="-12">
          Champs de la configuration
        </Text>
        <FieldContainer
          selectableFields={allFields}
          onConfigChange={(config) => setConfig(config)}
        />

        <Button fullWidth color="violet" variant="light" type="submit">
          Sauvegarder
        </Button>
      </Stack>
    </form>
  )
}

import {
  Title,
  Group,
  Stack,
  ActionIcon,
  Select,
  TextInput,
  Card,
} from '@mantine/core'
import { useState } from 'react'
import { IoMdAdd, IoMdRemove } from 'react-icons/io'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/csv')({
  component: CvsPage,
})

interface SubField {
  key: string
  value: string
}

function CvsPage() {
  const [subFields, setSubFields] = useState<SubField[]>([
    { key: '', value: '' }, // Initial subfield
  ])

  const addSubField = () => {
    setSubFields([...subFields, { key: '', value: '' }])
  }

  const removeSubField = (subFieldIndex: number) => {
    // Interdire de supprimer la dernière ligne
    if (subFields.length === 1) {
      return
    }

    // Créer une nouvelle liste en excluant l'index donné
    setSubFields((prevSubFields) =>
      prevSubFields.filter((_, index) => index !== subFieldIndex),
    )
  }

  const updateSubField = (
    subFieldIndex: number,
    key: 'key' | 'value',
    value: string,
  ) => {
    setSubFields((prevSubFields) =>
      prevSubFields.map((subField, index) =>
        index === subFieldIndex ? { ...subField, [key]: value } : subField,
      ),
    )
  }

  const handleGenerate = () => {
    console.log('Generate button clicked', subFields) // Afficher les données générées
  }

  return (
    <Stack maw="900px" w="100%" ml="auto" mr="auto" style={{ gap: '20px' }}>
      {/* Header */}
      <Group align="center" style={{ marginBottom: '20px' }}>
        <Title order={2} style={{ fontSize: '1.5rem', margin: '0 auto' }}>
          Ajouter des champs à votre fichier de configuration
        </Title>
      </Group>

      {/* Single Field with Multiple Subfields */}
      <Card>
        <Stack style={{ gap: '15px' }}>
          {subFields.map((subField, subFieldIndex) => (
            <Group key={subFieldIndex} align="center" style={{ gap: '10px' }}>
              {/* Select for Type */}
              <Select
                placeholder="Type de champ"
                data={['App', 'Database', 'Server', 'API']}
                value={subField.key}
                onChange={(value) => {
                  if (value) updateSubField(subFieldIndex, 'key', value)
                }}
                style={{ width: '150px' }}
              />

              {/* Text Input for Value */}
              <TextInput
                placeholder="Valeur"
                value={subField.value}
                onChange={(event) =>
                  updateSubField(subFieldIndex, 'value', event.target.value)
                }
                style={{ width: '250px' }}
              />

              {/* Add Button: Show only for the last row */}
              {subFieldIndex === subFields.length - 1 && (
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="filled"
                  color="green"
                  onClick={addSubField}
                >
                  <IoMdAdd />
                </ActionIcon>
              )}

              {/* Remove Button: Always available for each row */}
              {subFields.length > 1 && (
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="filled"
                  color="red"
                  onClick={() => removeSubField(subFieldIndex)}
                >
                  <IoMdRemove />
                </ActionIcon>
              )}
            </Group>
          ))}
        </Stack>
      </Card>

      {/* Générer Button */}
      <Group style={{ justifyContent: 'center', marginTop: '20px' }}>
        <button
          style={{
            backgroundColor: 'gray',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={handleGenerate}
        >
          Générer
        </button>
      </Group>
    </Stack>
  )
}

export default CvsPage

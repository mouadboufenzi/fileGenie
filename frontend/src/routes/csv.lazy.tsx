import {
  Title,
  Group,
  Stack,
  ActionIcon,
  Select,
  TextInput,
  Card,
  Button,
} from '@mantine/core'; // Added Button here
import { useEffect, useState } from 'react';
import { IoMdAdd, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/csv')({
  component: CvsPage,
});

interface SubField {
  key: string;
  value: string;
}

interface Field {
  key: string;
  subFields: SubField[];
  isExpanded: boolean;
}

function CvsPage() {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    addField(); // Automatically add the first field on load
  });

  const addField = () => {
    setFields([
      ...fields,
      { key: '', subFields: [], isExpanded: false }, // Start with field collapsed
    ]);
  };

  const toggleField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields[index].isExpanded = !updatedFields[index].isExpanded;
    setFields(updatedFields);
  };

  const updateField = (index: number, key: 'key', value: string) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const addSubField = (fieldIndex: number) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].subFields.push({ key: '', value: '' });
    setFields(updatedFields);
  };

  const updateSubField = (
    fieldIndex: number,
    subFieldIndex: number,
    key: 'key' | 'value',
    value: string
  ) => {
    const updatedFields = [...fields];
    updatedFields[fieldIndex].subFields[subFieldIndex][key] = value;
    setFields(updatedFields);
  };

  const handleGenerate = () => {
    // Add logic here for the "Générer" button click
    console.log('Generate button clicked', fields);
  };

  return (
    <Stack maw="900px" w="100%" ml="auto" mr="auto" style={{ gap: '20px' }}>
      {/* Header */}
      <Group align="center" style={{ marginBottom: '20px' }}>
        <Title order={2} style={{ fontSize: '1.5rem', margin: '0 auto' }}>
          Ajouter des champs à votre fichier de configuration
        </Title>
      </Group>

      {/* List of Fields */}
      {fields.map((field, fieldIndex) => (
        <Card key={fieldIndex} shadow="sm" radius="md" withBorder p="lg">
          <Stack style={{ gap: '15px' }}>
            {/* Main field */}
            <Group align="center" style={{ gap: '10px' }}>
              <Select
                placeholder="Type de champ"
                data={['App', 'Database']}
                value={field.key}
                onChange={(value) => {
                  if (value) updateField(fieldIndex, 'key', value);
                }}
                style={{ width: '150px' }}
              />
              {/* Green add field button (only once for the first field) */}
              {fieldIndex === 0 && (
                <ActionIcon
                  size="xl"
                  radius="xl"
                  variant="filled"
                  color="green"
                  onClick={addField}
                  style={{
                    width: '30px',
                    height: '30px',
                    fontSize: '1.5rem',
                  }}
                >
                  <IoMdAdd />
                </ActionIcon>
              )}
            </Group>
            {/* Arrow toggle button */}
            <ActionIcon
              size="lg"
              variant="light"
              onClick={() => toggleField(fieldIndex)}
              style={{ marginTop: '0px' }}
            >
              {field.isExpanded ? (
                <IoMdArrowDropup size="20" />
              ) : (
                <IoMdArrowDropdown size="20" />
              )}
            </ActionIcon>

            {/* Subfields */}
            {field.isExpanded && (
              <>
                {/* Always show the blue button inside the subfields section */}
                <ActionIcon
                  size="lg"
                  radius="xl"
                  variant="filled"
                  color="blue"
                  onClick={() => addSubField(fieldIndex)}
                  style={{
                    alignSelf: 'flex-start',
                    marginTop: '5px',
                  }}
                >
                  <IoMdAdd size="20" />
                </ActionIcon>

                {/* Render subfields */}
                {field.subFields.map((subField, subFieldIndex) => (
                  <Group
                    key={subFieldIndex}
                    align="center"
                    style={{ gap: '10px', paddingLeft: '20px' }}
                  >
                    <Select
                      placeholder="Type de sous-champ"
                      data={['name', 'port', 'host']}
                      value={subField.key}
                      onChange={(value) => {
                        if (value)
                          updateSubField(fieldIndex, subFieldIndex, 'key', value);
                      }}
                      style={{ width: '150px' }}
                    />
                    {subField.key === 'port' ? (
                      <Select
                        placeholder="Sélectionner un port"
                        data={['3000', '3306', '8080']}
                        value={subField.value}
                        onChange={(value) =>
                          updateSubField(fieldIndex, subFieldIndex, 'value', value ?? '')
                        }
                        style={{ width: '150px' }}
                      />
                    ) : (
                      <TextInput
                        placeholder="Valeur"
                        value={subField.value}
                        onChange={(event) =>
                          updateSubField(
                            fieldIndex,
                            subFieldIndex,
                            'value',
                            event.target.value
                          )
                        }
                        style={{ width: '250px' }}
                      />
                    )}
                  </Group>
                ))}
              </>
            )}
          </Stack>
        </Card>
      ))}

      {/* Générer Button */}
      <Button
        variant="filled"
        color="blue"
        size="lg"
        style={{ marginTop: '20px', alignSelf: 'center' }}
        onClick={handleGenerate}
      >
        Générer
      </Button>
    </Stack>
  );
}

export default CvsPage;

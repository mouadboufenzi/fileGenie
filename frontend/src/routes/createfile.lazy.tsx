import * as React from 'react';
import { createLazyFileRoute, useSearch } from '@tanstack/react-router';
import { Container, Text, Select, Button, Group, Stack } from '@mantine/core';

export const Route = createLazyFileRoute('/createfile')({
  component: RouteComponent,
});

function RouteComponent() {
  const { type } = useSearch<{ type: string }>({ from: '/createfile' });

  const allOptions = [
    { value: 'App', label: 'Application' },
    { value: 'Database', label: 'Base de données' },
    { value: 'API', label: 'API' },
    { value: 'Auth', label: 'Authentification' },
    { value: 'Logging', label: 'Journalisation' },
  ];

  const subFieldOptions: Record<string, { value: string; label: string }[]> = {
    App: [
      { value: 'name', label: 'Nom' },
      { value: 'version', label: 'Version' },
      { value: 'port', label: 'Port' },
      { value: 'environment', label: 'Environnement' },
      { value: 'description', label: 'Description' },
    ],
    Database: [
      { value: 'host', label: 'Hôte' },
      { value: 'port', label: 'Port' },
      { value: 'username', label: 'NomUtilisateur' },
      { value: 'password', label: 'Mot de passe' },
    ],
  };

  const subFieldValueOptions: Record<string, string[]> = {
    name: ['App Test', 'App Prod', 'App Dev'],
    port: ['4200', '3000', '8081', '5432', '8080'],
    host: ['localhost', '127.0.0.1', '192.168.1.1'],
  };

  const [fields, setFields] = React.useState<number[]>([0]);
  const [selectedValues, setSelectedValues] = React.useState<Record<number, string>>({});
  const [showSubFieldButton, setShowSubFieldButton] = React.useState<Record<number, boolean>>({});
  const [subFields, setSubFields] = React.useState<Record<number, number[]>>({});
  const [subFieldSelections, setSubFieldSelections] = React.useState<Record<number, Record<number, string>>>({});
  const [subFieldValues, setSubFieldValues] = React.useState<Record<number, Record<number, string>>>({});

  const handleAddField = () => setFields((prev) => [...prev, prev.length]);

  const handleSelectChange = (fieldId: number, value: string | null) => {
    setSelectedValues((prev) => {
      const updated = { ...prev };
      if (value) updated[fieldId] = value;
      else delete updated[fieldId];
      return updated;
    });

    setShowSubFieldButton((prev) => ({
      ...prev,
      [fieldId]: !!value,
    }));

    // Réinitialise les sous-champs lorsque le champ principal change
    setSubFields((prev) => {
      const updated = { ...prev };
      updated[fieldId] = [];
      return updated;
    });

    setSubFieldSelections((prev) => {
      const updated = { ...prev };
      delete updated[fieldId];
      return updated;
    });

    setSubFieldValues((prev) => {
      const updated = { ...prev };
      delete updated[fieldId];
      return updated;
    });
  };

  const handleAddSubField = (fieldId: number) => {
    setSubFields((prev) => {
      const updated = { ...prev };
      updated[fieldId] = [...(updated[fieldId] || []), updated[fieldId]?.length || 0];
      return updated;
    });
  };

  const handleSubFieldChange = (fieldId: number, subFieldId: number, value: string | null) => {
    setSubFieldSelections((prev) => {
      const updated = { ...prev };
      if (!updated[fieldId]) updated[fieldId] = {};
      if (value) updated[fieldId][subFieldId] = value;
      else delete updated[fieldId][subFieldId];
      return updated;
    });
  };

  const handleSubFieldValueChange = (fieldId: number, subFieldId: number, value: string | null) => {
    setSubFieldValues((prev) => {
      const updated = { ...prev };
      if (!updated[fieldId]) updated[fieldId] = {};
      if (value) updated[fieldId][subFieldId] = value;
      else delete updated[fieldId][subFieldId];
      return updated;
    });
  };

  const getAvailableOptions = (fieldId: number, currentSelections: Record<number, string>) => {
    const usedValues = Object.values(currentSelections).filter((_, key) => key !== fieldId);
    return allOptions.filter((option) => !usedValues.includes(option.value));
  };

  const getAvailableSubFieldOptions = (
    fieldId: number,
    subFieldId: number,
    currentSelections: Record<number, Record<number, string>>
  ) => {
    const usedValues = Object.values(currentSelections[fieldId] || {}).filter((_, key) => key !== subFieldId);
    return subFieldOptions[selectedValues[fieldId]].filter((option) => !usedValues.includes(option.value));
  };

  return (
    <Container style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Text fw={700} size="xl" mb="xl">
        Ajouter des champs à votre fichier de configuration "{type?.toUpperCase() || 'JSON'}"
      </Text>

      <Stack gap="lg">
        {fields.map((fieldId) => (
          <div key={fieldId}>
            {/* Champ principal */}
            <Group align="center" gap="md">
              <Select
                placeholder="Sélectionnez un champ principal"
                data={getAvailableOptions(fieldId, selectedValues)}
                value={selectedValues[fieldId] || null}
                onChange={(value) => handleSelectChange(fieldId, value)}
                style={{ minWidth: 200 }}
              />
              {fieldId === fields.length - 1 && (
                <Button
                  onClick={handleAddField}
                  style={{
                    backgroundImage: 'url(/plus.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '30px',
                    height: '30px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundSize: 'contain',
                    border: 'none',
                  }}
                />
              )}
            </Group>

            {/* Bouton bleu pour afficher les sous-champs */}
            {showSubFieldButton[fieldId] && (
              <Group align="left" mt="sm" gap="xs">
                <Button
                  onClick={() => handleAddSubField(fieldId)}
                  style={{
                    backgroundImage: 'url(/plusblue.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '20px',
                    height: '20px',
                    padding: '0',
                    borderRadius: '50%',
                    backgroundSize: 'contain',
                    border: 'none',
                  }}
                />
                <Text size="sm" c="blue">
                  Ce champ comprend des sous-champs
                </Text>
              </Group>
            )}

            {/* Sous-champs */}
            {subFields[fieldId]?.map((subFieldId) => (
              <Group key={subFieldId} align="left" style={{ marginLeft: '3rem', marginTop: '1rem' }}>
                <Select
                  placeholder="Sélectionnez un sous-champ"
                  data={getAvailableSubFieldOptions(fieldId, subFieldId, subFieldSelections)}
                  value={subFieldSelections[fieldId]?.[subFieldId] || null}
                  onChange={(value) => handleSubFieldChange(fieldId, subFieldId, value)}
                  style={{ minWidth: 200 }}
                />
                {subFieldSelections[fieldId]?.[subFieldId] && (
                  <Select
                    placeholder="Valeurs disponibles ou saisissez une nouvelle"
                    searchable
                    data={(subFieldValueOptions[subFieldSelections[fieldId][subFieldId]] || []).map((value) => ({
                      value,
                      label: value,
                    }))}
                    value={subFieldValues[fieldId]?.[subFieldId] || null}
                    onChange={(value) => handleSubFieldValueChange(fieldId, subFieldId, value)}
                    style={{ minWidth: 200 }}
                  />
                )}
                {subFieldSelections[fieldId]?.[subFieldId] && (
                  <Button
                    onClick={() => handleAddSubField(fieldId)}
                    style={{
                      backgroundImage: 'url(/plusblue.png)',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      width: '20px',
                      height: '20px',
                      padding: '0',
                      borderRadius: '50%',
                      backgroundSize: 'contain',
                      border: 'none',
                    }}
                  />
                )}
              </Group>
            ))}
          </div>
        ))}
      </Stack>

      <Button mt="xl" size="md" color="gray">
        Générer
      </Button>
    </Container>
  );
}

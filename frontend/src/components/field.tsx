import { ActionIcon, Button, Card, Group, Select } from '@mantine/core';
import { Field, FieldType } from '../types/field';
import { useEffect, useState } from 'react';
import { fetchAPI } from '../utils/fetch';
import { FieldValueComponent } from './fieldValue';
import { IoMdClose } from 'react-icons/io';
import { FieldWithValues } from './fieldContainer';

interface FieldComponentProps {
	isSubfield?: boolean;
	field: Field;
	selectableFields: Field[];

	onFieldDelete: () => void;
	onFieldUpdate: (field: Field) => void;
	onFieldValueUpdate: (field: Field, values: number[]) => void;
	onSubFieldChange: (field: Field, config: FieldWithValues[]) => void;
}

export function FieldComponent({ selectableFields, field, isSubfield, onFieldDelete, onFieldUpdate, onFieldValueUpdate, onSubFieldChange }: FieldComponentProps) {
  const [selectedField, setSelectedField] = useState<string | null>(field.fieldId.toString());
  const [fieldValues, setFieldValues] = useState<{ id: number; value: string }[]>([]);

  useEffect(() => {
    if (selectedField === null) setFieldValues([]);
    else void fetchAPI<{ id: number; value: string }[]>(`/api/field/${selectedField}/values`, 'GET')
      .then((data) => {
        if ('error' in data) console.error(data.error);
        else setFieldValues(data);
      })
      .finally(() => {
        onFieldUpdate(selectableFields.find((f) => f.fieldId.toString() === selectedField) ?? field);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedField]);

  return (
    <Card withBorder>
      <Group w="100%" wrap={field.type === FieldType.OBJECT ? 'wrap' : 'nowrap'} align="start">
        <Select
          w="100%"
          label={isSubfield ? 'Sous-champ' : 'Champ'}
          searchable
          data={selectableFields.map((field) => ({ value: field.fieldId.toString(), label: field.name }))}
          value={selectedField}
          onChange={(value) => {
            setSelectedField(value ?? null);
          }}
        />
        <FieldValueComponent
          field={field} 
          fieldValues={fieldValues}
          onValuesChange={(values) => onFieldValueUpdate(field, values.map((v) => parseInt(v)))}
          onConfigChange={(config) => onSubFieldChange(field, config)}
        />
        {field.type !== FieldType.OBJECT && (
          <ActionIcon
            color="red"
            onClick={onFieldDelete}
            mt="25"
            h={36}
            miw={36}
          >
            <IoMdClose />
          </ActionIcon>
        )}
        {field.type === FieldType.OBJECT && (
          <Button 
            color="red"
            onClick={onFieldDelete}
            fullWidth
            rightSection={<IoMdClose />}
            justify="space-between"
          >
						Supprimer le {isSubfield ? 'sous-champ' : 'champ'}
          </Button>
        )}
      </Group>
    </Card>
  );
}

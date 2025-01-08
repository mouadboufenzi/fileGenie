import { Card, Stack, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Field, FieldType } from '../types/field';
import { FieldComponent } from './field';

interface FieldContainerProps {
	isSubfield?: boolean;
	selectableFields: Field[];
	onConfigChange: (config: FieldWithValues[]) => void;
}

export interface FieldWithValues extends Omit<Field, 'subFields'> {
	values: number[];
	subFields: FieldWithValues[];
}

export function FieldContainer({ isSubfield, selectableFields, onConfigChange }: FieldContainerProps) {
  const [fields, setFields] = useState<Field[]>([]);
  const [config, setConfig] = useState<FieldWithValues[]>([]);

  useEffect(() => {
    onConfigChange(config);
  }, [config, onConfigChange]);

  return (
    <Card w="100%" withBorder>
      <Stack>
        {fields.map((field) => (
          <FieldComponent
            isSubfield={isSubfield}
            selectableFields={selectableFields}
            key={field.fieldId}
            field={field}

            onFieldDelete={() => {
              setFields(fields.filter((f) => f.fieldId !== field.fieldId));
              setConfig(config.filter((f) => f.fieldId !== field.fieldId));
            }}
            onFieldUpdate={(newField) => {
              setFields(fields.map((f) => f.fieldId === field.fieldId ? newField : f));
              setConfig(config.map((f) => f.fieldId === field.fieldId ? { ...newField, values: [], subFields: [] } : f));
            }}
            onFieldValueUpdate={(field, values) => {
              setConfig(config.map((f) => f.fieldId === field.fieldId ? { ...f, values } : f));
            }}

            onSubFieldChange={(ff, subFields) => {
              setConfig(config.map((f) => f.fieldId === ff.fieldId ? { ...f, subFields } : f));
            }}
          />
        ))}

        <Button
          fullWidth
          variant='outline'
          onClick={() => {
            setFields([...fields, { fieldId: -1, type: FieldType.PRIMITIVE, name: '', subFields: [] }]);
            setConfig([...config, { fieldId: -1, type: FieldType.PRIMITIVE, name: '', subFields: [], values: [] }]);
          }}
          rightSection={<MdAdd />}
          justify="space-between"
          color="violet"
        >
          {isSubfield ? 'Ajouter un sous-champ' : 'Ajouter un champ'}
        </Button>
      </Stack>
    </Card>
  );
}
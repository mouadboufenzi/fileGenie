import { Card, Stack, Button, Text } from '@mantine/core';
import { MdAdd } from 'react-icons/md';
import { Field, FieldType } from '../types/field';
import { FieldComponent } from './field';

interface FieldContainerProps {
	isSubfield?: boolean;
	selectableFields: Field[];

  config: FieldWithValues[];
	onConfigChange: (config: FieldWithValues[]) => void;
}

export interface FieldWithValues extends Omit<Field, 'subFields'> {
	values: number[];
	subFields: FieldWithValues[];
}

export function FieldContainer({ isSubfield, selectableFields, onConfigChange, config }: FieldContainerProps) {
  return (
    <Stack w="100%">
      <Text fw="500" ta="left" w="100%" lh="1.55" size="sm" mb="-12">
        {isSubfield ? 'Sous-champ(s)' : 'Champ(s) de la configuration'}
      </Text>
      <Card w="100%" withBorder={isSubfield} p={isSubfield ? 'md' : 0}>
        <Stack>
          {config.map((field) => (
            <FieldComponent
              isSubfield={isSubfield}
              selectableFields={selectableFields}
              key={field.fieldId}
              field={field}

              onFieldDelete={() => {
                onConfigChange(config.filter((f) => f.fieldId !== field.fieldId));
              }}
              onFieldUpdate={(newField) => {
                onConfigChange(config.map((f) => f.fieldId === field.fieldId ? { ...newField, values: f.values, subFields: f.subFields } : f));
              }}
              onFieldValueUpdate={(field, values) => {
                onConfigChange(config.map((f) => f.fieldId === field.fieldId ? { ...f, values } : f));
              }}

              subConfig={config.find((f) => f.fieldId === field.fieldId)?.subFields ?? []}
              onSubFieldChange={(ff, subFields) => {
                onConfigChange(config.map((f) => f.fieldId === ff.fieldId ? { ...f, subFields } : f));
              }}
            />
          ))}
          <Button
            fullWidth
            variant='outline'
            onClick={() => {
              onConfigChange([
                ...config, 
                { 
                  fieldId: -1, 
                  type: FieldType.PRIMITIVE, 
                  name: '', 
                  subFields: [], 
                  values: [],
                }
              ]);
            }}
            rightSection={<MdAdd />}
            justify="space-between"
            color="violet"
          >
            {isSubfield ? 'Ajouter un sous-champ' : 'Ajouter un champ'}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
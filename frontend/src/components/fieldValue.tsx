import { MultiSelect, Select } from '@mantine/core';
import { Field, FieldType } from '../types/field';
import { FieldContainer, FieldWithValues } from './fieldContainer';

interface FieldValueComponentProps {
	field: Field;
	fieldValues: { id: number; value: string }[];
  possibleSubFields: Field[];
  config: FieldWithValues[];
	onConfigChange: (config: FieldWithValues[]) => void;

  values: number[];
	onValuesChange: (values: number[]) => void;
}

export function FieldValueComponent({ 
  field, 
  fieldValues, 

  values, 
  onValuesChange, 

  config, 
  onConfigChange, 

  possibleSubFields 
}: FieldValueComponentProps) {

  switch (field.type) {
  case FieldType.PRIMITIVE:
    return <Select
      w="100%"
      label="Valeur"
      searchable
      disabled={fieldValues.length === 0}
      data={fieldValues.map((value) => ({ value: value.id.toString(), label: value.value }))}
      value={values[0]?.toString()}
      onChange={(value) => {
        if (value) onValuesChange([parseInt(value, 10)]);
        else onValuesChange([]);
      }}
    />;

  case FieldType.LIST:
    return <MultiSelect
      w="100%"
      label="Valeur(s)"
      searchable
      disabled={fieldValues.length === 0}
      data={fieldValues.map((value) => ({ value: value.id.toString(), label: value.value }))}
      value={values.map((v) => v.toString())}
      onChange={(value) => {
        onValuesChange(value.map(Number));
      }}
    />;

  case FieldType.OBJECT:
    return <FieldContainer 
      isSubfield 
      selectableFields={possibleSubFields}
      onConfigChange={(config) => onConfigChange(config)}
      config={config}
    />;

  default: return null;
  }

}
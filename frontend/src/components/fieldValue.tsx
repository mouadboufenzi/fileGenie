import { MultiSelect, Select } from "@mantine/core";
import { Field, FieldType } from "../types/field";
import { useEffect, useState } from "react";
import { FieldContainer, FieldWithValues } from "./fieldContainer";

interface FieldValueComponentProps {
	field: Field;
	fieldValues: { id: number; value: string }[];

	onValuesChange: (values: string[]) => void;
	onConfigChange: (config: FieldWithValues[]) => void;
}

export function FieldValueComponent({ field, fieldValues, onValuesChange, onConfigChange }: FieldValueComponentProps) {
	const [selectedValue, setSelectedValue] = useState<string | null>(null);

	useEffect(() => {
		setSelectedValue(null);
	}, [fieldValues]);

	useEffect(() => {
		onValuesChange(selectedValue ? selectedValue.split(',') : []);
	}, [selectedValue]);

	switch (field.type) {
		case FieldType.PRIMITIVE:
			return <Select
				w="100%"
				label="Valeur"
				searchable
				disabled={fieldValues.length === 0}
				data={fieldValues.map((value) => ({ value: value.id.toString(), label: value.value }))}
				value={selectedValue}
				onChange={(value) => {
					setSelectedValue(value ?? null);
				}}
			/>;

		case FieldType.LIST:
			return <MultiSelect
				w="100%"
				label="Valeur(s)"
				searchable
				disabled={fieldValues.length === 0}
				data={fieldValues.map((value) => ({ value: value.id.toString(), label: value.value }))}
				value={selectedValue ? selectedValue.split(',') : []}
				onChange={(value) => {
					setSelectedValue(value.join(','));
				}}
			/>;

		case FieldType.OBJECT:
			return <FieldContainer 
				isSubfield 
				selectableFields={field.subFields}
				onConfigChange={(config) => onConfigChange(config)}
			/>;

		default: return null;
	}

}
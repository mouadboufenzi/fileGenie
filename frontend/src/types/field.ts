
export interface Field {
	fieldId: number;
	name: string;
	type: FieldType;
	subFields: Field[];
}

export enum FieldType {
	PRIMITIVE = 'PRIMITIVE',
	LIST = 'LIST',
	OBJECT = 'OBJECT',
}
export interface ConfigurationFile {
	configId: number;
	configName: string;
	configVersion: string;
	configType: ConfigType;
	configFile: string;
	olderVersions: Record<string, string>
}

export enum ConfigType {
	YML = 'YML',
	JSON = 'JSON',
	CSV = 'CSV',
	XML = 'XML',
}
import { ConfigurationFile } from './config';

export interface UserInfo {
	userId: number;
	email: string;
	name: string;
	role: userRole;
	files: ConfigurationFile[];
}

export type userRole = 'ADMIN' | 'USER';
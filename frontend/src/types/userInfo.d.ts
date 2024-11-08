
export interface UserInfo {
	userId: number;
	email: string;
	name: string;
	role: userRole;
}

export type userRole = 'ADMIN' | 'USER';
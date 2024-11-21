
export interface UserInfo {
	userId: number;
	email: string;
	name: string;
	role: userRole;

	// TODO: implement this
	files: unknown[];
}

export type userRole = 'ADMIN' | 'USER';
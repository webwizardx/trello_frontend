export type CreateUserDto = {
	name: string;
	last_name: string;
	email: string;
	username: string;
	password: string;
};

export type User = { id: number } & Omit<CreateUserDto, 'password'>;
export type UserAndApiToken = User & { API_TOKEN: string };

export type LoginDto = {
	email: string;
	password: string;
};

export type Login = {
	apiToken: string;
	user: User;
};


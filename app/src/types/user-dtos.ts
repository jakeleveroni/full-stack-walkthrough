export type UserDto = {
	id: number;
	name: string;
	email: string;
	created_at: string;
};

export type CreateUserRequest = Pick<UserDto, "name" | "email">;

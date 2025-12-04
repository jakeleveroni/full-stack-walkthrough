import { pg } from "../services/database";

export async function getAllUsers() {
	try {
		const users = await pg`select * from users`;
		return users;
	} catch (error) {
		throw new Error(`Failed to fetch users: ${String(error)}`);
	}
}

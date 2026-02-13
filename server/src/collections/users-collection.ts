import { CreateUserRequest } from "..";
import { pg } from "../services/database";

export async function getAllUsers() {
  try {
    const users = await pg`select * from users`;
    return users;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${String(error)}`);
  }
}

export async function createUser(body: CreateUserRequest) {
  try {
    const records = await pg`insert into users ${pg(body)} returning *`;
    return records[0];
  } catch (error) {
    throw new Error(`Failed to fetch users: ${String(error)}`);
  }
}

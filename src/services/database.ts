import { SQL } from "bun";

// connection string format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
const connectionString = `postgres://postgres:password@localhost:1338/postgres`;
export const pg = new SQL(process.env.DATABASE_URL ?? connectionString);

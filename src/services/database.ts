import { SQL } from "bun";

// connection string format: postgres://USER:PASSWORD@HOST:PORT/DATABASE
export const pg = new SQL(
	`postgres://postgres:password@localhost:1338/postgres`,
);

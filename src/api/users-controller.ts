import { pg } from "@/services/database";
import type { CreateUserRequest } from "@/types/user-dtos";

export const usersControllerDefinition = {
	"/api/users": {
		// curl to test this
		//  curl http://localhost:3000/api/users
		GET: async () => {
			try {
				const users = await pg`select * from users`;
				return Response.json({ data: users });
			} catch (error) {
				return Response.json(
					{ error: "Database error", details: String(error) },
					{ status: 500 },
				);
			}
		},
		POST: async (req: Bun.BunRequest<"/api/users">) => {
			// curl to test this endpoint:
			//   curl -X POST -H "Content-Type: application/json" -d '{"name":"Jake","email":"jake@example.com"}' http://localhost:3000/api/users
			let body: CreateUserRequest | undefined;
			try {
				body = await req.json();
			} catch (error) {
				return Response.json(
					{ error: "Invalid JSON body", details: JSON.stringify(error) },
					{ status: 400 },
				);
			}

			if (!body || !body.name || !body.email) {
				return Response.json(
					{ error: "Missing required fields: name and email" },
					{ status: 400 },
				);
			}

			try {
				const records = await pg`insert into users ${pg(body)} returning *`;

				return Response.json({
					message: "User created successfully",
					user: records[0],
				});
			} catch (error) {
				return Response.json(
					{ error: "Database error", details: String(error) },
					{ status: 500 },
				);
			}
		},
	},
};

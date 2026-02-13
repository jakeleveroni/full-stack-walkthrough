import { Hono } from "hono";
import { cors } from "hono/cors";
import { createUser, getAllUsers } from "./collections/users-collection";

// TODO: move to a shared module
export type UserDto = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export type CreateUserRequest = Pick<UserDto, "name" | "email">;

const app = new Hono({});

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      // credentials: true,
    }),
  );
}

app.get("/api/users", async (c) => {
  try {
    const users = await getAllUsers();
    return c.json({ data: users });
  } catch (error) {
    return c.json(
      { error: "Database error", details: String(error) },
      { status: 500 },
    );
  }
});

app.post("/api/users", async (c) => {
  // curl to test this endpoint:
  //   curl -X POST -H "Content-Type: application/json" -d '{"name":"Jake","email":"jake@example.com"}' http://localhost:3000/api/users
  let body: CreateUserRequest | undefined;
  try {
    body = await c.req.json();
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
    const record = await createUser(body);

    return Response.json({
      message: "User created successfully",
      user: record,
    });
  } catch (error) {
    return Response.json(
      { error: "Database error", details: String(error) },
      { status: 500 },
    );
  }
});

export default {
  port: 3001,
  fetch: app.fetch,
};

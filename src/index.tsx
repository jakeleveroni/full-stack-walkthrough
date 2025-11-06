import { serve } from "bun";
import { helloControllerDefinition } from "./api/hello-controller";
import { usersControllerDefinition } from "./api/users-controller";
import index from "./index.html";

const server = serve({
	routes: {
		// Serve index.html for all unmatched routes.
		"/*": index,

		// hello routes
		...helloControllerDefinition,

		// users routes
		...usersControllerDefinition,
	},

	development: process.env.NODE_ENV !== "production" && {
		// Enable browser hot reloading in development
		hmr: true,

		// Echo console logs from the browser to the server
		console: true,
	},
});

console.log(`🚀 Server running at ${server.url}`);

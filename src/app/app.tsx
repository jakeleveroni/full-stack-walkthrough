import { useRef } from "react";
import "../index.css";

import logo from "../logo.svg";
import reactLogo from "../react.svg";
import { useGetUsers } from "./hooks/use-get-users";
import { usePostUser } from "./hooks/use-post-user";

export function App() {
	const users = useGetUsers();
	const { postUser } = usePostUser();

	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);

	async function submit() {
		const name = nameRef.current?.value;
		const email = emailRef.current?.value;

		if (name && email) {
			await postUser(name, email);
			window.location.reload();
		}
	}

	return (
		<div className="max-w-7xl mx-auto p-8 text-center relative z-10">
			<div className="flex justify-center items-center gap-8 mb-8">
				<img
					src={logo}
					alt="Bun Logo"
					className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
				/>
				<img
					src={reactLogo}
					alt="React Logo"
					className="h-24 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] animate-[spin_20s_linear_infinite]"
				/>
			</div>

			<h1 className="text-5xl font-bold my-4 leading-tight">Create New User</h1>
			<input ref={nameRef} type="text" placeholder="Name" />
			<input ref={emailRef} type="email" placeholder="Email" />
			<button type="button" onClick={submit}>
				Create
			</button>

			<h1 className="text-5xl font-bold my-4 leading-tight">List of Users</h1>
			{users && users.length > 0 ? (
				users.map((user) => (
					<div key={user.name + user.email}>
						{user.name} ({user.email})
					</div>
				))
			) : (
				<p>No users found</p>
			)}
		</div>
	);
}

export default App;

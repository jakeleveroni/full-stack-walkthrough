export function usePostUser() {
  async function postUser(name: string, email: string) {
    const response = await fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error creating user: ${errorData.error}`);
    }
    return await response.json();
  }

  return { postUser };
}

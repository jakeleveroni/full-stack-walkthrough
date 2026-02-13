import { useEffect, useState } from "react";

export function useGetUsers() {
  const [users, setUsers] = useState<
    Array<{ id: number; name: string; email: string }>
  >([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3001/api/users");
        if (!response.ok) {
          throw new Error(`Error fetching users: ${response.statusText}`);
        }
        const res = await response.json();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  return users;
}

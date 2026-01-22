import { User } from "@/types";

const API = "http://localhost:8000/api/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(API);
  const json = await res.json();
  return json.data ?? [];
};

export const createUser = async (full_name: string) => {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name }),
  });
};

export const updateUser = async (id: number, full_name: string) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name }),
  });
};

export const deleteUser = async (id: number) => {
  await fetch(`${API}/${id}`, { method: "DELETE" });
};

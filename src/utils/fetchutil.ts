import { User, friend } from "../types/type";

export const fetchUsers = async (page: number): Promise<{ data: User[] }> => {
  const response = await fetch(
    `https://api.jikan.moe/v4/users?page=${page}&limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUserFriends = async (
  username: string
): Promise<{ data: friend[] }> => {
  const response = await fetch(
    `https://api.jikan.moe/v4/users/${username}/friends`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user friends");
  }
  return response.json();
};

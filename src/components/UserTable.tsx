import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, userTableProps } from "../types/type";

const fetchUsers = async (page: number):Promise<{data:User[]}> => {
  const response = await fetch(
    `https://api.jikan.moe/v4/users?page=${page}&limit=10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const UserTable:React.FC<userTableProps> = ({ onselect }) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const {
    data,
    error,
    isLoading,
    isFetching,
  } = useQuery<{data:User[] } , Error>({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
  });

  const users:User[] = data?.data || [];

  const filteredUsers:User[] = users.filter((user) =>
    user.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Failed to load data</p>}

      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ padding: "5px", width: "200px" }}
      />

      <table>
        <thead>
          <tr>
            <th>UserImage</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.username}>
              <td>
                <img src={user.images.jpg.image_url} alt={user.username} width="50" />
              </td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => onselect(user)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>

      {isFetching && <p>Loading new page...</p>}
    </>
  );
};

export default UserTable;

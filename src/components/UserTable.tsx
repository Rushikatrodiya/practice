import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, userTableProps } from "../types/type";
import { fetchUsers } from "../utils/fetchutil";
import Table from "../ui/Table";
import Input from "../ui/Input";
import Button from "../ui/Button";

const UserTable:React.FC<userTableProps> = ({ onselect }) => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const { data, error, isLoading, isFetching } = useQuery<{ data: User[] }, Error>({
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

      <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

      <Table
        data={filteredUsers}
        columns={[
          {
            header: "User Image",
            render: (user) => <img src={user.images.jpg.image_url} alt={user.username} width="50" />,
          },
          {
            header: "Username",
            render: (user) => user.username,
          },
          {
            header: "Actions",
            render: (user) => <Button onClick={() => onselect(user)}>View Details</Button>,
          },
        ]}
      />

      <div>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>

      {isFetching && <p>Loading new page...</p>}
    </>
  );
};

export default UserTable;
